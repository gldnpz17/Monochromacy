import { Box, Button, Typography, Stack, IconButton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { deleteAccount, getAccounts } from "../../api-requests/auth"
import withAuthentication from "../../hoc/with-authentication"
import useModal from "../../hooks/use-modal"
import CreateAccountModal from "../../modals/create-account-modal"
import { Delete } from "@mui/icons-material"
import withLayout from "../../hoc/with-layout"
import AdminLayout from "../../layouts/admin-layout"
import { useMemo } from "react"

const AccountsPage = () => {
  const { isLoading, data } = useQuery(["accounts"], getAccounts)

  const client = useQueryClient()
    
  const { mutateAsync } = useMutation(deleteAccount, {
    onSuccess: () => {
      client.invalidateQueries(["accounts"])
    }
  })

  const handleDelete = (id) => async () => {
    if (window.confirm("Hapus akun?")) {
      mutateAsync({ id })
    }
  }

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 350 },
      { field: "username", headerName: "Username", flex: 1 },
      { 
        field: "actions", 
        headerName: "Aksi", 
        width: 150,
        renderCell: (params) => {
          return (
            <Button onClick={handleDelete(params.row.id)}>Hapus</Button>
          )
        } 
      }
    ]
  }, [])

  const { openModal } = useModal(CreateAccountModal)

  const handleAddAccount = () => {
    openModal()
  }

  return (
    <Stack gap={2}>
      <Typography sx={{ textDecoration: "underline", fontSize: 24 }}>Kelola Akun Admin</Typography>
      <Button onClick={handleAddAccount} variant="outlined" sx={{ alignSelf: "start" }}>Tambah Akun Admin</Button>
      <Box sx={{ height: "32rem" }}>
        {
          isLoading
            ? <Typography>Loading...</Typography>
            : <DataGrid columns={columns} rows={data} />
        }
      </Box>
    </Stack>
  )
}

export default withAuthentication(withLayout(AccountsPage, AdminLayout))