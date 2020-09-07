/**
 * Created by Jacob Xie on 9/7/2020.
 */

import React from "react"
import { HotTable } from "@handsontable/react"
import { Tabs } from "antd"

import { SpreadsheetData } from "../data"
import "./Spreadsheet.css"

const licenseKey = "non-commercial-and-evaluation"


interface SpreadsheetProps {
  data: SpreadsheetData[]
}


export const Spreadsheet = (props: SpreadsheetProps) => {


  return (
    <div style={{background: "white"}}>
      {
        <Tabs type="card">
          {
            props.data.map((i: SpreadsheetData) =>
              (
                <Tabs.TabPane tab={ i.name } key={ i.name }>
                  <HotTable
                    data={ i.data }
                    settings={ {
                      width: "100%",
                      height: "40vh"
                    } }
                    colHeaders
                    rowHeaders
                    licenseKey={ licenseKey }
                  />
                </Tabs.TabPane>
              )
            )
          }
        </Tabs>
      }
    </div>
  )
}
