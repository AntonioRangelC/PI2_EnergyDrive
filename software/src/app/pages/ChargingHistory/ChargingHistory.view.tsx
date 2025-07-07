"use client";
import {Button} from "@/components/ui/button"
import {ChargingCard} from "./components/charging-card"
import {Charging, Status, CellStatus} from "@/app/pages/ChargingHistory/types";
import { axiosInstance } from "@/app/utils/axios_config";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ChargingTable from "@/app/pages/ChargingHistory/components/ChargingTable";
import {usePDF} from "react-to-pdf";
interface ChargingHistoryViewProps {
  chargingArray: Charging[];
}


export default function ChargingHistoryView({ chargingArray }: ChargingHistoryViewProps) {
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({ filename: "charging-history.pdf" });

  const [chargingToBePrinted, setChargingToBePrinted] = useState('')
  const [showReport, setShowReport] = useState(false);

  const handleNavigation = async(chargingId:string) => {

    localStorage.setItem("chargingId", chargingId)

    router.push("/pages/cellsDashboard");
  };

  const handleDownload = (chargingId:string) => {
    setChargingToBePrinted(chargingId);

    setTimeout(() => {
      console.log(JSON.stringify(chargingArray.find((charging) => charging._id === chargingToBePrinted)))
      setShowReport(true);
      toPDF(); // Gera o PDF após atualizar o estado
      
    }, 100);

    setShowReport(false)
  };

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 4;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  const novoCarregamento: Omit<Charging, '_id' | 'createdAt' | 'updatedAt'> = {
    idEstacao: "6760591d52368622ed5e2ea6", 
    dataHoraInicio: new Date().toISOString(),
    dataHoraFim: '',
    statusCarregamento: Status.PROGRESS,
    placasBMS: [],
  };



  async function newCharging(){

    try {
        const response = await axiosInstance.post(
          `/pages/api/carregamento/`,
          {
            novoCarregamento
          }
        );
        if (response.status === 201) {
          console.log(response.data)
          return response.data.novoCarregamento._id;
        }
    } catch (error) {
      console.error('Erro ao iniciar carregamento', error);
    }
  }

  async function handleNewChargingClick(){

    const chargingId: string = await newCharging()
    localStorage.removeItem('chargingId');
    localStorage.setItem("chargingId", chargingId)
    console.log(chargingId)
    router.push('/pages/cellsDashboard')
  }

  return (
      <div className="min-h-screen bg-gray-50">
          <main className="container mx-auto p-6">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
                  <h1 className="text-2xl font-bold text-[#00334C]">Histórico de Carregamentos</h1>
                  <Button className="bg-[#00334C]" onClick={handleNewChargingClick}>
                      Novo carregamento
                  </Button>
              </div>

              <div className="space-y-4">
                  {chargingArray.map((charging: Charging) => (
                      <ChargingCard
                          key={charging._id}
                          stationName="Estação xxx"
                          charging={charging}
                          buttonText={charging.statusCarregamento === Status.PROGRESS ? "Monitorar carregamento" : "Download do relatório"}
                          buttonOnclick={charging.statusCarregamento === Status.PROGRESS ? () => handleNavigation(charging._id) : () => handleDownload(charging._id)}
                      />
                  ))}
              </div>

              <ChargingTable charging={chargingArray.find((charging) => charging._id === chargingToBePrinted)} targetRef={targetRef} showReport={showReport}/>
          </main>
      </div>
  )
}
