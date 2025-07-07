"use client";

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Board} from "@/app/pages/ChargingHistory/components/Board";
import {BoardBMS, Charging, Status} from "@/app/pages/ChargingHistory/types";

interface BoardStatus {
    complete: number
    error: number
    active: number
    inactive: number
}

interface ChargingCardProps {
    stationName: string,
    charging: Charging
    buttonOnclick: () => void,
    buttonText: string,
}

export function ChargingCard({
    stationName,
    charging,
    buttonOnclick,
    buttonText
}: ChargingCardProps) {

    const getStatusColor = (status: Status) => {
        switch (status) {
            case Status.PROGRESS:
                return 'bg-blue-600'
            case Status.ERROR:
                return 'bg-red-800'
            case Status.FINISHED:
                return 'bg-green-500'
            case Status.STOPPED:
                return 'bg-customRed'
            default:
                return 'bg-gray-500'
        }
    }

    const getStatusText = (status: Status) => {
        switch (status) {
            case Status.PROGRESS:
                return 'Em progresso'
            case Status.ERROR:
                return 'Interrompido por erro'
            case Status.FINISHED:
                return 'Finalizado com sucesso'
            case Status.STOPPED:
                return 'Interrompido pelo usuário'
            default:
                return ''
        }
    };

    function getDate(stringDatetime: string){
        return new Date(stringDatetime).toLocaleDateString()
    }

    function getTime(stringDatetime: string){
        const timeString = new Date(stringDatetime).toTimeString()
        const match = timeString.match(/\d{2}:\d{2}:\d{2}/);
        return match ? match[0] : ""
    }

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-4">
                        <h3 className="text-[#00334C] font-medium">{stationName}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">Início</div>
                                <div className="bg-[#00334C] text-white p-2 rounded text-sm">
                                    {
                                        `${getDate(charging.dataHoraInicio)} - ${getTime(charging.dataHoraInicio)}`   
                                        || '-'
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Fim</div>
                                <div className="bg-[#00334C] text-white p-2 rounded text-sm">
                                    {
                                       charging.dataHoraFim !== null ? `${getDate(charging.dataHoraFim)} - ${getTime(charging.dataHoraFim)}`
                                       : '-'
                                    
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-1">Status do carregamento</div>
                            <div className={`${getStatusColor(charging.statusCarregamento)} text-white p-2 rounded`}>
                                {getStatusText(charging.statusCarregamento)}
                            </div>
                        </div>
                    </div>

                    {charging.placasBMS.map((board: BoardBMS) => (
                        <Board key={board.endereco} board={board} />
                    ))}
                </div>

            </div>
            <div className="flex justify-end mt-4"> {/* Added margin top for spacing */}
                <Button variant="default" className="bg-[#00334C]" onClick={buttonOnclick}>
                    {buttonText}
                </Button>
            </div>
        </Card>
    )
}

