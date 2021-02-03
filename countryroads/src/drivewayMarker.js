import React, { useState, useEffect }from "react"

import { Button, Avatar, IconButton, makeStyles } from "@material-ui/core"

import { storage } from "./firebase"

const useStyles = makeStyles((theme) => ({
  
  button: {
   width: 5,
   height: 20
  }

}))

function DrivewayMarker(props) {

  const [imageUrl, setImageUrl] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    
    storage.ref("images/" + props.driveway.address).child(props.driveway.imgs[0]).getDownloadURL()
    .then(url => {
      setImageUrl(url)
    })


  }, [])

  const adoptstyle = {
      color: "white",
      backgroundColor: "blue",
      textAlign: "center"
    }

  return (
    <div>
      <IconButton onClick={() => props.setDriveway(props.driveway)} >
        <Avatar src={imageUrl} />
      </IconButton>
    </div>
  )
    
  
}


export default DrivewayMarker