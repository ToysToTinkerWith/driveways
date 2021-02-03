import React, { useState, useEffect } from "react"
import Map from "./map.js"
import Upload from "./upload.js"

import { Button } from "@material-ui/core"

function App() {

  const [page, setPage] = useState("mp")

  if (page === "map") {
    return (
      <div>
        <Button variant="outlined" size="large" color="secondary" onClick={() => setPage("upload")}>UPLOAD</Button>
        <Map />
      </div>
    )
  }

  else {
    return (
    <div>
      <Button variant="outlined" size="large" color="secondary" onClick={() => setPage("map")}>MAP</Button>
      <Upload />
    </div>
    )
  }

  
}

export default App;
