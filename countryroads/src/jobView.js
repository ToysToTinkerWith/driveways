import React from "react"

import { Typography, Button, IconButton, Avatar } from "@material-ui/core"

import { db, storage } from "./firebase"

import EditJob from "./editJob"


class JobView extends React.Component {

  constructor() {
    super()
    this.state = {
      job: null,
      imgs: [],
      img: null,
      edit: false
    }
    this.setJob = this.setJob.bind(this)

  }


  componentDidMount() {

    db.collection("clients").doc(this.props.clientId).collection("jobs").doc(this.props.jobId).get().then(doc => {

    let incomingImgs = []

    for (let x = 0; x < doc.data().imgs.length; x++) {
      storage.ref("images/" + this.props.clientId + "/" + this.props.jobId).child(doc.data().imgs[x]).getDownloadURL()
    .then(url => {
      console.log(url)
      incomingImgs[x] = url
      if (incomingImgs.length === doc.data().imgs.length) {
        this.setState({
          job: doc.data(),
          imgs: incomingImgs
        })
      }
      
      })
    }

    })
    
  }

  setJob() {

    db.collection("clients").doc(this.props.clientId).collection("jobs").doc(this.props.jobId).get().then(doc => {

    let incomingImgs = []

    for (let x = 0; x < doc.data().imgs.length; x++) {
      storage.ref("images/" + this.props.clientId + "/" + this.props.jobId).child(doc.data().imgs[x]).getDownloadURL()
    .then(url => {
      console.log(url)
      incomingImgs[x] = url
      if (incomingImgs.length === doc.data().imgs.length) {
        this.setState({
          job: doc.data(),
          imgs: incomingImgs
        })
      }
      
      })
    }

    })
  }


  render() {

    const jobstyle = {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "10px"
  }

  if (this.state.job) {
    return (
      <div style={jobstyle}>
        <Button style={{float: "right"}} variant="outlined" color="secondary" onClick={() => this.setState({edit: !this.state.edit})}>Edit</Button>
        <Typography variant="h5" color="secondary"> {this.state.job.job} </Typography>
        <Typography variant="h6" color="secondary"> {this.state.job.details} </Typography>
        <Typography variant="h6" color="secondary"> ${this.state.job.price} </Typography>
        <Typography variant="h6" color="secondary"> {new Date(this.state.job.scheduled + "T16:00").toLocaleDateString()} </Typography>

        {this.state.edit ? 
        <EditJob setEdit={() => this.setState({edit: !this.state.edit})} setJob={this.setJob} clientId={this.props.clientId} job={this.state.job} jobId={this.props.jobId} /> 
        :
        null
        }


        {this.state.imgs.length > 0 ? this.state.imgs.map(image => {
          return[
          <IconButton onClick={() => this.setState({img: image})} >
          <Avatar src={image} alt="" style={{ height: '200px', width: '200px', float:"left" }} />
          </IconButton>
          ]
        })
        :
        null
        }

        {this.state.img ?
        <Avatar src={this.state.img} alt="" variant="square" style={{ padding: "20", width: "100%", height: "100%", borderRadius: "15px" }} />
        :
        null
        }

      </div>
    )
  }

  else {
    return (
      <div>
      </div>
    )
  }

    
  }

  

  




  


   

      
  }
    

export default JobView