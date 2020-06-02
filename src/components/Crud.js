import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CreateData from "./CreateData.js";
import DataLists from "./DataLists.js";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLists: [],
      id: null,
      Name: "",
      Ocupation: "",
      Description: "",
      isEditing: false
    };
  }

  componentDidMount() {
    let self = this
    fetch('http://localhost:3333/api/v1/clientes/', {
          method: 'GET',
        }
        )
        .then(function(response) {
          return response.json();
        })
        .then(function(clientes) {
          self.setState({dataLists:clientes})
        });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //To add data to the dataList array
  addData = e => {
    e.preventDefault();
    const { Name, Ocupation, Description } = this.state;
    if (!Name || !Ocupation || !Description) return;
    let dataLists = [
      ...this.state.dataLists,
      {
        Id: Math.random(),
        Name: this.state.Name,
        Ocupation: this.state.Ocupation,
        Description: this.state.Description
      }
    ];
    this.setState({
      dataLists
    });

    let data = {Name,Ocupation,Description};

    fetch(`http://localhost:3333/api/v1/clientes/`, {
      method: 'POST',
      body: JSON.stringify(data),

    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));


    this.reset();
  };

  //To reset the form fields
  reset = () => {
    this.setState({
      Name: "",
      Ocupation: "",
      Description: ""
    });
  };

  //To remove the data from the list
  removeData = Id => {
    let dataLists = this.state.dataLists.filter(data => {
      return data.Id !== Id;
    });
    const {Name,Ocupation,Description} = this.state
    let data = {Name,Ocupation,Description};
    fetch(`http://localhost:3333/api/v1/clientes/${Id}`, {
      method: 'DELETE',

    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

    this.setState({
      dataLists
    });
  };

  //To handle the data Update
  handleUpdate = (e, Id) => {
    const index = this.state.dataLists.findIndex(data => {
      return data.Id === Id;
    });
    const data = Object.assign({}, this.state.dataLists[index]);

    this.setState({
      Id: data.Id,
      Name: data.Name,
      Ocupation: data.Ocupation,
      Description: data.Description,
      isEditing: true
    });

  };

  //To save the updated data
  saveUpdate = (e, Id) => {
    const newData = this.state.dataLists.map(data => {
      if (data.Id === Id) {
        return {
          Name: this.state.Name,
          Ocupation: this.state.Ocupation,
          Description: this.state.Description
        };
      }

      return data;
    });
    this.setState(
      {
        dataLists: newData,
        isEditing: false
      },
      () => {
        this.reset();
      }
    );
    const {Name,Ocupation,Description} = this.state
    let data = {Name,Ocupation,Description};

    fetch(`http://localhost:3333/api/v1/clientes/${Id}`, {
      method: 'PUT',
      body: JSON.stringify(data), // data can be `string` or {object}!

    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

    };

  render() {
    const {
      dataLists,
      Id,
      Name,
      Ocupation,
      Description,
      isEditing
    } = this.state;
    return (
      <Grid container spacing={0}>
        <Grid item ls={6} md={6} sm={12} xs={12}>
          <CreateData
            Id={Id}
            Name={Name}
            Ocupation={Ocupation}
            Description={Description}
            addData={this.addData}
            handleChange={this.handleChange}
            saveUpdate={this.saveUpdate}
            isEditing={isEditing}
          />
        </Grid>
        <Grid item ls={6} md={6} sm={12} xs={12}>
          <DataLists
            lists={dataLists}
            removeData={this.removeData}
            handleUpdate={this.handleUpdate}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Crud;
