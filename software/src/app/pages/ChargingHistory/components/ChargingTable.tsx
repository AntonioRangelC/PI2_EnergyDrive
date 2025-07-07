"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Charging, Status} from "@/app/pages/ChargingHistory/types";

interface ChargingTableProps {
    charging: Charging | undefined;
    targetRef:React.Ref<HTMLDivElement>
    showReport: boolean;
}

export default function ChargingTable({ charging, targetRef, showReport }: ChargingTableProps) {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const getStatusLabel = (status: Status) => {
        switch (status) {
            case Status.PROGRESS:
                return "Em progresso"
            case Status.FINISHED:
                return "Completo"
            case Status.STOPPED:
                return "Interrompido por usuário"
            case Status.ERROR:
                return "Erro"
            default:
                return "Desconhecido"
        }
    }

    return (
        <div>
            <div className={`${showReport ? 'hidden' : 'flex flex-col gap-4'}`} ref={targetRef}>
                <div className="flex flex-col gap-4 p-2" key={charging?._id}>
                    <ul>
                        <li><span className="font-bold">Id do carregamento:</span> {charging?._id}</li>
                        <li><span className="font-bold">Início: </span>{charging?.dataHoraInicio ? formatDate(charging.dataHoraInicio): "N/A"}</li>
                        <li><span className="font-bold">Fim: </span>{charging?.dataHoraFim ? formatDate(charging.dataHoraFim) : "N/A"}</li>
                        <li><span className="font-bold">Status do carregamento: </span>{charging?.statusCarregamento ? getStatusLabel(charging.statusCarregamento) : 'N/A'}</li>
                    </ul>
                    {charging?.placasBMS.map((placa) => (
                        <div key={placa.endereco}>
                            <h2 className="font-bold text-lg">Placa: {placa.endereco}</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Célula</TableHead>
                                        <TableHead>Status da célula</TableHead>
                                        <TableHead>Tensão</TableHead>
                                        <TableHead>Temperatura</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {placa.celulas.map((celula: any) => (
                                    
                                    <TableRow key={celula.idCelula}>
                                            
                                        <TableCell>{celula.idCelula}</TableCell>
                                        <TableCell>{celula.statusCelula}</TableCell>
                                        <TableCell>{celula.dadosLeitura.at(-1) ? celula.dadosLeitura.at(-1).tensao.$numberDecimal: 'Vazio'} V</TableCell>
                                        <TableCell>{celula.dadosLeitura.at(-1) ? celula.dadosLeitura.at(-1).temperatura.$numberDecimal: 'Vazio'} °C</TableCell>
                                    </TableRow>      
                                ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))}
                </div>
            
            
            </div>
        </div>
    )
}

