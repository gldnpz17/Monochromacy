import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material"
import { useMutation, useQueryClient } from "react-query"
import { createAccount, updatePassword } from "../api-requests/auth"

const UpdatePasswordModal = ({ open, handleClose }) => {
  const client = useQueryClient()

  const { mutateAsync } = useMutation(updatePassword, {
    onSuccess: () => {
      client.invalidateQueries(["auth"])
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { password } = e.target

    await mutateAsync({ password: password.value })

    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Ubah Kata Sandi</DialogTitle>
        <DialogContent>
          <Stack sx={{ pt: 1 }} gap={2}>
            <TextField label="Password Baru" type="password" name="password" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Tutup</Button>
          <Button type="submit">Ubah</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UpdatePasswordModal