 import { Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { readArticleById, updateArticle } from "../../../api-requests/articles";
import withLayout from "../../../hoc/with-layout";
import withRouter from "../../../hoc/with-router";
import AdminLayout from "../../../layouts/admin-layout";
import Link from "next/link"
import { useEffect, useState } from "react";
import { createCondition, deleteCondition, readAllConditions } from "../../../api-requests/conditions";
import { Add, Delete } from "@mui/icons-material"

export default withLayout(withRouter(function EditArticle({ router }) {
  const { articleId } = router.query

  const queryClient = useQueryClient()

  const { isLoading: articleLoading, data: article } = useQuery(["article", articleId], async () => await readArticleById({ id: articleId }))

  const { isLoading: conditionsLoading, data: conditions } = useQuery(["conditions"], readAllConditions)

  const [selectedConditions, setSelectedConditions] = useState([])

  useEffect(() => {
    if (article) setSelectedConditions(article.conditions)
  }, [articleLoading])

  const { mutateAsync: mutateCreateCondition } = useMutation(createCondition, {
    onSuccess: () => {
      queryClient.invalidateQueries(['conditions'])
    }
  })

  const { mutateAsync: mutateDeleteCondition } = useMutation(deleteCondition, {
    onSuccess: () => {
      queryClient.invalidateQueries(['conditions'])
      queryClient.invalidateQueries(['articles'])
      queryClient.invalidateQueries(['article'])
    }
  })

  const { mutateAsync: mutateUpdateArticle } = useMutation(updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"])
      queryClient.invalidateQueries(["article"])
    }
  })

  if (!(article && conditions)) return <></>

  const handleAddCondition = async () => {
    const laymanTerm = window.prompt('Nama umum')
    const medicalTerm = window.prompt('Nama medis')

    if (laymanTerm && medicalTerm) {
      await mutateCreateCondition({ laymanTerm, medicalTerm })

      alert('Kondisi medis berhasil ditambahkan.')
    }
  }

  const handleDeleteCondition = (id) => async (e) => {
    e.stopPropagation()

    if (window.confirm('Hapus kondisi medis?')) {
      await mutateDeleteCondition({ id })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { title, content } = e.target

    await mutateUpdateArticle({
      id: articleId,
      title: title.value,
      conditions: selectedConditions,
      content: content.value
    })

    router.push('/admin/articles')
  }

  const conditionSelected = (id) => Boolean(selectedConditions.find(conditionId => conditionId === id))

  const toggleCondition = (id) => () => {
    if (conditionSelected(id)) {
      setSelectedConditions(selectedConditions.filter(conditionId => conditionId !== id))
    } else {
      setSelectedConditions([...selectedConditions, id])
    }
  }

  return (
    <Stack gap={4}>
      <Typography sx={{ textDecoration: "underline", fontSize: 24 }}>Artikel &gt; {article.title}</Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField label="Judul" name="title" defaultValue={article.title} />
          <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
            <Typography>Kondisi Medis :</Typography>
            {conditions.map(condition => (
              <Button
                key={condition.id}
                onClick={toggleCondition(condition.id)}
                variant={conditionSelected(condition.id) ? 'contained' : 'outlined'}
              >
                {condition.laymanTerm} ({condition.medicalTerm})
                <IconButton sx={{ ml: 1 }} onClick={handleDeleteCondition(condition.id)}>
                  <Delete />
                </IconButton>
              </Button>
            ))}
            <IconButton onClick={handleAddCondition}>
              <Add />
            </IconButton>
          </Stack>
          <TextField multiline rows={16} name="content" defaultValue={article.content} label="Konten"/>
          <Stack direction="row" gap={2}>
            <Button variant="contained" type="submit">Save</Button>
            <Link href="/admin/articles">
              <Button variant="outlined">Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}), AdminLayout)