import mongooseConnect from "../../../backend/common/mongoose-connect";
import RouteBuilder from "../../../backend/common/route-builder";
import allowAdmin from "../../../backend/middlewares/allow-admin";
import { Languages } from "../../../backend/models";

const readAll = async (req, res) => {
  await mongooseConnect()

  const languages = await Languages.find({})

  res.send(languages.map(({ _id, name, colors }) => ({ id: _id, name, colors })))
}

const createLanguage = async (req, res) => {
  const { name, colors } = req.body

  await mongooseConnect()

  const language = new Languages({ name, colors })

  await language.save()

  res.send("Language created.")
}

export default new RouteBuilder().get(readAll).post(allowAdmin(createLanguage)).build()