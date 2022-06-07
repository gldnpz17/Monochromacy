import jwt from "jsonwebtoken"
import { parse } from "cookie"

const allowAdmin = (next) => async (req, res) => {
  try {
    const rawToken = parse(req.headers["cookie"])["authorization"].split(" ")[1]
    jwt.verify(rawToken, process.env.JWT_SIGNING_KEY)
    await next(req, res)
  } catch (err) {
    console.error(err)
    res.status(401).send("Unauthorized")
  }
}

export default allowAdmin