import axios from "axios"

const createLanguage = async ({ name }) => await axios.post("/api/languages", { name, colors: [] })

const readAllLanguages = async () => (await axios.get("/api/languages")).data

const updateLanguage = async ({ id, name, colors }) => await axios.put(`/api/languages/${id}`, { name, colors })

const deleteLanguage = async ({ id }) => await axios.delete(`/api/languages/${id}`)

export {
  createLanguage,
  readAllLanguages,
  updateLanguage,
  deleteLanguage
}