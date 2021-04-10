import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'

import ClientMarker from "./clientMarker"

import { db } from "../firebase"

function Map(props) {

  const [clients, setClients] = useState([])

  useEffect(() => {
    
    db.collection("clients").onSnapshot(snapshot => {
      setClients(snapshot.docs.map(doc => [doc.data(), doc.id]))
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

        {clients.length > 0 ?
          clients.map(client => {
        return <ClientMarker key={Math.random().toString(36)} lat={client[0].lat} lng={client[0].lng} clientId={client[1]} date={props.date} setPage={props.setPage} setClientId={props.setClientId} />
      }) :  null }



        
        </GoogleMapReact>
      </div>
    </div>
    )
  

  
    
    
    
  
}

export default Map;