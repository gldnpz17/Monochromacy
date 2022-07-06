import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import { Articles } from "../../../backend/models"

const getArticleById = async (req, res) => {
  const { id } = req.query

  await mongooseConnect()

  const article = await Articles.findById(id)

  res.send(article)
}

const updateArticle = async (req, res) => {
  const { id } = req.query
  const { title, conditions, content } = req.body

  await mongooseConnect()

  await Articles.findByIdAndUpdate(id, { title, conditions, content }, { new: true })

  res.send("Article updated")
}

const deleteArticle = async (req, res) => {
  const { id } = req.query

  await mongooseConnect()

  await Articles.findByIdAndDelete(id)

  res.send("Article deleted")
}

export default new RouteBuilder().get(getArticleById).put(allowAdmin(updateArticle)).delete(allowAdmin(deleteArticle)).build()