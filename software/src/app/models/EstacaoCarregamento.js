const mongoose = require("mongoose");
const { Schema } = mongoose;

const EstacaoCarregamentoSchema = new Schema(
  {
    estaLigada: {
      type: Boolean,
      required: true,
    },
    usuarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true, 
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const EstacaoCarregamento =  mongoose.models.EstacaoCarregamento || mongoose.model(
  "EstacaoCarregamento",
  EstacaoCarregamentoSchema
);

//module.exports = EstacaoCarregamento;
