import React, { Component } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

class UserUpload extends Component {

  state = {
    selectedFile: null,
    allEmployee: []
  };
  

  componentDidMount() {
    //Load All Employees
    axios.get('https://nphc-hr.free.beeceptor.com/employees')
      .then(res => {
        const employee = res.data;
        this.setState({ allEmployee: employee });
      })
  }


  onFileChange = event => {
    let fileType = event.target.files[0].type;
    let fileSize = event.target.files[0].size;
    const actualFileSize = Math.round((fileSize / 1024));
    if (fileType === "application/vnd.ms-excel") {
      if (actualFileSize <= 2048) {
        this.setState({ selectedFile: event.target.files[0] });
      }
      else {
        this.setState({ selectedFile: null });
        alert("File too big, please select a file lesser than 2mb");
      }
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

    //Read data from CSV
    let validationCounter = 0;
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
        if (item && item.id !== "") {

          //Any row starting with “#” is considered a comment and ignored.
          if (item.id !== "#") {
            let allEmployeeData = this.state.allEmployee;
            let checkEmpExist = allEmployeeData.find(x => x.id === item.id && x.username === item.username);
            if (checkEmpExist) {
              //Update Emp Record
              this.updateEmpRecord(item);
            }
            else {
              //Create New Emp Record
              this.createEmpRecord(item);
            }
          }

        }
        else {
          validationCounter++;
        }
      }

    };
    reader.readAsBinaryString(f);

    //one or more of the rows fails validation, the entire file is rejected
    if (validationCounter <= 1) {
      this.onFileUpload();
    }

  };


  createEmpRecord = (emp) => {
    try {
      const resp = axios.post('https://nphc-hr.free.beeceptor.com/employees', emp);
      alert('New Employee created');
    } catch (err) {
      // Handle Error Here
      alert('New Employee Service failed ' + err);
    }
  };

  updateEmpRecord = (emp) => {
    try {
      const resp = axios.put('https://nphc-hr.free.beeceptor.com/employees/' + emp.id, { emp });
      alert('Employee details updated');
    } catch (err) {
      // Handle Error Here
      alert('Employee Update Service failed ' + err);
    }
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

    const sendPostRequest = async () => {
      try {
        const resp = await axios.post('https://nphc-hr.free.beeceptor.com/employees/upload', formData);
        alert('File upload sucessfully ' + resp.status);
      } catch (err) {
        // Handle Error Here
        alert('File upload failed ' + err);
      }
    };

    sendPostRequest();

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
    return (
      <div className="fileUploadContainer">
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileValidationNUpdate}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}



export default UserUpload;
