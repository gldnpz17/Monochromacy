import { Box, Card, CardContent, FormControl, IconButton, MenuItem, Select, Stack, Typography, InputLabel, Grid } from '@mui/material'
import { Camera, ArrowBack, Replay } from "@mui/icons-material"
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from "react-query"
import { findObjects } from '../api-requests/object-detection'
import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs"
import { readAllLanguages } from '../api-requests/languages'
import Link from 'next/link'
import { readAllConditions } from '../api-requests/conditions'
import { readAllArticles, readArticleById } from '../api-requests/articles'
import ReactMarkdown from "react-markdown"

const rgbToHex = ({ color: { red, green, blue } }) => {
  const hex = [red, green, blue].map(x => x.toString(16)).join("")
  return `#${hex}`
}

const hexToRgb = (hex) => {
  const [red, green, blue] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  return { red, green, blue }
}

const calculcateColorDistance = (color1, color2) => {
  const { red: red1, green: green1, blue: blue1 } = color1
  const { red: red2, green: green2, blue: blue2 } = color2
  return Math.sqrt(
    Math.pow(red1 - red2, 2) +
    Math.pow(green1 - green2, 2) +
    Math.pow(blue1 - blue2, 2)
  )
}

const findNearestColor = (colors, targetColor) => {
  const color = colors
    .map(({ name, color }) => ({
      name,
      distance: calculcateColorDistance(color, targetColor)
    }))
    .reduce((nearestColor, currentColor) => {
      if (!nearestColor) return currentColor

      if (currentColor.distance < nearestColor.distance) {
        return currentColor
      } else {
        return nearestColor
      }
    }, null)

  return color?.name ?? "unknown"
}

const ArticleCard = ({ openArticle, title, publishTimestamp, conditions }) => {
  return (
    <Card sx={{ p: 2, cursor: "pointer" }} onClick={openArticle}>
      <Stack gap={1}>
        <Typography sx={{ flexGrow: 1, fontWeight: "bold" }}>{title}</Typography>
        <Typography sx={{ color: "gray" }}>{new Date(Number.parseInt(publishTimestamp)).toDateString()}</Typography>
        <Stack direction="row">
          {conditions.map(condition => (
            <Card key={condition.id} variant="outlined" sx={{ p: 1 }}>
              {condition}
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}

const ArticlesSection = ({ articles, conditions }) => {
  const [selectedArticle, setSelectedArticle] = useState(null)

  const { isRefetching: articleRefetching, isLoading: articleLoading, data: article } = useQuery(["articles", selectedArticle], async () => 
    Boolean(selectedArticle)
      ? await readArticleById({ id: selectedArticle }) 
      : null
  )

  if (selectedArticle && (articleRefetching || articleLoading)) {
    return <Typography>Memuat artikel...</Typography>
  } else if (selectedArticle && !articleRefetching) {
    return (
      <Stack>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <IconButton onClick={() => setSelectedArticle(null)}>
            <ArrowBack />
          </IconButton>
          <Typography sx={{ fontWeight: "bold" }}>{article.title}</Typography>
        </Stack>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </Stack>
    )
  } else {
    return (
      <Stack gap={1}>
        <Typography sx={{ fontWeight: "bold" }}>Daftar Artikel</Typography>
        {articles.map(article => (
          <ArticleCard 
            key={article.id}
            title={article.title}
            publishTimestamp={article.publishTimestamp}
            conditions={article.conditions.map(id => {
              const { medicalTerm, laymanTerm } = conditions.find(condition => condition.id === id)

              return `${laymanTerm} (${medicalTerm})`
            })}
            openArticle={() => setSelectedArticle(article.id)}
          /> 
        ))}
      </Stack>
    )
  }
}

export async function getServerSideProps() {
  return { props: {  } }
}

export default function Home() {
  const [imageForm, setImageForm] = useState(null)
  const [boundaryMarker, setBoundaryMarker] = useState(null)
  const [detectedObjects, setDetectedObjects] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const { isLoading: languagesLoading, data: languages } = useQuery("languages", readAllLanguages)

  const { isLoading: conditionsLoading, data: conditions } = useQuery(["conditions"], readAllConditions)

  const { isLoading: articlesLoading, data: articles } = useQuery(["articles"], readAllArticles)

  const { isRefetching, data } = useQuery(["objects", imageForm], async () => await findObjects({ form: imageForm }), {
    enabled: imageForm !== null,
  })

  const mode = useMemo(() => {
    return Boolean(imageForm) ? "preview" : "camera"
  }, [imageForm])

  const rgbColors = useMemo(() => {
    if (!languages) return null

    const language = languages.find(language => language.id === selectedLanguage)

    if (!language) return null

    return language.colors.map(({ name, hex }) => ({ name, color: hexToRgb(hex) }))
  }, [selectedLanguage])

  const videoRef = useRef()
  const canvasRef = useRef()
  const canvasContainerRef = useRef()

  const initCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
    videoRef.current.srcObject = stream
    videoRef.current.play()
  }

  useEffect(() => {
    if (languages) initCamera()
  }, [languagesLoading])

  useEffect(() => {
    if (!imageForm) {
      setDetectedObjects(null)
    }
  }, [imageForm])

  useEffect(() => {
    if (!detectedObjects && boundaryMarker) {
      boundaryMarker.remove()
      setBoundaryMarker(null)
    }
  }, [detectedObjects])

  const processColors = async () => {
    const colorThief = new ColorThief()
    if (data && canvasRef.current) {
      const mappedDetection = await Promise.all(data.detections.map(async (detection) => {
        const canvas = document.createElement("canvas")
        const { class: label, confidence, top, bottom, left, right } = detection
        canvas.width = right - left
        canvas.height = bottom - top

        const imageData = canvasRef.current.getContext("2d").getImageData(left, top, canvas.width, canvas.height)

        const ctx = canvas.getContext("2d")
        ctx.putImageData(imageData, 0, 0)

        const img = document.createElement("img")
        img.width = canvas.width
        img.height = canvas.height
        img.src = canvas.toDataURL()

        const [red, green, blue] = await new Promise(resolve => {
          img.addEventListener("load", async () => {
            const color = await colorThief.getColor(img)
            resolve(color)
          })
        })

        return {
          label,
          confidence,
          color: { red, green, blue }, 
          boundaries: { top, bottom, left, right } 
        }
      }))

      setDetectedObjects(mappedDetection)
    }
  }

  useEffect(() => {
    if (data && !isRefetching) {
      processColors()
    }
  }, [data, isRefetching, canvasRef.current])

  const handleTakePhoto = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
    canvasRef.current.toBlob(blob => {
      const formData = new FormData()
      formData.append('image', blob, 'image.png')
  
      setImageForm(formData)
    })
  }

  const handleReset = () => setImageForm(null)

  const handleResizeCanvas = () => {
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
  }

  const displayBoundaries = ({ boundaries: { top, bottom, left, right } }) => {
    if (boundaryMarker) boundaryMarker.remove()

    const container = canvasContainerRef.current

    const div = document.createElement("div")

    div.style.top = `${top}px`
    div.style.left = `${left}px`
    div.style.width = `${right - left}px`
    div.style.height = `${bottom - top}px`
    div.style.position = "absolute"
    div.style.border = "3px solid red"

    container.appendChild(div)

    setBoundaryMarker(div)
  }

  if (languagesLoading || conditionsLoading || articlesLoading) return <p>Loading...</p>

  return (
    <Grid container sx={{ width: "100%", height: "100vh", p: 4 }} spacing={2}>
      <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold " }}>Monochromacy</Typography>
      </Grid>
      <Grid item xs={6} sx={{ overflowY: "scroll", minHeight: "100%", height: "0" }}>
        <ArticlesSection conditions={conditions} articles={articles} />
      </Grid>
      <Grid item xs={6} sx={{ overflowY: "scroll", minHeight: "100%", height: "0" }}>
        <Stack sx={{ alignItems: "center" }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Bahasa</InputLabel>
            <Select label="Bahasa" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
              {
                languages.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Box ref={canvasContainerRef} sx={{ position: "relative", width: "100%" }}>
            <video
              ref={videoRef}
              onCanPlay={handleResizeCanvas}
              style={{ display: mode === "camera" ? "block" : "none", width: "100%" }}
            >
              Camera unavailable.
            </video>
            <canvas
              ref={canvasRef}
              style={{ display: mode === "preview" ? "block" : "none", width: "100%" }}
            />
            <IconButton
              sx={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translate(-50%)", color: "white", zIndex: 100 }}
              onClick={mode === "camera" ? handleTakePhoto : handleReset}
            >
              { mode === "camera" ? <Camera fontSize="large" /> : <Replay fontSize="large" /> }
            </IconButton>
          </Box>
          <Stack gap={2} sx={{ width: "100%", mt: "2rem" }}>
            {Boolean(detectedObjects) && (
              detectedObjects.map(detectedObject => {
                const { label, confidence, color, boundaries } = detectedObject
    
                return (
                  <Card
                    variant="outlined"
                    key={JSON.stringify(boundaries)} 
                    onMouseEnter={() => displayBoundaries({ boundaries })}
                    sx={{ "&:hover": { border: "1px solid red" } }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                          {label}
                        </Typography>
                        <Box sx={{ width: "1rem", height: "1rem", mr: 1, backgroundColor: rgbToHex({ color }) }} /> 
                        {
                          Boolean(rgbColors) && (
                            <Typography sx={{ mr: 1 }}>
                              ({ findNearestColor(rgbColors, color) })
                            </Typography>
                          )
                        }
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography>
                          {Math.round(confidence)}%
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
