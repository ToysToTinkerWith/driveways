import React, { useState, useEffect }from "react"

import { IconButton, SvgIcon } from "@material-ui/core"

import { db } from "../firebase"

function ClientMarker(props) {

  const [markerColor, setMarkerColor] = useState("")

  useEffect(() => {
    
    db.collection("clients").doc(props.clientId).collection("jobs").onSnapshot((query) => {

      let color = ""

      query.forEach(doc => {
        let jobDate = new Date(doc.data().scheduled + "T16:00")
        if (props.date > jobDate) {
          if (color !== "black" && color !== "red") {
            color = "green"
          }
        }
        else if (props.date > jobDate.setHours(0) ) {
          color = "red"
        }
        else {
          if (color !== "red") {
            color = "black"
          }
        }
      })

      setMarkerColor(color)
    })
    

  })

    return (
    <div>
      <IconButton onClick={() => [props.setPage("client"), props.setClientId(props.clientId)]} >
        <SvgIcon style={{color: markerColor}}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      </IconButton>
    </div>
  )
  
}


export default ClientMarker