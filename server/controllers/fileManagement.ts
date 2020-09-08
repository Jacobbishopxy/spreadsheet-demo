/**
 * Created by Jacob Xie on 9/3/2020.
 */


import { Request, Response } from "express"
import multer from "multer"
import formidable from "formidable"
import exceljs from "exceljs"


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "cache"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
})

const upload = multer({ storage }).single("xlsx_file")

export const saveXlsxFile = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
}

interface Spreadsheet {
  name: string
  data: object[]
}

interface readXlsxOptions {
  multiSheets?: boolean
}

const recordXlsxRows = (book: Spreadsheet[], sheet: exceljs.Worksheet) => {
  const s: object[] = []

  sheet.eachRow({ includeEmpty: true }, row => {
    const rv = row.values as any[]
    if (rv.length > 1)
      s.push(rv.slice(1))
    else
      s.push(rv)
  })

  book.push({
    name: sheet.name,
    data: s
  })
}


const readFromXlsx = async (filepath: string, options: readXlsxOptions) => {
  const workbook = new exceljs.Workbook()
  const f = await workbook.xlsx.readFile(filepath)

  let book: Spreadsheet[] = []

  if (options.multiSheets) {
    const s = f.getWorksheet(1)
    recordXlsxRows(book, s)
  } else {
    f.eachSheet(worksheet => {
      recordXlsxRows(book, worksheet)
    })
  }

  return book
}

export const saveThenExtractXlsxFile = (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    let options = {}
    const multiSheets = req.query.multiSheets
    if (multiSheets && multiSheets === "true") options = { ...options, multiSheets: true }

    const ans = await readFromXlsx(req.file.path, options)
    return res.status(200).send(ans)
  })
}

export const extractXlsxFile = (req: Request, res: Response) => {

  const form = new formidable.IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json(err)

    let options = {}
    const multiSheets = req.query.multiSheets
    if (multiSheets && multiSheets === "true") options = { ...options, multiSheets: true }

    if (files.xlsx_file) {
      const ans = await readFromXlsx(files.xlsx_file.path, options)
      return res.status(200).send(ans)
    }
    return res.status(500)
  })
}

