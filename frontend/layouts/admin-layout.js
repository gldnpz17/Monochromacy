import { Box, Drawer, Toolbar, Divider, List, ListItem, Typography, Stack, IconButton } from "@mui/material"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getIdentity, logout } from "../api-requests/auth"
import { Key, Logout } from "@mui/icons-material"
import useModal from "../hooks/use-modal"
import UpdatePasswordModal from "../modals/update-password-modal"
import Link from "next/link"

const AdminLayout = ({ children }) => {
  const { isLoading, data } = useQuery(["auth", "identity"], getIdentity)

  const client = useQueryClient()

  const { mutateAsync } = useMutation(logout, {
    onSuccess: () => {
      client.invalidateQueries(["auth"])
      window.location.reload()
    }
  })

  const { openModal: openUpdatePasswordModal } = useModal(UpdatePasswordModal)

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography sx={{ pt: 2, px: 2, fontSize: 18, fontWeight: "bold" }}>MonochromacyAdmin</Typography>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Stack sx={{ pr: 2 }}>
              <Typography>Selamat datang, Admin</Typography>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={() => openUpdatePasswordModal()}>
              <Key />
            </IconButton>
            <IconButton onClick={async () => await mutateAsync()}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        <List>
          <Link href="/admin/languages">
            <ListItem button>Nama Warna</ListItem>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 4 }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout