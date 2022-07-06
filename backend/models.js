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

const articleSchema = mongoose.Schema({
  title: String,
  publishTimestamp: Number,
  conditions: [mongoose.Schema.Types.ObjectId], 
  content: String
})

const conditionTypeSchema = mongoose.Schema({
  medicalTerm: String,
  laymanTerm: String
})

const Languages = mongoose.models.Languages || mongoose.model("Languages", languageSchema)
const Articles = mongoose.models.Articles || mongoose.model("Articles", articleSchema)
const ConditionTypes = mongoose.models.ConditionTypes || mongoose.model("ConditionTypes", conditionTypeSchema)

export { Languages, Articles, ConditionTypes }