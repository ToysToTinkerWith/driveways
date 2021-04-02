import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'

import DrivewayMarker from "./drivewayMarker"

import { db } from "../firebase"

function Map() {

  const [driveways, setDriveways] = useState([])

  useEffect(() => {
    
    db.collection("driveways").onSnapshot(snapshot => {
      setDriveways(snapshot.docs.map(doc => doc.data()))
    })

  }, [])
  

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
        return <DrivewayMarker key={Math.random().toString(36)} lat={driveway.lat} lng={driveway.lng} driveway={driveway} />
      }) :  null }



        
        </GoogleMapReact>
      </div>
    </div>
    )
  

  
    
    
    
  
}

export default Map;