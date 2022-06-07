import axios from "axios";

const findObjects = async ({ form }) => (await axios.post(`http://${process.env.NEXT_PUBLIC_OBJECT_DETECTION_SERVICE_HOSTNAME}/get-bounding-boxes`, form)).data

export { findObjects }