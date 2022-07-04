import { read, utils } from "xlsx";

export function getSheet(fileInput) {
  return new Promise((resolve, reject) => {
    const selectedFile = fileInput.files[0];
    if (!selectedFile || !selectedFile.name.includes(".xlsx")) {
      reject({ readed: false, selectedFile });
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = (e) => {
      const ArrayBuffer = e.target.result;
      const wb = read(ArrayBuffer);
      // know we have work book with sheets name and content

      // getting the first sheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // converting to json
      const csv = utils.sheet_to_csv(ws);
      const data = csvToArray(csv);
      const sheetColumnsNum = Object.keys(data[0]).length;

      resolve({ readed: true, data, sheetColumnsNum, selectedFile });
    };
  });
}

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}
