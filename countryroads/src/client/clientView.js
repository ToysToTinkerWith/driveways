import React, { useState, useEffect } from "react"

import JobView from "../job/jobView"
import EditClient from "./editClient"
import NewJob from "../job/newJob"

import { Button, Typography, makeStyles } from "@material-ui/core"

import { db } from "../firebase"

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
  const [page, setPage] = useState(null)
  const [jobIds, setJobIds] = useState([])

  const classes = useStyles()

  useEffect(() => {

    db.collection("clients").doc(props.clientId).onSnapshot(doc => {
      setClient(doc.data())
    })

    db.collection("clients").doc(props.clientId).collection("jobs")
    .onSnapshot((querySnapshot) => {

      let jobIds = []

      querySnapshot.forEach(function(doc) {
        jobIds.push(doc.id)
      })

      console.log(jobIds)

      setJobIds(jobIds)

    })

  }, [props.clientId, page])


  if (client) {
    return (
      <div className={classes.root}>
        <Button style={{float: "right"}} variant="outlined" color="secondary" onClick={() => 
        page === "edit" ? setPage(null)
        : setPage("edit")}>Edit</Button>
        <Button style={{float: "right"}} variant="outlined" color="secondary" onClick={() => 
        page === "newJob" ? setPage(null)
        : setPage("newJob")}>+ Job</Button>
        <Typography variant="h4" color="secondary"> {client.name} </Typography>
        <Typography variant="h5" color="secondary"> {client.address} </Typography>
        <Typography variant="h5" color="secondary"> {client.email} </Typography>
        <Typography variant="h5" color="secondary"> {client.phone} </Typography>
        <br />

        {page === "edit" ? 
        [<EditClient clientId={props.clientId} client={client} />,
        <br />]
        :
        null
        }
        
        {page === "newJob" ? 
        [<NewJob clientId={props.clientId} />,
        <br />]
        :
        null
        }
        


        {jobIds.length > 0 ? jobIds.map(jobId => {
          return [<JobView date={props.date} key={Math.random().toString(36)} clientId={props.clientId} jobId={jobId} setPage={setPage} />,
          <br />]
          
        })
        :
        null}

        <br />


        <br />
        <br />
        <br />

        

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