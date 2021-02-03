import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'

import DrivewayView from "./drivewayView"
import DrivewayMarker from "./drivewayMarker"


import { db } from "./firebase"

//import { db } from "../firebase"

import { Button } from "@material-ui/core"

function Map() {

  const [driveways, setDriveways] = useState([])
  const [driveway, setDriveway] = useState(null)

  useEffect(() => {
    
    db.collection("driveways").onSnapshot(snapshot => {
      setDriveways(snapshot.docs.map(doc => doc.data()))
    })

  }, [])

  console.log(driveways.length)

  if (driveway) {
    return (
      <div>
        <Button variant="outlined" size="large" color="secondary" onClick={() => setDriveway(null)}>MAP</Button>
        <DrivewayView driveway={driveway} />
      </div>
    )
  }

  else {
    return (
    <div>
      <div style={{ height: "100vh",  width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : 48.0401, lng : -122.4063}}
          zoom={10}
        >

        {driveways.length > 0 ? 
          driveways.map(driveway => {
        return <DrivewayMarker key={Math.random().toString(36)} lat={driveway.lat} lng={driveway.lng} setDriveway={setDriveway} driveway={driveway} />
      }) :  null }



        
        </GoogleMapReact>
      </div>
    </div>
    )
  }

  
    
    
    
  
}

export default Map;