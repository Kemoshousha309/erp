import React from "react";


// not used component but keep it for later use
const DisplayExcelSheet = ({ sheet, validationErrors }) => {
  const headers = Object.keys(sheet[0]);
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          {headers.map((header, index) => {
            return <th key={header+index} scope="col">{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {sheet.map((row, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              {Object.values(row).map((r,i) => <td key={i}>{r}</td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DisplayExcelSheet;
