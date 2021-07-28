import React from 'react';
import { mockEmployee } from "./employeeMockData";
import Table from 'react-responsive-data-table';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class test extends React.Component {

  state = {
    data: [...mockEmployee],
    openModal:false,
    currentRow:null,
    dataLoad:false,
    UserInput:""
  };

  componentDidMount() {
    
  }

  
  onRowEdit = (row) => {
    console.log(row);
    this.setState({ currentRow: row });
    this.onOpenModal();
  };

  onRowUpdate = (row) => {
    console.log(row);
    let oRow = this.state.currentRow;
    let newRow = {
      "id": oRow[0],
      "username": oRow[1],
      "fullName": oRow[2],
      "salary": oRow[3]
    };

    let id = oRow[0];
    let odataIndex = this.state.data.findIndex(x => x.id === id);
    let odata = this.state.data;
    odata[odataIndex] = newRow;
    this.setState({ data: odata, dataLoad: false });
    this.onCloseModal();
  };

  onRowDelete = (row) => {
    console.log(row);
    let oRow = this.state.currentRow;
    let id = oRow[0];
    let odata = this.state.data.filter(x => x.id != id);
    this.setState({ data: odata, dataLoad: false });
    this.onCloseModal();
    alert('Deleted Successfully !');
  };

  onHandleChange = (ele) => {
    console.log(ele);
    let id = ele.target.id;
    let val = ele.target.value;
    let oRow = this.state.currentRow;

    switch(id){
      
      case "txtFullName":{
        oRow[2] = val;
        break;
      }

      case "txtSalary":{
        oRow[3] = val;
        break;
      }
      
      default:{
        break;
      }

    }

    this.setState({ currentRow: oRow });
    
  };

  onOpenModal = () => {
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };


  inputChange = (ele) => {
    console.log(ele);
    let id = ele.target.id;
    let val = ele.target.value;
    this.setState({ UserInput: val});
  };

  //0, 1, 1, 2, 3, 5, 8, 13, 21 => 8 
  onSubmitHandleChange = (ele) => {
    console.log(ele);
    let id = ele.target.id;
    let val = ele.target.value;
    let inputVal = this.state.UserInput;
    
    if (inputVal != "") {
      let array = [];
      for (let i = 1; i <= inputVal; i++) {
        array.push(i);
      }
   
      console.log(array);

      for (let i = 0; i < array.length; i++) {
          let final = 0;
          for(let j = 0; j < i; j++){
            final = final + array[j];
            
          }
          console.log(final);
        
      }
    }
    
  };

  
  
  render() {

    let dataGrid = this.state.data;
    console.log(dataGrid);
    let id = this.state.currentRow != null ? this.state.currentRow[0] : "";
    let userName = this.state.currentRow != null ? this.state.currentRow[1] : "";
    let fullName = this.state.currentRow != null ? this.state.currentRow[2] : "";
    let salary = this.state.currentRow != null ? this.state.currentRow[3] : "";

    
      return (
        <div class="bgColor">
          <input name="txtInput" value={this.state.UserInput} onChange={this.inputChange}></input>
          <input type="button" value="Submit" onClick={this.onSubmitHandleChange}></input>
        </div>
      );
    

    
  }

}


export default test;

