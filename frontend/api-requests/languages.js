import axios from "axios"

const createLanguage = async ({ name }) => {
  await axios.post("https://monochromacy-backend.azurewebsites.net/api/create-language?code=mp9G-6Q1VbKwtppAKIxaJrH3g8WRWiOqKcO3hqZhTxDOAzFuiZVgrQ==", { name, colors: [] }, {
    withCredentials: true
  })
}

const readAllLanguages = async () => 
  (await axios.get("https://monochromacy-backend.azurewebsites.net/api/read-all-languages?code=7zmooOLD55v0nPBubg5ZhqzkAKuejCP0OBg4fUQLy5a1AzFuBZbz6g==", {
    withCredentials: true
  })).data

const updateLanguage = async ({ id, name, colors }) => {
  await axios.put("https://monochromacy-backend.azurewebsites.net/api/update-language?code=u4_elhgzm-l_Mb43rIScufmTK2w1EbvnuVJ7Zmnvt1FtAzFuYG7TJw==", {
    id, 
    newItem: {
      name,
      colors
    }
  }, { withCredentials: true })
}

const deleteLanguage = async ({ id }) => {
  await axios.delete("https://monochromacy-backend.azurewebsites.net/api/delete-language?code=zbLUvcdEJq-3JQzHxP7HkJf_wOqieLIG1MUvUOp8EXG3AzFunuGHQA==", {
    withCredentials: true,
    data: { id }
  })
}

export {
  createLanguage,
  readAllLanguages,
  updateLanguage,
  deleteLanguage
}