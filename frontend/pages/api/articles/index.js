import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import { Articles } from "../../../backend/models"

const readAll = async (req, res) => {
  await mongooseConnect()

  const articles = await Articles.find({})

  res.send(articles.map(
    ({ _id, title, conditions, publishTimestamp }) => ({
      id: _id,
      title,
      conditions,
      publishTimestamp
    })
  ))
}

const createArticle = async (req, res) => {
  const { title } = req.body

  await mongooseConnect()

  const article = new Articles({ 
    title,
    publishTimestamp: new Date().getTime(),
    conditions: [], 
    content: "" 
  })

  await article.save()

  res.send("Article created.")
}

export default new RouteBuilder().get(readAll).post(allowAdmin(createArticle)).build()