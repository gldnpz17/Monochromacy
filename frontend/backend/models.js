import mongoose from "mongoose"

const languageSchema = mongoose.Schema({
  name: String,
  colors: [
    {
      name: String,
      hex: String
    }
  ]
})

const Languages = mongoose.models.Languages || mongoose.model("Languages", languageSchema)

export default Languages