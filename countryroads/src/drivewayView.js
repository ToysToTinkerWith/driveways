import React, { useState, useEffect } from "react"

import { storage } from "./firebase"

import { Typography } from "@material-ui/core"


function DrivewayView(props) {

  const drivewaystyle = {
    backgroundColor: "#FAEBD7",
    border: "4px solid brown",
    paddingLeft: "10px",
    paddingRight: "10px"
  }

  console.log(props.driveway)

  return (
    <div style={drivewaystyle}>
      <Typography variant="h2" color="secondary"> {props.driveway.address} </Typography>
      <Typography variant="h5" color="secondary"> {props.driveway.notes} </Typography>
    </div>
  )

}

export default DrivewayView