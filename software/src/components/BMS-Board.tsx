"use client"

import { CellDisplayData } from "./Cell-Data"
import {Cell} from "@/app/pages/ChargingHistory/types";

interface BMSBoardProps {
    address: string,
    cells: Array<Cell>
}
export function BMSBoard({address, cells} : BMSBoardProps){
    
    function getChargingPercentage(tension: number | undefined){
        const cellVoltLimit: number = Number(process.env.NEXT_PUBLIC_CELL_VOLT_LIMIT)
        var result: number

        if(tension){
            result = (tension / cellVoltLimit) * 100

            return Math.round(result)
        }
        
    }

    return (
        <div className="conteiner mx-auto flex flex-col w-full">
            <h3 className="font-bold mb-4 text-[#0B4E65]">Placa { address }</h3>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">

                {cells && cells.map((cell) => ([

                    <CellDisplayData 
                        key={cell.idCelula}
                        idCelula={cell.idCelula}
                        dadosLeitura={cell.dadosLeitura}
                        statusCelula={cell.statusCelula}
                        chargingPercentage={getChargingPercentage(cell.dadosLeitura.at(-1)?.tensao)}
                    />

                ]))}

            </div>

            
            
        </div>
    )
}