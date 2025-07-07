export type Estation = {
    _id: string;
    estaLigada: boolean;
    createdAt: string;
    updatedAt: string;
}

export enum Status {
    PROGRESS = "EM PROGRESSO",
    FINISHED = "CONCLUIDO",
    ERROR = "ERRO",
    STOPPED = "INTERROMPIDO POR USUARIO"
};

export enum CellStatus {
    CARREGANDO = "CARREGANDO",
    COMPLETA = "COMPLETA",
    ERRO = "ERRO",
    DESLIGADA = "DESLIGADA",
};

export type CellData = {
    dataHora: string;
    temperatura: string;
    tensao: number
};

export type Cell = {
    idCelula: number;
    statusCelula: CellStatus,
    dadosLeitura: CellData[]
};

export type BoardBMS = {
    endereco: string;
    celulas : Cell[]
};

export type Charging = {
    _id: string;
    idEstacao : string;
    dataHoraInicio: string;
    dataHoraFim: string;
    statusCarregamento: Status;
    placasBMS: BoardBMS[];
    createdAt: string;
    updatedAt: string;
};

