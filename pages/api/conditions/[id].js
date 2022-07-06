import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import { Articles, ConditionTypes } from "../../../backend/models"

const deleteCondition = async (req, res) => {
  const { id } = req.query

  await mongooseConnect()

  const articles = await Articles.find({ conditions: [id] })

  await Promise.all(articles.map(async (article) => {
    article.conditions = article.conditions.filter(conditionId => conditionId !== id)

    await article.save()
  }))

  await ConditionTypes.findByIdAndDelete(id)

  res.send('Condition deleted.')
}

export default new RouteBuilder()
  .delete(allowAdmin(deleteCondition))
  .build()