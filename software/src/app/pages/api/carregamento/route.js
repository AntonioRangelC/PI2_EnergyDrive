import { NextResponse } from "next/server";

import { Carregamento } from "../../../models/Carregamento";
import { Status } from "../../ChargingHistory/types"
import { sendToAllChatIds } from "../../../../service/code/telegramCode";
import { connectToDatabase } from "@/app/utils/mongodb";

export async function POST(request) {
  await connectToDatabase()

  const { novoCarregamento } = await request.json();
  console.log(novoCarregamento.idEstacao, novoCarregamento.statusCarregamento, novoCarregamento.dataHoraInicio)
  //const statusCarregamento = "EM PROGRESSO";
  //const dataHoraInicio = new Date();

  delete novoCarregamento.dataHoraFim

  try {
    const novoCarregamentoResposta = new Carregamento(novoCarregamento);

    await novoCarregamentoResposta.save();

    
    sendToAllChatIds("Carregamento iniciado!")
    return NextResponse.json(
      {
        message: "Carregamento inserido no banco de dados",
        novoCarregamento: novoCarregamentoResposta,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Erro ao iniciar um carregamento ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
  await connectToDatabase()
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const progresso = searchParams.get("progresso");

  if(id){
    
    return buscarUmCarregamento(id)

  } else if(progresso){
    
    return buscarCarregamentoEmProgresso()

  } else {

    return buscarTodosCarregamentos()

  }


  
}

async function buscarUmCarregamento(id){
  try{
    const carregamento = await Carregamento.findById(id)


    if (!carregamento) {
      return NextResponse.json(
        { error: "Carregamento não encontrado", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ carregamento, status: 200 }, { status: 200 });

  } catch (error){

    return NextResponse.json(
      {
        error: `Erro ao buscar carregamento:  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

async function buscarCarregamentoEmProgresso(){
  
    try {
        
        const carregamento = await Carregamento.findOne({ statusCarregamento: Status.PROGRESS });

        if (!carregamento) {
            return NextResponse.json(
              { error: "Nenhum carregamento em progresso encontrado", status: 404 },
              { status: 404 }
            );
        }

        
        
        return NextResponse.json({ carregamento, status: 200 }, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar carregamento em progresso:", error);

        return NextResponse.json(
          {
            error: `Erro ao buscar carregamento em progresso:  ${error.message}`,
          },
          {
            status: 500,
          }
        );
    }

}

async function buscarTodosCarregamentos(){
  try {
    const carregamentos = await Carregamento.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Carregamentos encontrados",
        carregamentos: carregamentos,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Erro ao buscar carregamentos  ${error.message}`,
      },
      {
        status: 500,
      }
    );
  }
}

// Ações a serem mandadas no PATCH:
// 1: Atualizar dados de leitura
// 2: Finalizar Carregamento
// 3: Erro em célula
// 4: Atualizar Placa BMS e células

export async function PATCH(req) {

  await connectToDatabase()

  const body  = await req.json()

  const { searchParams } = new URL(req.url);
  const acao = searchParams.get("acao");



  if(!acao){
    return NextResponse.json(
      { error: "Ação não fornecida." },
      { status: 400 }
    );
  }

  if(acao === "1"){
    const { idCarregamento, enderecoPlaca, idCelula, dadoLeitura } = body

    return atualizarDadosLeitura(idCarregamento, enderecoPlaca, idCelula, dadoLeitura)

  }
  else if(acao === "2"){

    

    const { chargingId, chargingStatus, placasBMS } = body;

    if(chargingStatus === Status.FINISHED){
      sendToAllChatIds("Todas as células foram carregadas!")
    }
    else if(chargingStatus === Status.STOPPED){
      sendToAllChatIds("Carregamento interrompido por usuário.")
    }

    

    return finalizarCarregamento(chargingId, chargingStatus, placasBMS)

  }
  else if(acao === "3"){
    
    const { idCarregamento, enderecoPlaca, idCelula, tipoErro } = body

    return informarErroCelula(idCarregamento, enderecoPlaca, idCelula, tipoErro)

  }
  else if(acao === "4"){
    const { idCarregamento, placasBMS} = body

    return atualizarPlacasBMS(idCarregamento, placasBMS)
  }
  
}

async function atualizarPlacasBMS(idCarregamento, placasBMS){
  try {

    if(!idCarregamento){
      return NextResponse.json(
        { error: "idCarregamento não fornecido" },
        { status: 400 }
      );
    }
    else if(!placasBMS){
      return NextResponse.json(
        { error: "Lista de Placas BMS não fornecida" },
        { status: 400 }
      );
    }
    
    const charging = await Carregamento.findById(idCarregamento);
    if (!charging) {
      return NextResponse.json(
        { error: "Carregamento não encontrado" },
        { status: 404 }
      );
    }

    
    charging.placasBMS = placasBMS;

    
    await charging.save();

    return NextResponse.json(
      { message: "Placas BMS atualizadas com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar Placas BMS" },
      { status: 500 }
    );
  }


}


async function informarErroCelula(idCarregamento, enderecoPlaca, idCelula, tipoErro){
  
  try {
    

    
    if (!idCarregamento || !enderecoPlaca || !idCelula || !tipoErro) {
      return NextResponse.json(
        { error: "Todos os campos (idCarregamento, enderecoPlaca, idCelula, tipoErro) são obrigatórios." },
        { status: 400 }
      );
    }

    
    const updatedCarregamento = await Carregamento.updateOne(
      {
        _id: idCarregamento,
        "placasBMS.endereco": enderecoPlaca,
        "placasBMS.celulas.idCelula": idCelula,
      },
      {
        $set: {
          "placasBMS.$[placa].celulas.$[celula].statusCelula": tipoErro,
        },
      },
      {
        arrayFilters: [
          { "placa.endereco": enderecoPlaca },
          { "celula.idCelula": idCelula },
        ],
        new: true,
      }
    );

    
    if (updatedCarregamento.matchedCount === 0) {
      return NextResponse.json(
        { error: "Nenhum registro encontrado com os parâmetros fornecidos." },
        { status: 404 }
      );
    }

    sendToAllChatIds("Erro em célula, o carregamento será encerrado.")
    return NextResponse.json(
      { message: "Status da célula atualizado com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar o status da célula:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar o status da célula." },
      { status: 500 }
    );
  }


}

async function finalizarCarregamento( idCarregamento, statusCarregamento, placasBMS ){
  try {
    

    
    if (!idCarregamento || !statusCarregamento) {
      return NextResponse.json(
        { error: "ID do carregamento ou novo status da célula não fornecido." },
        { status: 400 }
      );
    }

    
    const validStatuses = ["EM PROGRESSO", "CONCLUIDO", "ERRO", "INTERROMPIDO POR USUARIO"];
    if (!validStatuses.includes(statusCarregamento)) {
      return NextResponse.json(
        { error: "Status do carregamento inválido." },
        { status: 400 }
      );
    }

    const updateFields = {
      statusCarregamento: statusCarregamento,
      dataHoraFim: new Date(),
      placasBMS: placasBMS
    };

    /*if (statusCarregamento === "CONCLUIDO") {
      updateFields["placasBMS.$[].celulas.$[].statusCelula"] = "COMPLETA";
    }*/
    
    const updatedCarregamento = await Carregamento.findByIdAndUpdate(
      idCarregamento,
      {
        $set: updateFields
        
      },
      { new: true } 
    );
    
    
    if (!updatedCarregamento) {
      return NextResponse.json(
        { error: "Carregamento não encontrado." },
        { status: 404 }
      );
    }

    sendToAllChatIds("Carregamento finalizado!")
    
    return NextResponse.json(
      {
        message: "Carregamento finalizado com sucesso.",
        carregamento: updatedCarregamento,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao finalizar carregamento:", error);
    return NextResponse.json(
      {
        error: `Erro ao finalizar carregamento: ${error.message}`,
      },
      { status: 500 }
    );
  }
}


async function atualizarDadosLeitura(idCarregamento, enderecoPlaca, idCelula, dadoLeitura){
  try {
    

    if (!idCarregamento || !enderecoPlaca || !idCelula || !dadoLeitura) {
      return NextResponse.json(
        {
          message:
            "Todos os campos (idCarregamento, enderecoPlaca, idCelula, dadoLeitura) são obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    const carregamento = await Carregamento.findById(idCarregamento);

    if (!carregamento) {
      return NextResponse.json(
        {
          message: "Carregamento não encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    const placa = carregamento.placasBMS.find(
      (p) => p.endereco === enderecoPlaca
    );

    if (!placa) {
      return NextResponse.json(
        {
          message: "Placa BMS não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    const celula = placa.celulas.find((c) => c.idCelula === idCelula);

    if (!celula) {
      return NextResponse.json(
        {
          message: "Célula não encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    celula.dadosLeitura.push(dadoLeitura);

    await carregamento.save();

    return NextResponse.json(
      {
        message: "Dado de leitura adicionado com sucesso.",
        carregamento: carregamento,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Erro ao adicionar dado de leitura.",
      },
      {
        status: 500,
      }
    );
  }
}
