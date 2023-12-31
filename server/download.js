import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => new Promise((resolve, reject) => {
  const videoUrl = "https://www.youtube.com/shorts/" + videoId
  console.log("realizando o download do video: ", videoId)

  ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      if (seconds > 60) {
        throw new Error("Esse video é muito longo")
      }
    })
    .on("end", () => {
      console.log("Download finalizado")
      resolve()
    })
    .on("error", (error) => {
      console.log(
        "Erro ao realizar o download do video. Detalhes do erro:",
        error
      )
      reject(error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
