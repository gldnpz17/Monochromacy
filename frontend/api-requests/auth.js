import axios from "axios"

const login = async ({ password }) => axios.post("/api/auth/login", { password })

const getIdentity = async () => (await axios.get("/api/auth/get-identity")).data

const logout = async () => await axios.get("/api/auth/logout")

export {
  login,
  getIdentity,
  logout
}