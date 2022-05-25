import axios from "axios"

const login = async ({ username, password }) => axios.post("https://monochromacy-backend.azurewebsites.net/api/login?code=KRyF63xpy02uobaTxi58sdz7twzVBdh9wrsB-ENxiiBYAzFuWZ3WOg==", { username, password }, { 
  withCredentials: true,
})

const getIdentity = async () => (await axios.get("https://monochromacy-backend.azurewebsites.net/api/auth-get-identity?code=Y4XsamMsjADog45g4Bg_paMYZbqGD7zFp4XY45-W18s6AzFuhTreOQ==", {
  withCredentials: true,
})).data

const getAccounts = async () => (await axios.get("https://monochromacy-backend.azurewebsites.net/api/crud-accounts?code=6AvXc7jzCzXxJ3LFcXDrt2viNNDqsKFAfcZ7KUYIkkeZAzFuygdqVg==", {
  withCredentials: true,
})).data

const createAccount = async ({ username, password }) => {
  await axios.post("https://monochromacy-backend.azurewebsites.net/api/crud-accounts?code=6AvXc7jzCzXxJ3LFcXDrt2viNNDqsKFAfcZ7KUYIkkeZAzFuygdqVg==", {
    username, password
  }, { withCredentials: true })
}

const deleteAccount = async ({ id }) => {
  await axios.delete("https://monochromacy-backend.azurewebsites.net/api/crud-accounts?code=6AvXc7jzCzXxJ3LFcXDrt2viNNDqsKFAfcZ7KUYIkkeZAzFuygdqVg==", {
    withCredentials: true,
    data: { id }
  })
}

const updatePassword = async ({ password }) => {
  await axios.put("https://monochromacy-backend.azurewebsites.net/api/auth-update-password?code=_viPGB67mdV3X5-sbmvmAOCl7X-bh0D6AgRAoyOqCyxRAzFux67zgw==", {
    password
  }, { withCredentials: true })
}

const logout = async () => {
  await axios.post("https://monochromacy-backend.azurewebsites.net/api/logout?code=v2x4eCvkLm6NGpSxI4e-g4XKMW453QK7sckYbjDSYjGuAzFuIGPU3w==", {}, { withCredentials: true })
}

export {
  login,
  getIdentity,
  getAccounts,
  createAccount,
  deleteAccount,
  updatePassword,
  logout
}