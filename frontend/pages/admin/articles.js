import withAuthentication from "../../hoc/with-authentication"
import withLayout from "../../hoc/with-layout"
import AdminLayout from "../../layouts/admin-layout"
import { Stack, Typography } from "@mui/material"

const ArticlesPage = () => {
  return (
    <Stack gap={2}>
      <Typography sx={{ textDecoration: "underline", fontSize: 24 }}>Artikel</Typography>
    </Stack>
  )
}

export default withAuthentication(withLayout(ArticlesPage, AdminLayout))