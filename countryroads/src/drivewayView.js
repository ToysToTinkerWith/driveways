import React from "react"

import { storage } from "./firebase"

import { Typography,Button, Avatar } from "@material-ui/core"

class DrivewayView extends React.Component {
    
  constructor() {
    super()
    this.state = {
      imgs: []
    }
  }

  componentDidMount() {

    let incomingImgs = []

    for (let x = 0; x < this.props.driveway.imgs.length; x++) {
      storage.ref("images/" + this.props.driveway.address).child(this.props.driveway.imgs[x]).getDownloadURL()
    .then(url => {
      console.log(url)
      incomingImgs.push(url)
      this.setState({
        imgs: incomingImgs
      })

      })
    }

  }

  

  render() {

    const drivewaystyle = {
    backgroundColor: "#FAEBD7",
    border: "4px solid brown",
    paddingLeft: "10px",
    paddingRight: "10px"
    }

    return (
      <div style={drivewaystyle}>
      <br/>
        <Button variant="outlined" size="large" color="secondary" onClick={() => this.props.setDriveway(null)}>MAP</Button>
        <Typography variant="h2" color="secondary"> {this.props.driveway.address} </Typography>
        <Typography variant="h5" color="secondary"> {this.props.driveway.notes} </Typography>
        <br/>
        {this.state.imgs.length > 0 ? 
          this.state.imgs.map(img => {
          return [<Avatar variant="square" style={{width: "100%", height: "100%"} }key={Math.random().toString(36)} src={img} />,
          <br/>]
        }) :  null }
      </div>
    )

  }

  

}

export default DrivewayView