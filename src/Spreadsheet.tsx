/**
 * Created by Jacob Xie on 9/2/2020.
 */

import React, { useState } from 'react'

import axios from "axios"
import { Button, Card, Form } from "react-bootstrap"
import "./Spreadsheet.css"


const inputFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

export const Spreadsheet = () => {

  const [uploadFile, setUploadFile] = useState<File>()

  const importOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) setUploadFile(e.target.files[0])
  }

  const onUploadFile = () => {
    if (uploadFile) {
      const data = new FormData()
      data.append("file", uploadFile)

      axios
        .post("http://localhost:5000/api/upload", data)
        .then(res => alert(res.statusText))
    }
  }

  return (
    <Card>
      <Card.Title>File Upload</Card.Title>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Choose File</Form.Label>
            <Form.File
              id="upload-zone"
              type="file"
              accept={ inputFileType }
              onChange={ importOnChange }
            />
          </Form.Group>

          <Form.Group>
            <Button onClick={ onUploadFile }>Upload</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}
