import React from 'react';
import { auth, db } from "../firebase"

import { Formik, Field, Form } from 'formik';
import { Button, Box, makeStyles } from '@material-ui/core'
import { TextField } from 'formik-material-ui';


const useStyles = makeStyles((theme) => ({
  
  root: {
    width: "80%"
  }

}))
 
function SignUp(props) {

  const classes = useStyles()

  const signUp = (formData) => {

    console.log(formData)

  auth.createUserWithEmailAndPassword(formData.email, formData.password)
  .then((authUser) => {

    console.log(formData)

    db.collection("profiles").add({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          imageUrl: null,
          access: 3
        })

  return authUser.user.updateProfile({
      displayName: formData.name
    })

  })
  .catch((error) => alert(error.message))
    
}

  const signupstyle = {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginLeft: "10px",
    marginRight: "10px"
}

  return (
    <div style={signupstyle}>
    <Formik
      initialValues = {{ 
        name: "",
        email: "", 
        phone: "",
        password: "",
        confPassword: ""
    }}

      validate = {values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } 
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.name) {
          errors.displayName = "Required"
        }

        if (!values.password) {
          errors.password = "Required"
        }
        else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters long"
        }

        if (!values.confPassword) {
          errors.confPassword = "Required"
        }
        else if (values.password !== values.confPassword) {
          errors.confPassword = "Passwords do not match"
        }

        return errors
      }}

      onSubmit = {(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          signUp(values)
          setSubmitting(false)
          resetForm({})
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
        /* and other goodies */
      }) => (
      <Form onSubmit={handleSubmit} autoComplete="off">
      <br />
        <Box margin={5}>
          <Field
            component={TextField}
            className={classes.root}
            onChange={handleChange}
            type="text"
            label="Name"
            name="name"
          />
        </Box>
        <Box margin={5}>
          <Field
            component={TextField}
            className={classes.root}
            onChange={handleChange}
            type="email"
            label="Email"
            name="email"
          />
        </Box>
        <Box margin={5}>
        <Field
          component={TextField}
          className={classes.root}
          onChange={handleChange}
          type="text"
          label="Phone"
          name="phone"
        />
        </Box>
        <Box margin={5}>
          <Field
            component={TextField}
            className={classes.root}
            onChange={handleChange}
            type="password"
            label="Password"
            name="password"
          />
        </Box>
        <Box margin={5}>
          <Field
            component={TextField}
            className={classes.root}
            onChange={handleChange}
            type="password"
            label="Confirm Password"
            name="confPassword"
          />
        </Box>
        <br />
        <Button type="submit" color="secondary" variant="outlined" disabled={isSubmitting}> Sign Up </Button>
        <br />
        <br />
      </Form>
      )}
    </Formik>
  </div>
);

}



export default SignUp