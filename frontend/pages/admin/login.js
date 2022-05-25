import { useRouter } from "next/router"
import { Box, Card, Typography, TextField, Stack, Button } from "@mui/material"
import { useMutation, useQueryClient, useQuery } from "react-query"
import { getIdentity, login } from "../../api-requests/auth"
import { useEffect } from "react"

export default function LoginPage() {
  const router = useRouter()

  const client = useQueryClient()

  const { isLoading, data } = useQuery(["auth", "identity"], getIdentity)

  const { mutateAsync } = useMutation(login, {
    onSuccess: async () => {
      await client.invalidateQueries(["auth"])
      console.log('Login successful.')
    }
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, password } = e.target

    await mutateAsync({ 
      username: username.value,
      password: password.value
    })
  }

  useEffect(() => {
    if (!isLoading && data.account !== null) router.push("/admin/accounts")
  }, [isLoading, data])

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Card sx={{ p: 2 }}>
        <Typography sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>Monochromacy Admin</Typography>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField label="username" name="username" />
            <TextField label="password" name="password" type="password" />
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}