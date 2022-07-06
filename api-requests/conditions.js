import axios from "axios"

const createCondition = async ({ medicalTerm, laymanTerm }) => await axios.post("/api/conditions", { medicalTerm, laymanTerm })

const readAllConditions = async () => (await axios.get('/api/conditions')).data

const deleteCondition = async ({ id }) => await axios.delete(`/api/conditions/${id}`)

export {
  createCondition,
  readAllConditions,
  deleteCondition
}