import React, { useState } from 'react';
import { db, storage } from "./firebase"
import firebase from "firebase"

import GoogleMapReact from 'google-map-react';
import ImageUploader from "react-images-upload";

import countryroads from "./imgs/countryroads.png"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, CircularProgress, makeStyles } from '@material-ui/core'

import Geocode from "react-geocode";

const Marker = () => <div><img src={countryroads} alt="" height="50" width="50" /></div>

const useStyles = makeStyles((theme) => ({
  confirm: {
    color: "green"
  },
  error: {
    color: "red"
  },
  input: {
    margin: theme.spacing(3),
    width: '70%'
  }
}))
 
function NewClient(props) {

  Geocode.setApiKey("AIzaSyCqlMUtnbP4zqJ26Izex4TJ1h6j0aWgiKc");
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  const [progress, setProgress] = useState(0)
  const [confirm, setConfirm] = useState("")
  const [pictures, setPictures] = useState([])

  const [lat, setLat] = useState(48.0401)
  const [lng, setLng] = useState(-122.4063)
  const [zoom, setZoom] = useState(10)

  const classes = useStyles()

  const handleUpload = (formData) => {

    console.log(formData)

    db.collection("clients").add({
            name: formData.name,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
            lat: formData.lat,
            lng: formData.lng,
            created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(doc) {

      let clientId = doc.id
    
      let imgNames = []

      for (let x = 0; x < pictures.length; x++) {
        imgNames.push(pictures[x].name)
      }

      db.collection("clients").doc(doc.id).collection("jobs").add({
        job: formData.job,
        details: formData.details,
        scheduled: formData.schedule,
        price: formData.price,
        imgs: imgNames,
        created: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(doc) {

        for (let y = 0; y < pictures.length; y++) {

          const uploadTask = storage.ref("images/" + clientId + "/" + doc.id + "/" + pictures[y].name).put(pictures[y])

          uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progress)
          },
          (error) => {
            alert(error.message)
          },
          () => {})

        }

        })

      })
      
    

  }

  const locateAddress = (address, setFieldValue) => {
    Geocode.fromAddress(address).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng)
    setLat(lat)
    setLng(lng)
    setZoom(15)
    setFieldValue("lat", lat)
    setFieldValue("lng", lng)
  },
  (error) => {
    console.error(error)
  }
)
  }

  const onDrop = (pictureFiles, pictureDataURLs) => {
    console.log(pictureFiles)
    console.log(pictureDataURLs)
    setPictures(pictureFiles)
  }

  const uploadstyle = {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginLeft: "10px",
    marginRight: "10px"
  }


  return (

    <div style={uploadstyle}>
    <Formik
      initialValues = {{ 
        name: "",
        address: "",
        email: "",
        phone: "",
        lat: 0,
        lng: 0,

        job: "",
        details: "",
        price: 0,
        schedule: ""

    }}

    validate = {values => {
      const errors = {}

      return errors
    }}


      onSubmit = {(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values)
          handleUpload(values)
          setSubmitting(false)
          setConfirm("Upload success.")

        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
      <Form onSubmit={handleSubmit} autoComplete="off" >

      <Typography variant="h5" color="secondary"> Client: </Typography>

        <TextField
          className={classes.input}
          onChange={handleChange}
          type="text"
          label="Name"
          name="name"
        />

        <TextField
          className={classes.input}
          onChange={handleChange}
          type="text"
          label="Address"
          name="address"
        />

        <TextField
          className={classes.input}
          onChange={handleChange}
          type="text"
          label="Email"
          name="email"
        />

        <TextField
          className={classes.input}
          onChange={handleChange}
          type="text"
          label="Phone"
          name="phone"
        />

      
      <br/>
      <br/>

      <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={() => locateAddress(values.address, setFieldValue)}
      >Locate Address</Button>

      <div style={{ height: "100vh", width: "100%" }}>
        <br/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : lat, lng : lng}}
          zoom={zoom}
          onClick={(event) => {

            setFieldValue("lat", event.lat)
            setFieldValue("lng", event.lng)
            
          }}
        >

       <Marker
            lat={values.lat}
            lng={values.lng}
          />

        </GoogleMapReact>
    </div>

        
      <br/>
      <br/>
      <hr/>
      <br/>
      <Typography variant="h5" color="secondary"> Job: </Typography>


        <TextField
          className={classes.input}
          onChange={handleChange}
          type="text"
          label="Job"
          name="job"
        />


      <br/>


      <TextField
          label="Details"
          name="details"
          multiline
          className={classes.input}
          onChange={handleChange}
          rows={8}
          variant="outlined"
          
        />



        <TextField
          className={classes.input}
          onChange={handleChange}
          type="number"
          label="Price"
          name="price"
        />

      <br/>


      <TextField 
        name="schedule"
        label="Schedule"
        type="date"
        className={classes.input}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br/>
      <br/>
    

      <ImageUploader
        withIcon={false}
        withPreview={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".png", ".jpeg"]}
        maxFileSize={10485760}
      />
      <CircularProgress variant="determinate" value={progress} />

      <Typography className={classes.confirm}> {confirm} </Typography>

      <br/>

      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Upload </Button>

      <br />
      <br />

      </Form>

      

      )}
    </Formik>
  </div>
)

}



export default NewClient
