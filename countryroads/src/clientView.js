import React, { useState, useEffect } from "react"

import JobView from "./jobView"
import EditClient from "./editClient"

import { Button, Typography, makeStyles } from "@material-ui/core"

import { db } from "./firebase"

const useStyles = makeStyles({
  
  root: {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "10px",
    margin: "10px"
  },

})

function ClientView(props) {

  const [client, setClient] = useState(null)
  const [edit, setEdit] = useState(false)
  const [jobIds, setJobIds] = useState([])

  const classes = useStyles()

  useEffect(() => {

    db.collection("clients").doc(props.clientId).get().then(doc => {
      setClient(doc.data())
    })

    db.collection("clients").doc(props.clientId).collection("jobs")
    .get().then((querySnapshot) => {

      let jobIds = []

      querySnapshot.forEach(function(doc) {
        jobIds.push(doc.id)
      })

      setJobIds(jobIds)

    })

  }, [props.clientId, edit])


  if (client) {
    return (
      <div className={classes.root}>
        <Button style={{float: "right"}} variant="outlined" color="secondary" onClick={() => setEdit(!edit)}>Edit</Button>
        <Typography variant="h4" color="secondary"> {client.name} </Typography>
        <Typography variant="h5" color="secondary"> {client.address} </Typography>
        <Typography variant="h5" color="secondary"> {client.email} </Typography>
        <Typography variant="h5" color="secondary"> {client.phone} </Typography>
        <br />

        {edit ? 
        [<EditClient setEdit={setEdit} clientId={props.clientId} client={client} />,
        <br />]
        :
        null
        }

        {jobIds.length > 0 ? jobIds.map(jobId => {
          return [<JobView address={client.address} clientId={props.clientId} jobId={jobId} />,
          <br />]
        })
        :
        null}
      </div>
    )
  }

  else {
    return (
      <div>
      </div>
    )
  }

  




  


   

      
  }
    

export default ClientView