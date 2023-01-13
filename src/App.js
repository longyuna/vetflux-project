import React, { useState } from "react";
import * as xlsx from "xlsx";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const datas = e.target.result;
        const workbook = xlsx.read(datas, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="upload">파일선택</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>gender</th>
            </tr>
          </thead>
          <thead>
            {data.map((userInfo) => {
              return (
                <tr key={userInfo.id}>
                  <td>{userInfo.first_name}</td>
                  <td>{userInfo.last_name}</td>
                  <td>{userInfo.email}</td>
                  <td>{userInfo.gender}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default App;
