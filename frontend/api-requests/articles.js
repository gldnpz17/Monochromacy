import axios from "axios"

const createArticle = async ({ title }) => await axios.post("/api/articles", { title })

const readAllArticles = async () => (await axios.get("/api/articles")).data

const readArticleById = async ({ id }) =>  (await axios.get(`/api/articles/${id}`)).data

const updateArticle = async ({ id, title, conditions, content }) => await axios.put(`/api/articles/${id}`, { title, conditions, content })

const deleteArticle = async ({ id }) => await axios.delete(`/api/articles/${id}`)

export {
  createArticle,
  readAllArticles,
  readArticleById,
  updateArticle,
  deleteArticle
}