const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER"],
    },
    estacoes: [
      {
        type: Schema.Types.ObjectId,
        ref: "EstacaoCarregamento",
        required: false, 
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const Usuario =  mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);


