const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarregamentoSchema = new Schema(
  {
    idEstacao: {
      type: Schema.Types.ObjectId,
      ref: "EstacaoCarregamento",
      required: true,
    },
    dataHoraInicio: {
      type: Date,
      required: true,
    },
    dataHoraFim: {
      type: Date,
      default: null,
    },
    statusCarregamento: {
      type: String,
      required: true,
      enum: ["EM PROGRESSO", "CONCLUIDO", "ERRO", "INTERROMPIDO POR USUARIO"],
    },
    placasBMS: [
      {
        endereco: {
          type: String,
          required: true
        },
        celulas: [
          {
            idCelula: {
              type: Number,
              required: true,
            },
            statusCelula: {
              type: String,
              required: true,
              enum: ["CARREGANDO", "COMPLETA", "ERRO", "DESLIGADA"],
            },
            dadosLeitura: [
              {
                dataHora: {
                  type: Date,
                  default: new Date(),
                },
                temperatura: {
                  type: mongoose.Types.Decimal128,
                  required: false,
                },
                tensao: {
                  type: mongoose.Types.Decimal128,
                  required: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Carregamento =
  mongoose.models.Carregamento ||
  mongoose.model("Carregamento", CarregamentoSchema);

//module.exports = Carregamento;
