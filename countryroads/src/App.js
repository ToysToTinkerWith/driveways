import React, { useState, useEffect } from "react"

import { Button, Typography, makeStyles } from "@material-ui/core"

import Auth from "./auth/auth"
import Map from "./map/map"
import Upload from "./upload"

import "./App.css"

import { auth } from "./firebase"

const useStyles = makeStyles({
  
  buttonStyle: {
    backgroundColor: "#FFFFF0"
  },
  title: {
    display: "inline"
  }

})

function Main(props) {

  const [page, setPage] = useState("map")
  const [user, setUser] = useState(null)

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

    return (
      <div>

        <div>

        <Typography className={classes.title} gutterBottom variant="h2" align="center" color="secondary">Country Road</Typography>
        
        <br/>
        <br/>

        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("map")}>map</Button>
        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("upload")}>upload</Button>
        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>

        </div>

        <br />

        {page === "map" ?
        <Map /> :
        null
        }

        {page === "upload" ?
        <Upload uid={user.uid} username={user.displayName} /> :
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