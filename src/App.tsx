import React from 'react'
import { Col, Row } from 'antd'

import { Spreadsheet } from "./Spreadsheet"

function App() {


  return (
    <Row style={ { height: "100vh" } }>
      <Col md={ { span: 6, offset: 10 } }>
        <div style={ { marginTop: 20 } }>
          <Spreadsheet/>
        </div>
      </Col>
    </Row>
  )
}

export default App
