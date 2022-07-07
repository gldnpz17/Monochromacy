import axios from "axios";

const host = process.env.NEXT_PUBLIC_OBJECT_DETECTION_SERVICE_HOST

const findObjects = async ({ form }) => (await axios.post(`${Boolean(host) ? host : "http://20.109.48.247:80"}/get-bounding-boxes`, form)).data

export { findObjects }