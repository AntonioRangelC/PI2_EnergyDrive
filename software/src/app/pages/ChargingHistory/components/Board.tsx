"use client";
import {BoardBMS, Cell, CellStatus} from "@/app/pages/ChargingHistory/types";

export function Board({board}: {board: BoardBMS} ) {
    const cellsCompleted : Cell[] = board.celulas.filter(cell => cell.statusCelula === CellStatus.COMPLETA)
    const cellsWithError: Cell[] = board.celulas.filter(cell => cell.statusCelula === CellStatus.ERRO);
    const cellsLoading : Cell[] = board.celulas.filter(cell => cell.statusCelula === CellStatus.CARREGANDO);
    const cellsOff : Cell[] = board.celulas.filter(cell => cell.statusCelula === CellStatus.DESLIGADA);

    return (
        <div className="border rounded p-4">
            <div className="text-sm font-medium mb-4">Placa {board.endereco}</div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-green-600">Completo(s)</div>
                    <div>{cellsCompleted.length} Células</div>
                </div>
                <div>
                    <div className="text-red-600">Erro(s)</div>
                    <div>{cellsWithError.length} Células</div>
                </div>
                <div>
                    <div className="text-yellow-600">Carregando</div>
                    <div>{cellsLoading.length} Células</div>
                </div>
                <div>
                    <div className="text-yellow-600">Desligada</div>
                    <div>{cellsOff.length} Células</div>
                </div>
            </div>
        </div>
    )
}

