"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { useState } from "react";
import {CellData, Cell, CellStatus} from "@/app/pages/ChargingHistory/types";


type CellDisplayDataProps = Cell & {
    chargingPercentage: number | undefined;
};

export function CellDisplayData({idCelula, dadosLeitura, statusCelula, chargingPercentage} : CellDisplayDataProps){

    const [imageHeight, setImageHeight] = useState<number>(0);

    function getChargingElementSize(chargingPercentage: number | undefined){

        if(chargingPercentage){
            return (chargingPercentage / 100) * imageHeight
        }
        
    }

    return (
        <Card className="bg-[#0B4E65]  text-white">
            <CardContent className="p-2">
                <h3 className="font-bold mb-4 text-white">Célula { idCelula }</h3>
                <div className="flex">
                    <div className="relative flex justify-center w-full  p-2">
                        <Image 
                            src="/img/cell_charging.svg"
                            layout="fill"
                            objectFit="contain"
                            unoptimized={true}
                            alt="Porcentagem"
                            onLoadingComplete={({ naturalHeight }) => setImageHeight(naturalHeight)}
                        />

                        <div
                            className="absolute bottom-4 flex justify-center items-center bg-[#20BF55]"
                            style={{ height: `${getChargingElementSize(chargingPercentage)}px`, width: '54px' }}
                        >
                            
                        </div>

                        <span className="absolute inset-0 flex justify-center items-center text-black font-bold" >{chargingPercentage?.toString()}%</span>

                        
                    </div>
                    
                    <div className="flex flex-col gap-2 p-2 w-full">
                        <Card className="bg-[#FFFFFF] text-center text-customBlue">
                            <CardContent className="p-2">
                                <p>{ dadosLeitura.at(-1)?.tensao?.toString()} V</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#FFFFFF] text-center text-customBlue">
                            <CardContent className="p-2">                
                                <p>{ dadosLeitura?.at(-1)?.temperatura?.toString() } °C</p>
                            </CardContent>
                        </Card>

                        <Card className={`text-white flex-grow text-center border-none ${
                            statusCelula === CellStatus.CARREGANDO ? 'bg-customLightBlue' : 
                            statusCelula === CellStatus.COMPLETA ? 'bg-[#20BF55]' : 
                            statusCelula === CellStatus.ERRO ? 'bg-[#6C0E23]':
                            'bg-customGray'
                        }`}>
                            <CardContent className="p-2">
                                <p>{ statusCelula }</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}