"use client"
import withAuth from "@/app/utils/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BMSBoard } from "@/components/BMS-Board";
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios_config";
import { Modal, AlertModal } from "@/components/ui/modal";
import DialogFeedback from "@/components/ui/dialog"
import {Charging, Status, CellStatus, BoardBMS, Cell, CellData} from "@/app/pages/ChargingHistory/types";
import NotFound from "@/components/Not-Found";



function CellsDashboard() {


    
    const [chargingData, setChargingData] = useState<{
        isInitialized: boolean;
        data: Omit<Charging, '_id' | 'createdAt' | 'updatedAt'> | null;
      } | null >({
        isInitialized: false,
        data: null,
    });

    const [hasCharging, setHasCharging] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [allCellsCharged, setAllCellsCharged] = useState(false)
    const [chargingPercState, setChargingPercState] = useState<number | undefined>(0)
    const [displayText, setDisplayText] = useState('')

    const toggleModal = () => setShowModal((prev) => !prev);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

    

    useEffect(() => {

        async function loadChargingData(){
            const chargingId = localStorage.getItem("chargingId");
            var chargingData: any

            if(chargingId){
                chargingData = await fetchCharging(localStorage.getItem("chargingId"))

                if(!chargingData){
                    setHasCharging(false)
                    setDisplayText("Não existe carregamento em progresso no momento")
                    return 
                }
                
                setHasCharging(true)
                
            }
            else if(!chargingId){
                chargingData = await getChargingInProgress()
                
                console.log(JSON.stringify(chargingData))

                if(!chargingData){
                    setHasCharging(false)
                    setDisplayText("Não existe carregamento em progresso no momento")
                    return 
                }

                localStorage.setItem("chargingId", chargingData._id)
                
                setHasCharging(true)
                
            }

            
            
            try{
                
                if (chargingData && chargingData.placasBMS.length > 0) {



                    

                    setChargingData(prevState => ({
                        
                        
                        ...prevState, 
                        isInitialized: true,
                        data: {
                            _id: chargingData?._id || "",
                            idEstacao: chargingData?.idEstacao || "",
                            statusCarregamento: chargingData.statusCarregamento,
                            dataHoraInicio: new Date(chargingData.dataHoraInicio).toISOString(),
                            dataHoraFim: '',
                            placasBMS: chargingData.placasBMS.map((placa:BoardBMS) => ({
                                endereco: placa.endereco,
                                celulas: placa.celulas.map((celula:Cell) => ({
                                    idCelula: celula.idCelula,
                                    statusCelula: celula.statusCelula,
                                    dadosLeitura: celula.dadosLeitura.map((dado:any) => ({
                                        tensao: parseFloat(dado.tensao.$numberDecimal),
                                        temperatura: dado.temperatura.$numberDecimal,
                                        dataHora: dado.dataHora
                                    }))
                                }))
                            }))
                        }
                    
                    }));
                }
                else if(chargingData && chargingData.placasBMS.length === 0){
                    setDisplayText("Aguardando início do carregamento...")
                    setHasCharging(false)
                }

            } catch (error){
                console.log(`erro ao tentar atribuir ${error}`)
            }
        }
        loadChargingData();

        const interval = setInterval(loadChargingData, 10000);

        return () => clearInterval(interval);
        
        
    }, [])

    useEffect(() => {
        checkChargingStatus();
    }, [chargingData]);

    const handleSuccess = () => {
        setFeedbackType("success");
        setDialogOpen(true);
        
    };

    const checkChargingStatus = useCallback(() => {
        if (!chargingData?.data || chargingData.data.placasBMS.length === 0) {
          return;
        }
      
        let allCharged = true;
        let hasError = false;
      
        const voltageLimit = Number(process.env.NEXT_PUBLIC_CELL_VOLT_LIMIT) || 4.2;
      
        
        const updatedPlacas = chargingData.data.placasBMS.map((placa) => ({
          ...placa,
          celulas: placa.celulas.map((cell) => {
            if (cell.statusCelula === CellStatus.ERRO) {
              hasError = true;
            }
      
            
            if (cell.statusCelula === CellStatus.COMPLETA) {
              return cell;
            }
      
            
            if (cell!.dadosLeitura!.at(-1)!.tensao >= voltageLimit) {
              return { ...cell, statusCelula: CellStatus.COMPLETA };
            }

            if (cell!.dadosLeitura!.at(-1)!.tensao === 0.0 || cell!.dadosLeitura!.at(-1)!.tensao === 0) {
                allCharged = false
                return { ...cell, statusCelula: CellStatus.DESLIGADA };
            }
            
      
            allCharged = false;
            return cell;
          }),
        }));
      
        
        if (JSON.stringify(updatedPlacas) !== JSON.stringify(chargingData.data.placasBMS)) {
          setChargingData((prevState) => ({
            ...prevState!,
            isInitialized: true,
            data: {
              ...prevState!.data!,
              placasBMS: updatedPlacas,
            },
          }));
        }
      
        if (hasError) {
            handleError();
        } else if (allCharged) {
            handleSuccess();
        }
    }, [chargingData, handleStopCharging, handleSuccess]);
      



    /*const updateChargingPercentage = (placasBMS: BoardBMS[] | undefined) => {
        console.log(JSON.stringify(placasBMS))
        if (!placasBMS || placasBMS.length === 0) return;
        
        
        const primeiraPlaca = placasBMS[0];
        if (!primeiraPlaca.celulas || primeiraPlaca.celulas.length === 0) return;
        
        
        const primeiraCelula = primeiraPlaca.celulas[0];
        
        
        const ultimaLeitura = primeiraCelula.dadosLeitura.at(-1)?.tensao;
        
        
        if (ultimaLeitura !== undefined) {
          setChargingPercState(getChargingPercentage(ultimaLeitura));
        }
    };*/

    

    /*useEffect(() => {
        if (chargingData && !allCellsCharged) { 
            
            
            const intervalCleanup = fillData(chargingData.data, setChargingData);

            return () => intervalCleanup(); 
        }
    }, [chargingData]); */

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

    /*function fillData(
        currentChargingData: Omit<Charging, '_id' | 'createdAt' | 'updatedAt'> | null, 
        setChargingData: React.Dispatch<React.SetStateAction<{
            isInitialized: boolean;
            data: Omit<Charging, "_id" | "createdAt" | "updatedAt"> | null;
        } | null >>
    ) {
        const totalTime = 10; // 100 segundos
        const intervalTime = 1000; // 1 segundo
        const incrementPerSecond: number = 0.5; // Incremento por segundo

        const interval = setInterval(() => {
            setChargingData((prevChargingData) => {
                if (!prevChargingData || !prevChargingData.data) return prevChargingData;
                let allCharged = true;
                
                const updatedBmsBoards = prevChargingData?.data?.placasBMS.map((bmsBoard) => {
                    const updatedCells = bmsBoard.celulas.map((cell) => {

                        const lastReading = cell.dadosLeitura.at(-1); 
                        const lastVoltage = lastReading?.tensao || 0; 
                        const chargingPercentage = getChargingPercentage(lastVoltage);
                        setChargingPercState(getChargingPercentage(cell.dadosLeitura.at(-1)?.tensao))
                        
                        if ( chargingPercentage !== undefined && chargingPercentage < 100) {
                            console.log(`voltagem antiga ${lastVoltage}`)
                            allCharged = false;

                            const newVoltage = Math.min(lastVoltage + incrementPerSecond, 10.00); 
                            console.log(`nova voltagem: ${newVoltage}`)
                            const newReading: CellData = {
                                dataHora: new Date().toISOString(),
                                temperatura: lastReading?.temperatura || "25", 
                                tensao: parseFloat(newVoltage.toFixed(2)),
                            };
                            console.log(JSON.stringify(newReading))
                            return {
                                ...cell,
                                dadosLeitura: [...cell.dadosLeitura, newReading]
                            };
                        }

                        return {
                            ...cell,
                            status: CellStatus.COMPLETA
                        };
                    });
                    return { ...bmsBoard, celulas: updatedCells }; 
                });

                if (allCharged) {
                    clearInterval(interval);
                    setAllCellsCharged(true)
                    console.log("Todas as baterias estão completamente carregadas!");
                    handleSuccess()
                }

                return { 
                    ...prevChargingData, 
                    data:{
                        ...prevChargingData.data,
                        placasBMS: updatedBmsBoards 
                    }
                        
                }; 
            });
        }, intervalTime);

        return () => clearInterval(interval); 
    }*/

    

    const handleError = () => {
        setFeedbackType("error");
        setDialogOpen(true);
    };

    const handleConfirmStop: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        handleStopCharging("user"); 
    };

    const handleFinishedCharge: () => void = () => {
        setDialogOpen(false)
        handleStopCharging("finished"); 
    };

    const handleErrorDialogClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        handleStopCharging("error")
        
    };
    
    async function insertCellError(){
        //const acao = "erro em celula"
        const idCarregamento = localStorage.getItem("chargingId")
        const enderecoPlaca = chargingData?.data?.placasBMS[0].endereco
        const idCelula = "2"
        const tipoErro = "ERRO"
        
        try {
            const response = await axiosInstance.patch(`/pages/api/carregamento?acao=3`,
                {
                    idCarregamento,
                    enderecoPlaca,
                    idCelula,
                    tipoErro
                }
            );
    
            

            return response.data.carregamento
    
            
        } catch (error: any) {
            console.log(error.response.data.error);
        }
    }

    async function handleStopCharging(causedBy: string){
        var chargingStatus: string
        
        chargingStatus = ''

        if(causedBy === "user"){
            chargingStatus = Status.STOPPED //Não precisa atualizar o status das células
        }
        else if(causedBy === "error"){
            chargingStatus = Status.ERROR //Vai usar um endpoint diferente, pois uma das células está com erro
            // const responseCellError = await insertCellError()
            // if(!responseCellError){
            //     console.log("Erro ao mudar célula")
            // }
        }
        else if(causedBy === "finished"){
            chargingStatus = Status.FINISHED //Atualiza todos os status de células para COMPLETA
        }

        const charging = await stopCharging(chargingStatus)

        if(charging){
            localStorage.removeItem('chargingId');
            setHasCharging(false)
            
        }
    }

    //Essa função é acionada por um botão quando o usuário deseja parar o carregamento 
    // ou quando o carregamento foi finalizado corretamente
    async function stopCharging(chargingStatus: string){


        const chargingId = localStorage.getItem("chargingId")

        const placasBMS = chargingData?.data?.placasBMS

        try {
            const response = await axiosInstance.patch(`/pages/api/carregamento?acao=2`,
                {
                    chargingId,
                    chargingStatus,
                    placasBMS
                }
            );
    
            

            return response.data.carregamento
    
            
        } catch (error: any) {
            console.log(error.response.data.error);
        }
        
    }

    

    function getDate(stringDatetime: string){
        return new Date(stringDatetime).toLocaleDateString()
    }

    function getTime(stringDatetime: string){
        const timeString = new Date(stringDatetime).toTimeString()
        const match = timeString.match(/\d{2}:\d{2}:\d{2}/);
        return match ? match[0] : ""
    }



    return (
        <div className="h-screen flex flex-col">
            {hasCharging ? (
                

                <div className="container mx-auto p-6">
                    <h1 className="text-4xl font-bold text-[#0B4E65] mb-6">Estação XXX</h1>

                    {/* Monitoramento */}
                    <section className="flex flex-col gap-4">
                        <h2 className="text-xl text-[#0B4E65] mb-4 font-semibold">Monitoramento</h2>

                        <div className="flex flex-wrap justify-between gap-2">
                            <Card className="bg-[#0B4E65] text-white ">

                                <CardContent className="flex flex-col items-center p-3">
                                    <CardHeader>Início do carregamento</CardHeader>

                                    <h2 className="lg:text-3xl  sm:text-sm font-bold mb-2">
                                        {
                                            `${getDate(chargingData!.data!.dataHoraInicio)} - ${getTime(chargingData!.data!.dataHoraInicio)}`
                                        }
                                    </h2>


                                </CardContent>
                            </Card>

                            <Button 
                                className="bg-customRed"
                                variant="default" 
                                size="sm"
                                onClick={toggleModal}
                            >
                                Interromper Carregamento
                            </Button>
                            {showModal && (
                                <Modal 
                                    onClose={toggleModal} 
                                    onConfirm={handleConfirmStop} 
                                    displayText="Deseja interromper o carregamento?"
                                >
                                    <div>
                                        <button onClick={toggleModal}>Fechar Modal</button>
                                    </div>
                                </Modal>
                            )}

                            <DialogFeedback
                                type={feedbackType}
                                message={
                                feedbackType === "success"
                                    ? "Todas as células estão carregadas ! O carregamento está sendo finalizado"
                                    : "Um erro foi detectado, o carregamento está sendo finalizado"
                                }
                                open={dialogOpen}
                                onClose={ feedbackType === "success" 
                                        ? handleFinishedCharge
                                        : handleErrorDialogClick        
                                }
                            />
                        </div>

                        <div className="space-y-6">

                            {chargingData && chargingData?.data?.placasBMS.map((board) =>([

                                <Card key={board.endereco}>
                                    <CardContent className="pt-6">
                                        <BMSBoard 
                                            address={board.endereco} cells={board.celulas}
                                        />
                                    </CardContent>
                                </Card>

                            ]))}






                        </div>


                    </section>
                </div>
                
            ): (

                <NotFound
                    displayText={displayText}
                />
            )}
        </div>


    );
}

export default withAuth(CellsDashboard);