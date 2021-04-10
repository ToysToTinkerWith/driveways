import React, { useState, useEffect }from "react"

import { IconButton, SvgIcon } from "@material-ui/core"

import { db } from "../firebase"

function ClientMarker(props) {

  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    
    db.collection("clients").doc(props.clientId).collection("jobs").get().then((query) => {
      query.forEach(doc => {
        let jobDate = new Date(doc.data().scheduled + "T16:00")
        console.log(jobDate)
        console.log(props.date)
        if (jobDate < props.date) {
          setCompleted(true)
        }
      })
    })
    

  })

  if (completed) {
    return (
    <div>
      <IconButton onClick={() => [props.setPage("client"), props.setClientId(props.clientId)]} >
        <SvgIcon style={{color: "green"}}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      </IconButton>
    </div>
  )
  }

  else {
    return (
    <div>
      <IconButton onClick={() => [props.setPage("client"), props.setClientId(props.clientId)]} >
        <SvgIcon style={{color: "red"}}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      </IconButton>
    </div>
  )
  }

  
    
  
}


export default ClientMarker