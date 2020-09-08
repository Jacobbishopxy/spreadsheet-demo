/**
 * Created by Jacob Xie on 9/3/2020.
 */

import express from "express"
import cors from "cors"
import path from "path"
import { saveXlsxFile, saveThenExtractXlsxFile, extractXlsxFile } from "./controllers/fileManagement"

const app = express()


// Express configuration
app.set("port", process.env.PORT || 2999)
app.set("env", process.env.NODE_ENV === 'prod' ? "prod" : "dev")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Api
app.post("/api/saveXlsxFile", saveXlsxFile)
app.post("/api/saveThenExtractXlsxFile", saveThenExtractXlsxFile)
app.post("/api/extractXlsxFile", extractXlsxFile)

// Environment
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
  })
}

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${ app.get("port") }`)
})

