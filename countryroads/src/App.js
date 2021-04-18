import React, { useState, useEffect } from "react"

import { Button, Typography, makeStyles } from "@material-ui/core"

import Auth from "./auth/auth"
import Map from "./map/map"
import ClientView from "./client/clientView"
import Jobs from "./job/jobs"
import Clients from "./client/clients"

import "./App.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  
  buttonStyle: {
    backgroundColor: "#FFFFF0",
    display: "inline"

  },
  date: {
    display: "inline",
    position: "absolute",
    left: "45%"
  }

})

function Main(props) {

  const [page, setPage] = useState("map")
  const [user, setUser] = useState(null)
  const [clientId, setClientId] = useState(null)

  const date = new Date()

  const classes = useStyles()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function(authUser)  {

      if (authUser) {
        setUser(authUser)
       
      } 
      else {
        setUser(null)
      }

    })

    return () => {
      unsubscribe()
    }

  }, [user])


  if (user) {
    console.log(date)

    return (
      <div>

        <div>
        <br/>
        

        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("map")}>map</Button>
        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("clients")}>clients</Button>
        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("jobs")}>jobs</Button>
        
        


        <Typography className={classes.date} align="center" variant="h5" color="secondary" > {date.toLocaleDateString()} </Typography>


        <Button className={classes.buttonStyle} style={{float: "right"}} variant="outlined" color="secondary" onClick={() => auth.signOut()}>log out</Button>

        
        </div>

        <br />

        {page === "map" ? 
        <Map date={date} setPage={setPage} setClientId={setClientId} />
        :
        null
        }

        {page === "clients" ?
        <Clients setPage={setPage} setClientId={setClientId} />
        :
        null
        }

        {page === "client" ?
        <ClientView date={date} clientId={clientId} /> :
        null
        }

        {page === "jobs" ?
        <Jobs setPage={setPage} setClientId={setClientId} /> :
        null
        }





      </div>
    )
    
    
  }

  else {
    return(
      <div>
        <Auth />
      </div>
    )
  }


   

      
  }
    

export default Main