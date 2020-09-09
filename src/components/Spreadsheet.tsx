/**
 * Created by Jacob Xie on 9/7/2020.
 */

import React from "react"
import { HotTable } from "@handsontable/react"
import { Card, Tabs } from "antd"

import { SpreadsheetData } from "../data"
import "./Spreadsheet.css"

const licenseKey = "non-commercial-and-evaluation"


interface SpreadsheetProps {
  data: SpreadsheetData[]
}

const hotTableProps = {
  settings: {
    width: "100%",
    height: "40vh"
  },
  colHeaders: true,
  rowHeaders: true,
  licenseKey: licenseKey,
}

export const Spreadsheet = (props: SpreadsheetProps) => {

  const singleS = () => (
    <HotTable
      { ...hotTableProps }
      data={ props.data[0].data }
    />
  )

  const multiS = () => (
    <Tabs tabPosition="bottom">
      {
        props.data.map((i: SpreadsheetData) =>
          (
            <Tabs.TabPane tab={ i.name } key={ i.name }>
              <HotTable
                { ...hotTableProps }
                data={ i.data }
              />
            </Tabs.TabPane>
          )
        )
      }
    </Tabs>
  )

  return (
    <Card>
      {
        props.data.length === 1 ?
          singleS() : multiS()
      }
    </Card>
  )

}
