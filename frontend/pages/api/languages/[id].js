import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import Languages from "../../../backend/models"

const updateLanguage = async (req, res) => {
  const { id } = req.query
  const { name, colors } = req.body

  await mongooseConnect()

  await Languages.findByIdAndUpdate(id, { name, colors }, { new: true })

  res.send("Language updated.")
}

const deleteLanguage = async (req, res) => {
  const { id } = req.query

  await mongooseConnect()

  await Languages.findByIdAndDelete(id)

  res.send("Language deleted.")
}

export default new RouteBuilder().put(allowAdmin(updateLanguage)).delete(allowAdmin(deleteLanguage)).build()