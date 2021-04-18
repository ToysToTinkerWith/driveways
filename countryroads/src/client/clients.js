import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Button } from '@material-ui/core/'
import { db } from "../firebase"

import NewClient from "../client/newClient"


class Clients extends React.Component {

 constructor() {
    super()
    this.state = {
      rows: [],
      newClient: false
    }

  }

componentDidMount = () => {

    const self = this

    db.collection("clients").onSnapshot(querySnapshot => {

      this.setState({ rows: [] })

        querySnapshot.forEach(function(doc) {
          let clientObject = doc.data()
          clientObject.id = doc.id
          clientObject.created = new Date(clientObject.created.toDate())
          console.log(clientObject)
          self.setState(prevState => ({
            rows: [...prevState.rows, clientObject]
          }))

        })

    })


}
    

    

render() {

  const columns = [
    {
    field: 'name',
    headerName: 'Client',
    width: 180,
    renderCell: (params) => (
          
          <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ padding: 10 }}
          onClick={() => [this.props.setClientId(params.getValue("id")), this.props.setPage("client")]}
        >
         {params.getValue("name")} 
        </Button>
    ),
  },
  { 
    field: 'address', 
    headerName: 'Address', 
    width: 180 
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
  },
  {
    field: "created",
    headerName: "Created",
    width: 150,
    type: "date"
  }
  
]

  const uploadstyle = {
    backgroundColor: "#FFFFF0",
    borderRadius: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width: "100%",

  }


  if (this.state.rows.length > 0) {
    return (
    <div style={uploadstyle}>
      <Button style={{margin: 10}} variant="outlined" color="secondary" onClick={() => this.setState({
        newClient: !this.state.newClient
      })}>+ client</Button>

      {this.state.newClient ? 
      <NewClient setNewClient={() => this.setState({newClient: false})} />
      :
      null
      }

      <DataGrid rows={this.state.rows} columns={columns} autoHeight={true}/>
    </div>
  )
  }

  else {
    return (
      <div style={uploadstyle}>
      <Button style={{margin: 10}} variant="outlined" color="secondary" onClick={() => this.setState({newClient: !this.state.newClient})}>+ client</Button>
      {this.state.newClient ? 
      <NewClient />
      :
      null
      }
      </div>
    )
  }
}
  
  
}

export default Clients


