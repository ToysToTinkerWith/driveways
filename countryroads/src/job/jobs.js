import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button, Typography } from '@material-ui/core/'
import { db } from "../firebase"


class Jobs extends React.Component {

 constructor() {
    super()
    this.state = {
      rows: []
    }

  }

componentDidMount = () => {

    


    db.collection("clients").onSnapshot(querySnapshot => {

      this.setState({ rows: [] })

      querySnapshot.forEach(doc => {

        let clientId = doc.id
        let clientName = doc.data().name

        db.collection("clients").doc(doc.id).collection("jobs")
        .get().then(querySnapshot => {

          let self = this

          querySnapshot.forEach(function(doc) {
            let jobObject = doc.data()
            jobObject.id = doc.id
            jobObject.clientId = clientId
            jobObject.clientName = clientName
            jobObject.scheduled = new Date(jobObject.scheduled + "T00:00")
            console.log(jobObject)
            self.setState(prevState => ({
              rows: [...prevState.rows, jobObject]
            }))

          })


        })

      })
      

    })


}
    

    

render() {

  const columns = [
    
  { 
    field: 'job', 
    headerName: 'Job', 
    width: 180 
  },
  {
    field: 'scheduled',
    headerName: 'Scheduled',
    width: 180,
    type: 'date',
  },
  {
    field: 'estimate',
    headerName: 'Estimate',
    width: 150,
    renderCell: (params) => (
          
          <Typography
          variant="contained"
          color="primary"
          size="small"
          style={{ float: "left", padding: 10 }}
        >
         ${params.getValue("estimate")} 
        </Typography>
    )
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 200,
  
  },
  {
    field: 'clientName',
    headerName: 'Client',
    width: 180,
    renderCell: (params) => (
          
          <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ padding: 10 }}
          onClick={() => [this.props.setClientId(params.getValue("clientId")), this.props.setPage("client")]}
        >
         {params.getValue("clientName")} 
        </Button>
    ),
  }
  
]

  const uploadstyle = {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width: "100%"

  }


  if (this.state.rows.length > 0) {
    console.log("here")
    return (
    <div style={uploadstyle}>

      <DataGrid rows={this.state.rows} columns={columns} autoHeight={true}/>
    </div>
  )
  }

  else {
    return (
      <div style={uploadstyle}>
        <Typography
          variant="contained"
          color="primary"
          style={{ margin: 20}}
        >
         No Jobs
        </Typography>
      </div>
    )
  }
}
  
  
}

export default Jobs


