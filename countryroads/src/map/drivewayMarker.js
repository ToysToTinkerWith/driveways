import React, { useState, useEffect }from "react"

import { Avatar, IconButton } from "@material-ui/core"

import { storage } from "../firebase"

function DrivewayMarker(props) {

  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    
    storage.ref("images/" + props.driveway.address).child(props.driveway.imgs[0]).getDownloadURL()
    .then(url => {
      setImageUrl(url)
    })


  }, )

  return (
    <div>
      <IconButton onClick={() => props.setDriveway(props.driveway)} >
        <Avatar src={imageUrl} />
      </IconButton>
    </div>
  )
    
  
}


export default DrivewayMarker