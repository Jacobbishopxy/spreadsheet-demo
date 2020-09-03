import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { Spreadsheet } from "./Spreadsheet"

function App() {


  return (
    <Container style={{marginTop: 20}}>
      <Row>
        <Col md={ { span: 6, offset: 3 } }>
          <Spreadsheet/>
        </Col>
      </Row>
    </Container>
  )
}

export default App
