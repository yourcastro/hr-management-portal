import React from 'react';
import { mockEmployee } from "./employeeMockData";
import Table from 'react-responsive-data-table';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class EmployeeDashboard extends React.Component {

  state = {
    data: [...mockEmployee],
    openModal:false,
    currentRow:null,
    dataLoad:false
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

  
  
  render() {

    let dataGrid = this.state.data;
    console.log(dataGrid);
    let id = this.state.currentRow != null ? this.state.currentRow[0] : "";
    let userName = this.state.currentRow != null ? this.state.currentRow[1] : "";
    let fullName = this.state.currentRow != null ? this.state.currentRow[2] : "";
    let salary = this.state.currentRow != null ? this.state.currentRow[3] : "";

    if (dataGrid) {
      return (
        <div className="employeeDashboardConatiner">
          <Table style={{
            opacity: 0.8,
            backgroundColor: "#00113a",
            color: "#ffffff",
            textAlign: "center"
          }}
            tableStyle="table table-hover table-striped table-bordered table-borderless table-responsive"
            pages={true}
            pagination={true}
            onRowClick={row => this.onRowEdit(row)}
            page={true}
            errormsg="Error. . ."
            loadingmsg="Loading. . ."
            isLoading={this.state.dataLoad}
            sort={true}
            title="Employee (Click row to delete & update records)"
            search={true}
            size={5}
            data={{
              head: {
                id: "ID",
                username: "User Name",
                fullName: "Full Name",
                salary: "Salary"
              },
              data: [...dataGrid]
            }} />

          <div>
            <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
              <div className="modalForm">
                <span className="modalHeader">Edit Employee Details</span>
                <div>
                  <span for="fname">ID:</span>
                  <input type="text" id="txtID" disabled="disabled" value={id}></input>
                </div>
                <div>
                  <span for="fname">User Name:</span>
                  <input type="text" id="txtUserName" disabled="disabled" value={userName}></input>
                </div>
                <div>
                  <span for="fname">Full Name:</span>
                  <input type="text" id="txtFullName" value={fullName} onChange={this.onHandleChange.bind(this)}></input>
                </div>
                <div>
                  <span for="fname">Salary:</span>
                  <input type="text" id="txtSalary" value={salary} onChange={this.onHandleChange.bind(this)}></input>
                </div>
                <div>
                  <input type="button" id="btnSave" className="btnSave" value="Update" onClick={this.onRowUpdate}></input>
                  <input type="button" id="btnCancel" className="btnDelete" value="Delete" onClick={this.onRowDelete}></input>
                </div>
              </div>
            </Modal>
          </div>

        </div>

      );
    }
    else {
      return <div></div>
    }

    
  }

}


export default EmployeeDashboard;

