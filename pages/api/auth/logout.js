import { serialize } from "cookie"
import RouteBuilder from "../../../backend/common/route-builder"

const logout = async (req, res) => {
  res
    .setHeader('Set-Cookie', serialize('authorization', `null`, { path: '/', expires: new Date(0) }))
    .send("Logged in")
}

export default new RouteBuilder().get(logout).build()