import React, { useState, useEffect } from "react"

import { Button, makeStyles } from "@material-ui/core"

import Auth from "./auth/auth"
import Map from "./map/map"
import NewClient from "./newClient"

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
        <br/>
        

        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("map")}>map</Button>
        <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => setPage("newClient")}>+ client</Button>

        <Button className={classes.buttonStyle} style={{float: "right"}} variant="outlined" color="secondary" onClick={() => auth.signOut()}>logout</Button>

        
        </div>

        <br />

        {page === "map" ?
        <Map /> :
        null
        }

        {page === "newClient" ?
        <NewClient uid={user.uid} username={user.displayName} /> :
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