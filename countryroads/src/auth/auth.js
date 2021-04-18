import React from "react"
import LogIn from "./logIn"

import { Typography, Grid, makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
  
  title: {
    display: "inline"
  }

})

function Auth(props) {

  const classes = useStyles()

    return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
            <Typography className={classes.title} variant="h2" align="center" color="secondary">Country Road</Typography>
          <Typography variant="h5" align="center" color="secondary"> Driveways DB </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LogIn />
          <br />
          
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
        
      
    </div>
  )


  
}

export default Auth