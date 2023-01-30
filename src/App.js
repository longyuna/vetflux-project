import React, { useState } from "react";
import * as xlsx from "xlsx";
import "./App.css";

const App = () => {
  const [validData, setValidData] = useState([]);
  const [inValidData, setInValidData] = useState([]);
  console.log(validData);
  console.log(inValidData);

  const readUploadFile = (e) => {
    const phoneRegex =
      /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
    const ids = {};
    const valid = [];
    const invalid = [];

    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const datas = e.target.result;
        const workbook = xlsx.read(datas, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);

        json.forEach((item) => {
          const id = item.동물번호 || item.환자ID;
          const petName = item.동물이름;
          const name = item.보호자이름;
          const phone = item.핸드폰번호 || item.휴대폰번호 || item.집전화번호;
          if (!ids[id]) {
            ids[id] = true;
            let gender = "기타";
            // eslint-disable-next-line default-case
            switch (item.성별) {
              case "Canine":
                gender = "남자";
                break;
              case "Feline":
                gender = "여자";
                break;
            }
            if (
              !id ||
              !phone ||
              !phoneRegex.test(phone) ||
              !name ||
              !petName ||
              !gender
            ) {
              invalid.push({
                id: id,
                petName: petName,
                name: name,
                type: gender,
                phoneNumber: phone,
              });
            } else {
              valid.push({
                id: id,
                petName: petName,
                name: name,
                type: gender,
                phoneNumber: phone,
              });
            }
          }
        });
        setValidData(valid);
        setInValidData(invalid);
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
              <th>고객id</th>
              <th>동물이름</th>
              <th>보호자 이름</th>
              <th>성별</th>
              <th>번호</th>
            </tr>
          </thead>
          <tbody>
            {validData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.petName}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>잘못된고객id</th>
              <th>동물이름</th>
              <th>보호자 이름</th>
              <th>성별</th>
              <th>번호</th>
            </tr>
          </thead>
          <tbody>
            {inValidData.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.petName}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
