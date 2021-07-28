import React, { Component } from 'react';
import randExp from 'randexp';
import * as XLSX from 'xlsx';
import Table from 'react-responsive-data-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserUpload extends Component {

  state = {
    selectedFile: null,
    allRecords: []
  };


  UNSAFE_componentDidMount() {
  }

  onFileChange = event => {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
    if (fileType === "application/vnd.ms-excel") {
      this.setState({ selectedFile: event.target.files[0] });
      console.log("Upload Sucessfully");
    }
    else {
      this.setState({ selectedFile: null });
      alert("File format not supported, please select only CSV file");
    }
  };

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  onFileValidationNUpdate = () => {

    
    toast.info("Loading....",{position: toast.POSITION.BOTTOM_RIGHT});

    //Read data from CSV
    var filteredArray = [];
    let f = this.state.selectedFile;
    const reader = new FileReader();
    reader.onload = (evt) => {

      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });


      let employeeDataJSON = this.convertToJson(data);
      let parsedJSON = JSON.parse(employeeDataJSON);
      for (let emp in parsedJSON) {
        let item = parsedJSON[emp];
        if(Object.keys(item).length > 0){
            //console.log(item);
            let nricGen = new randExp(/^(S|T|F|G){1}([0-9]){7}([a-zA-Z]){1}$/).gen();
            item.NRIC = nricGen;
            filteredArray.push(item);
            console.log(item);
        }
        else{
          console.log("Empty row found");
        }
      }
      this.setState({ allRecords: filteredArray });
    };
    reader.readAsBinaryString(f);
    
    //this.onFileUpload();
  };


  onFileUpload = () => {

    // File Upload to Backend
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);
  };



  // File content to be displayed after 
  fileData = () => {
    if (this.state.selectedFile) {

      return (
        <div className="uploadMobileContent">
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div className="uploadMobile">
          <br />
          <h4>Please select file before pressing the upload button</h4>
        </div>
      );
    }
  };

  render() {

   var dataRowVal = this.state.allRecords;

    return (
      <div>
        
        <div className="fileUploadContainer">
          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileValidationNUpdate}>
              Upload
            </button>
          </div>
          {this.fileData()}
        </div>

        {
          (dataRowVal.length > 0) ?
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
                page={true}
                errormsg="Error. . ."
                loadingmsg="Loading. . ."
                isLoading={false}
                sort={false}
                title="Sales Report"
                search={true}
                size={10}
                data={{
                  head: {
                    Region: "Region",
                    Country: "Country",
                    'Item Type': "Item Type",
                    'Sales Channel': "Sales Channel",
                    'Order Priority': "Order Priority",
                    'Order Date': "Order Date",
                    'Order ID': "Order ID",
                    'Ship Date': "Ship Date",
                    'Units Sold': "Units Sold",
                    'Unit Price': "Unit Price",
                    'Unit Cost': "Unit Cost",
                    'Total Revenue': "Total Revenue",
                    'Total Cost': "Total Cost",
                    'Total Profit': "Total Profit",
                    'NRIC':'NRIC'
                  },
                  data: [...this.state.allRecords]
                }} />
            </div>
            : <div></div>

        }

        <ToastContainer>
        </ToastContainer>

      </div>


    );
  }
}



export default UserUpload;
