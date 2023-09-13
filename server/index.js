import cors from 'cors'
import express from 'express'
import { download } from './download.js'

const app = express()
app.use(cors())

app.get('/summary/:id', (req, res) => {
  download(req.params.id)
  res.json({ result: "download do video realizado com sucesso!"})
  
  //res.send('ID do video:' + req.params.id)
})

app.listen(3333, () => console.log('Server running on port 3333'));

// funçõe anonimas são autoexecutaveis, não precisa chamar