/**
 * Created by Jacob Xie on 9/3/2020.
 */


import multer from "multer"
import { Request, Response } from "express"


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "cache"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
})

const upload = multer({ storage }).single("xlsx_file")

export const uploadFile = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
}

