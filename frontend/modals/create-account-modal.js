import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material"
import { useMutation, useQueryClient } from "react-query"
import { createAccount } from "../api-requests/auth"

const CreateAccountModal = ({ open, handleClose }) => {
  const client = useQueryClient()

  const { mutateAsync } = useMutation(createAccount, {
    onSuccess: () => {
      client.invalidateQueries(["accounts"])
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, password } = e.target

    await mutateAsync({ username: username.value, password: password.value })

    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Akun Admin Baru</DialogTitle>
        <DialogContent>
          <Stack sx={{ pt: 1 }} gap={2}>
            <TextField label="Username" name="username" />
            <TextField label="Default Password" type="password" name="password" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Tutup</Button>
          <Button type="submit">Tambah</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateAccountModal