import axios from "axios";

const findObjects = async ({ form }) => (await axios.post(`${process.env.NEXT_PUBLIC_OBJECT_DETECTION_SERVICE_HOST}/get-bounding-boxes`, form)).data

export { findObjects }