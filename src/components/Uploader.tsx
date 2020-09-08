/**
 * Created by Jacob Xie on 9/2/2020.
 */

import React, { useState } from 'react'

import axios from "axios"
import { Button, Card, Checkbox, Form, message, Space, Upload } from "antd"
import { UploadOutlined } from '@ant-design/icons'

import { SpreadsheetData } from "../data"

const postingUrl = "http://localhost:2999/api/extractXlsxFile"

const genAxiosUrl = (d: string[]) => {
  if (d.length === 0) return postingUrl
  let r = `${ postingUrl }?`
  if (d.includes("head")) r += "head=true"
  if (d.includes("multiSheets")) r += "multiSheets=true"
  return r
}

const inputFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
const formTailLayout = {
  wrapperCol: { offset: 6 }
}

interface UploaderProps {
  getData: (value: SpreadsheetData[]) => void
}

export const Uploader = (props: UploaderProps) => {

  const [form] = Form.useForm()

  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])

  const uploadProps = {
    accept: inputFileType,
    multiple: false,
    beforeUpload: (file: File) => {
      setUploadFiles([file])
      return false
    },
    onRemove: () => setUploadFiles([]),
    fileList: uploadFiles.map((i, j) => ({ ...i, name: i.name, uid: String(j) }))
  }

  const onUploadFile = (params: string[]) => {
    if (uploadFiles.length !== 0) {
      const data = new FormData()
      data.append("xlsx_file", uploadFiles[0])
      setUploading(true)

      axios
        .post(genAxiosUrl(params), data)
        .then(res => {
          message.success(res.statusText)
          setUploading(false)
          setUploadFiles([])
          props.getData(res.data)
        })
        .catch(err => {
          setUploading(false)
          message.error(JSON.stringify(err, null, 2))
        })
    }
  }

  const onReset = () => {
    setUploading(false)
    setUploadFiles([])
    form.resetFields()
  }
  const onFinish = (v: any) => {
    const fo = v.fileOptions ? v.fileOptions : []
    onUploadFile(fo)
    onReset()
  }

  return (
    <Card title="File Upload">
      <Form { ...formItemLayout } form={ form } onFinish={ onFinish }>
        <Form.Item name="fileUpload" label="File">
          <Upload { ...uploadProps }>
            <Button icon={ <UploadOutlined/> }>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="fileOptions" label="Options">
          <Checkbox.Group>
            <Checkbox value="head">Has head</Checkbox>
            <Checkbox value="multiSheets">Multiple sheets</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item { ...formTailLayout }>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              disabled={ uploadFiles.length === 0 }
              loading={ uploading }
            >
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={ onReset }
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
