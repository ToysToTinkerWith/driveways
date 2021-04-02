import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Theme from "./theme"
import { ThemeProvider } from "@material-ui/core/styles"

ReactDOM.render(

    <ThemeProvider theme={Theme} >
      <App page="home" />
    </ThemeProvider>,
  document.getElementById("root")

)

