"use client"
import { Card, CardContent } from "@/components/ui/card"
import { BatteryChart } from "@/components/Battery-Chart"
import { Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import withAuth from "@/app/utils/auth";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axios_config"
import NotFound from "@/components/Not-Found"

interface ChartCellData {
  nome: string;
  tensao: { hour: number; value: number }[];
  temperatura: { hour: number; value: number }[];
  porcentagem: { hour: number; value: number }[];
}

function Charts() {

  const repeatCount = 5;
  //fazer um state que contenha as células, dentro de cada célula existem 4 vetores: tensao, temperatura, porcentagem e tempo
  const MAX_CELL_VOLTAGE = 4.2;
  const [hasCharging, setHasCharging] = useState(false)
  const [chartData, setChartData] = useState<ChartCellData[]>([]);

  useEffect(() =>{

    async function loadChartData(){
      const chargingId = localStorage.getItem("chargingId");
        var chargingData: any

        if(chargingId){
          chargingData = await fetchCharging(localStorage.getItem("chargingId"))

          if(!chargingData){
              setHasCharging(false)
              return 
          }
          
          setHasCharging(true)
            
        }
        else if(!chargingId){
          chargingData = await getChargingInProgress()
          
          console.log(JSON.stringify(chargingData))

          if(!chargingData){
              setHasCharging(false)
              return 
          }

          localStorage.setItem("chargingId", chargingData._id)
          
          setHasCharging(true)
            
        }

        try{

          fillStateWithChargingData(chargingData, setChartData)

        } catch (error){
          console.log(error)
        }
    }

    loadChartData()

    const interval = setInterval(loadChartData, 30000);

    return () => clearInterval(interval);

  }, [])

  function fillStateWithChargingData(
    carregamento: any,
    setChartData: React.Dispatch<React.SetStateAction<ChartCellData[]>>
  ) {
    const dataHoraInicio = new Date(carregamento.dataHoraInicio).getTime();
  
    const chartData = carregamento.placasBMS.flatMap((placa: any) =>
      placa.celulas.map((celula: any) => {
        const nome = `Placa ${placa.endereco} - Célula ${celula.idCelula}`;
  
        const tensao: { hour: number; value: number }[] = [];
        const temperatura: { hour: number; value: number }[] = [];
        const porcentagem: { hour: number; value: number }[] = [];
  
        celula.dadosLeitura.forEach((dado: any) => {
          const tensaoValue = parseFloat(dado.tensao.$numberDecimal);
          const temperaturaValue = parseFloat(dado.temperatura.$numberDecimal);
          const dataHoraLeitura = new Date(dado.dataHora).getTime();
  
          
          const tempoDecorrido = (dataHoraLeitura - dataHoraInicio) / (1000 * 60 * 60);
  
          
          const porcentagemValue = (tensaoValue / MAX_CELL_VOLTAGE) * 100;
  
          
          tensao.push({ hour: Math.round(tempoDecorrido), value: tensaoValue });
          temperatura.push({ hour: Math.round(tempoDecorrido), value: temperaturaValue });
          porcentagem.push({ hour: Math.round(tempoDecorrido), value: Math.round(porcentagemValue) });
        });
  
        return { nome, tensao, temperatura, porcentagem };
      })
    );
  
    
    setChartData(chartData);
  }


  async function fetchCharging(chargingId: string | null): Promise<any>{
    try {
      const response = await axiosInstance.get(`/pages/api/carregamento/?id=${chargingId}`);

      if (response.status === 400 || response.status === 404) {
        setHasCharging(false)
      }

      return response.data.carregamento


    } catch (error: any) {
      console.log(error.response.data.error);
    }
  }

    async function getChargingInProgress(){
      try {
        const response = await axiosInstance.get(`/pages/api/carregamento/?progresso=1`);

        if (response.status === 400 || response.status === 404) {
          setHasCharging(false)
        }

        return response.data.carregamento


      } catch (error: any) {
        console.log(error.response.data.error);
      }
    }

  return (
    <div className="h-screen flex flex-col">
      {hasCharging ? (
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-[#0B4E65] mb-6">Estação XXX</h1>

          

          {/* Gráficos */}
          <section className="flex flex-col gap-8">
            <h2 className="text-xl text-[#0B4E65] mb-4 font-semibold">Gráficos</h2>
            {chartData.map((celula) => (
              <div key={celula.nome}>
                <h3 className="p-2 text-customBlue font-semibold">{celula.nome}</h3>
                <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  
                  
                  <Card>
                    <CardContent className="pt-6 aspect-w-16 aspect-h-9 pl-1 pr-1">
                      <BatteryChart 
                        title="Porcentagem da bateria"
                        data={celula.porcentagem}
                        valueFormatter={(value) => `${value}%`}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 aspect-w-16 aspect-h-9 pl-1 pr-1">
                      <BatteryChart 
                        title="Temperatura da bateria"
                        data={celula.temperatura}
                        valueFormatter={(value) => `${value}°C`}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6 aspect-w-16 aspect-h-9 pl-1 pr-1">
                      <BatteryChart 
                        title="Tensão da bateria"
                        data={celula.tensao}
                        valueFormatter={(value) => `${value}V`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            
            ))}

          </section>
        </div>
    

      ) :
      (
        <NotFound
          displayText="Não existe carregamento em progresso no momento"
        />
      )
    }
  </div>
      
  );
}

function generateChartData() {
  const hours = Array.from({ length: 10 }, (_, i) => i * 10)
  return hours.map(hour => ({
    hour: `${hour}h`,
    value: Math.random() * (100 - 80) + 80
  }))
}

export default withAuth(Charts);
