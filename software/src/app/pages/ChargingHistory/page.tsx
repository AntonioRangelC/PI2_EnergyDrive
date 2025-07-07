"use client";
import {useEffect, useRef, useState} from "react";

import ChargingHistoryView from "@/app/pages/ChargingHistory/ChargingHistory.view";
import { axiosInstance } from "@/app/utils/axios_config";
import {Charging} from "@/app/pages/ChargingHistory/types";
import {useRouter} from "next/navigation";
import NotFound from "@/components/Not-Found";



export default function ChargingHistory() {
    const [chargingArray, setChargingArray] = useState<Charging[]>([]);

    

    const router = useRouter();

    async function getChargingInProgress(){
        try {
            const response = await axiosInstance.get(`/pages/api/carregamento/?progresso=1`);
    
            if (response.status === 400 || response.status === 404) {
                console.log("Carregamento não encontrado")
                return null
            }

            return response.data.carregamento._id


        } catch (error: any) {
            console.log(error.response.data.error);
            return null
        }
    }

    

    const getChargingHistory = async() : Promise<any> => {
        try {
            const response = await axiosInstance.get(
                `/pages/api/carregamento/`
            );
            if (response.status === 200) {
                console.log(response.data)
                return response.data.carregamentos;
            }
        } catch (error) {
            console.error('Erro ao buscar usuário por id');
        }

    }

    

    useEffect(() => {
        const getData = async () => {
            const charging : Charging[] = await getChargingHistory();
            
            if(charging !== undefined){
                setChargingArray(charging)
                
            }
            
        }
        getData();
    }, [])

    return ( 
        <div className="h-screen flex flex-col">
            { chargingArray.length !== 0 ? 
                (
                    <ChargingHistoryView
                        chargingArray={chargingArray}
                    />
                ) : 
                (
                    <NotFound
                        displayText="Não existem carregamentos registrados"
                    />
                )
            }
        </div>
        
            
        
    )
}

