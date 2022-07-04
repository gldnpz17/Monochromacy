import mongooseConnect from "../../../backend/common/mongoose-connect"
import RouteBuilder from "../../../backend/common/route-builder"
import allowAdmin from "../../../backend/middlewares/allow-admin"
import { ConditionTypes } from "../../../backend/models"

const readAll = async (req, res) => {
  await mongooseConnect()

  const conditions = await ConditionTypes.find({})

  res.send(conditions.map(
    ({ _id, laymanTerm, medicalTerm }) => ({
      id: _id,
      laymanTerm,
      medicalTerm
    })
  ))
}

const createCondition = async (req, res) => {
  const { medicalTerm, laymanTerm } = req.body

  await mongooseConnect()

  const condition = new ConditionTypes({
    medicalTerm,
    laymanTerm
  })

  await condition.save()

  res.send('Condition created.')
}

export default new RouteBuilder()
  .get(readAll)
  .post(allowAdmin(createCondition))
  .build()