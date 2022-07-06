import withAuthentication from "../../hoc/with-authentication"
import withLayout from "../../hoc/with-layout"
import AdminLayout from "../../layouts/admin-layout"
import { Button, Card, Grid, IconButton, List, ListItem, Stack, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { createLanguage, deleteLanguage, readAllLanguages, updateLanguage } from "../../api-requests/languages"
import { Add, Delete } from "@mui/icons-material"
import { Box } from "@mui/system"

const LanguageCard = ({ name, colors, addColor, removeColor, deleteLanguage }) => {
  return (
    <Card>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography sx={{ flexGrow: 1 }}>{name}</Typography>
          <IconButton onClick={addColor}>
            <Add />
          </IconButton>
          <IconButton onClick={deleteLanguage}>
            <Delete />
          </IconButton>
        </Stack>
        <List>
          {colors.map(color => {
            return <ListItem key={color.hex} sx={{ px: 0, py: 0, pb: 1 }} >
              <Stack gap={2} direction="row" sx={{ alignItems: "center", width: "100%" }}>
                <Box sx={{ width: "1rem", height: "1rem", backgroundColor: color.hex, borderRadius: "0.1rem" }}></Box>
                <Typography sx={{ flexGrow: 1 }}>{color.name}</Typography>
                <IconButton onClick={() => removeColor({ hex: color.hex })}>
                  <Delete />
                </IconButton>
              </Stack>
            </ListItem>
          })}
        </List>
      </Stack>
    </Card>
  )
}

const LanguagesPage = () => {
  const queryClient = useQueryClient()

  const { isLoading, data: languages } = useQuery(["languages"], readAllLanguages)

  const { mutateAsync: mutateCreateLanguage } = useMutation(createLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"])
    }
  })

  // Update language mutation.
  const { mutateAsync: mutateUpdateLanguage } = useMutation(updateLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"])
    }
  })

  // Delete language mutation.
  const { mutateAsync: mutateDeleteLanguage } = useMutation(deleteLanguage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"])
    }
  })

  const handleAddLanguage = async () => {
    const name = window.prompt("Nama Bahasa")

    if (name) await mutateCreateLanguage({ name })
  }

  const handleAddColor = ({ id, name, colors }) => async () => {
    const colorName = window.prompt("Nama Warna")
    const colorHex = window.prompt("Nilai RGB (dalam format Hex)")

    if (colorName && colorHex) 
      await mutateUpdateLanguage({ 
        id, 
        name, 
        colors: [...colors, { name: colorName, hex: colorHex }] 
      })
  }

  const handleRemoveColor = ({ id, name, colors }) => async ({ hex }) => {
    await mutateUpdateLanguage({ 
      id, 
      name, 
      colors: colors.filter(color => color.hex !== hex) 
    })
  }

  const handleDeleteLanguage = (id) => async () => {
    if (window.confirm("Hapus bahasa?")) await mutateDeleteLanguage({ id })
  }

  if (isLoading) return null

  return (
    <Stack gap={2}>
      <Typography sx={{ textDecoration: "underline", fontSize: 24 }}>Nama Warna</Typography>
      <Button onClick={handleAddLanguage} variant="outlined" sx={{ alignSelf: "start" }}>Tambah Bahasa</Button>
      <Grid container spacing={2}>
        {languages.map(language => {
          return (
            <Grid item xs={4} key={language.id}>
              <LanguageCard
                key={language.id}
                name={language.name}
                colors={language.colors}
                addColor={handleAddColor(language)}
                removeColor={handleRemoveColor(language)}
                deleteLanguage={handleDeleteLanguage(language.id)}
              />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default withAuthentication(withLayout(LanguagesPage, AdminLayout))