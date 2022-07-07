import axios from "axios";

const host = process.env.NEXT_PUBLIC_OBJECT_DETECTION_SERVICE_HOST

const findObjects = async ({ form }) => (await axios.post(`${Boolean(host) ? host : "https://objectdetection.gldnpz.com"}/get-bounding-boxes`, form)).data

export { findObjects }