import React, { useState } from 'react';
import { db, storage } from "./firebase"
import firebase from "firebase"

import GoogleMapReact from 'google-map-react';
import ImageUploader from "react-images-upload";

import countryroads from "./imgs/countryroads.png"

import { Formik, Form } from 'formik';
import { Button, Typography, TextField, CircularProgress, Box, makeStyles } from '@material-ui/core'

const Marker = () => <div><img src={countryroads} alt="" height="50" width="50" /></div>

const useStyles = makeStyles((theme) => ({
  confirm: {
    color: "green"
  },
  error: {
    color: "red"
  },
  notes: {
    margin: theme.spacing(1),
    width: '100%'
  },
  address: {
    margin: theme.spacing(1),
    width: '70%'
  }
}))
 
function Upload(props) {

  const [progress, setProgress] = useState(0)
  const [confirm, setConfirm] = useState("")
  const [pictures, setPictures] = useState([])

  const classes = useStyles()

  const handleUpload = (formData) => {

    db.collection("driveways").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            lat: formData.lat,
            lng: formData.lng,
            address: formData.address,
            notes: formData.notes
    }).then(function(doc) {
    
      let imgNames = []

      for (let x = 0; x < pictures.length; x++) {
        imgNames.push(pictures[x].name)
      }

      db.collection("driveways").doc(doc.id).update({
        imgs: imgNames
      })
      })
      
    for (let y = 0; y < pictures.length; y++) {

      const uploadTask = storage.ref("images/" + formData.address + "/" + pictures[y].name).put(pictures[y])

      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {})

    }

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
    <Typography variant="h2" color="secondary"> Upload a Driveway: </Typography>
    <Formik
      initialValues = {{ 
        address: "",
        notes: "",
        lat: 0,
        lng: 0,
    }}

    validate = {values => {
      const errors = {}

      if (!values.address) {
          errors.address = "Address required"
        }
        
      if (values.lat === 0 && values.lng === 0) {
          errors.lat = "Locate the driveway on the Google Map above"
        }
      
      setConfirm("")
      
      return errors
    }}


      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          handleUpload(values)
          setSubmitting(false)
          resetForm({})
          setConfirm("Driveway upload success.")

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
      <br/>
      <Typography variant="h5" color="secondary"> Address: </Typography>

      <Box margin={3}>
          <TextField
          label="Address"
          name="address"
          className={classes.address}
          onChange={handleChange}
        />
      </Box>
      
      <br/>
      <br/>

      <div style={{ height: "100vh", width: "100%" }}>
        <br/>
        <Typography variant="h5" color="secondary"> Locate: </Typography>
        <br/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBiB3iNngJM_kFWKxSv9a30O3fww7YTiWA"}}
          center={{lat : 48.0401, lng : -122.4063}}
          zoom={10}
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

        
      <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <Typography variant="h5" color="secondary"> Pictures: </Typography>
      <ImageUploader
        withIcon={false}
        withPreview={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <CircularProgress variant="static" value={progress} />

      <br/>

      <Typography variant="h5" color="secondary"> Notes: </Typography>

      <Box margin = {3}>
      <TextField
          label="Notes"
          name="notes"
          multiline
          className={classes.notes}
          rows={8}
          variant="outlined"
          onChange={handleChange}
        />
      </Box>

      </div>

      <br/>

      <Typography className={classes.error}> {errors.address} </Typography>
      <Typography className={classes.error}> {errors.lat} </Typography>
      <Typography className={classes.confirm}> {confirm} </Typography>

      <br/>

      <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Submit </Button>

      <br />
      <br />

      </Form>

      

      )}
    </Formik>
  </div>
)

}



export default Upload
