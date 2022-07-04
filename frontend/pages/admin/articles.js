import withAuthentication from "../../hoc/with-authentication"
import withLayout from "../../hoc/with-layout"
import AdminLayout from "../../layouts/admin-layout"
import { Button, Card, Grid, IconButton, Stack, Typography } from "@mui/material"
import { createArticle, deleteArticle, readAllArticles, updateArticle } from "../../api-requests/articles"
import { useMutation, useQuery, useQueryClient } from "react-query"
import Link from "next/link"
import { Edit, Delete } from "@mui/icons-material"

const ArticleCard = ({ id, title, content, deleteArticle }) => (
  <Card sx={{ p: 2 }}>
    <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
      <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
      <Link href={`/admin/articles/${id}`}>
        <IconButton>
          <Edit />
        </IconButton>
      </Link>
      <IconButton onClick={deleteArticle}>
        <Delete />
      </IconButton>
    </Stack>
  </Card>
)

const ArticlesPage = () => {
  const queryClient = useQueryClient()

  const { isLoading, data: articles } = useQuery(["articles"], readAllArticles)

  const { mutateAsync: mutateCreateArticle } = useMutation(createArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"])
    }
  })

  const { mutateAsync: mutateDeleteArticle } = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"])
    }
  })

  if (isLoading) return <Typography>Loading...</Typography>

  const handleCreateArticle = async () => {
    const title = window.prompt("Judul artikel")

    if (title) await mutateCreateArticle({ title })
  }

  const handleDeleteArticle = (id, title) => async () => {
    if (window.confirm(`Hapus artikel "${title}"?`)) {
      await mutateDeleteArticle({ id })
    }
  }

  return (
    <Stack gap={2}>
      <Typography sx={{ textDecoration: "underline", fontSize: 24 }}>Artikel</Typography>
      <Button sx={{ alignSelf: "flex-start" }} variant="outlined" onClick={handleCreateArticle}>Artikel Baru</Button>
      <Grid container spacing={2}>
        {articles.map(article => (
          <Grid item xs={4} key={article.id}>
            <ArticleCard
              id={article.id}
              title={article.title}
              content={article.content}
              deleteArticle={handleDeleteArticle(article.id, article.title)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default withAuthentication(withLayout(ArticlesPage, AdminLayout))