import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kaleidoscopic-pony-46b1e4.netlify.app/",
    ],
  })
)

app.get("/teste/route", (req, res) => {
  res.send("Api funcionando!")
})

app.get("/summary/:id", async (req, res) => {
  try {
    console.log("Iniciando processo de download")
    await download(req.params.id)
    const audioConverted = await convert()

    const result = await transcribe(audioConverted)

    return res.json({ result })
    //download do video realizado com sucesso!"
    //res.send('ID do video:' + req.params.id)
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.post("/summary", async (req, res) => {
  try {
    const result = await summarize(req.body.text)
    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.listen(3333, () => console.log("Server running on port 3333"))

// funções anonimas são autoexecutaveis, não precisa chamar
