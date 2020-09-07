import React, { useState } from 'react'
import { Col, Row } from 'antd'

import { Uploader } from "./components/Uploader"
import { Spreadsheet } from "./components/Spreadsheet"
import { SpreadsheetData } from "./data"

import "./App.css"

function App() {

  const [data, setData] = useState<SpreadsheetData[]>()

  return (
    <div style={ { height: "100vh", background: "gray" } }>
      <Row style={ { paddingTop: 20 } }>
        <Col offset={ 1 } span={ 6 }>
          <Uploader getData={ setData }/>
        </Col>
        <Col offset={ 1 } span={ 15 }>
          {
            data ?
              <Spreadsheet data={ data }/> :
              <div/>
          }
        </Col>
      </Row>
    </div>
  )
}

export default App
