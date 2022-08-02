import { read, utils } from 'xlsx';

export function getSheet(fileInput) {
  return new Promise((resolve, reject) => {
    const selectedFile = fileInput.files[0];
    const fileName = selectedFile.name;
    if (
      selectedFile
      && (fileName.includes('.xlsx')
      || fileName.includes('.xls'))
    ) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        const ArrayBuffer = e.target.result;
        const wb = read(ArrayBuffer);
        // know we have work book with sheets name and content

        // getting the first sheet
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];

        // converting to json
        const csv = utils.sheet_to_csv(ws);
        const data = csvToArray(csv);
        const sheetColumnsNum = Object.keys(data[0]).length;
        console.log(data);

        resolve({
          read: true, data, sheetColumnsNum, selectedFile,
        });
      };
    } else {
      reject({ read: false, selectedFile });
    }
  });
}

function csvToArray(str, delimiter = ',') {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');
  const arr = rows.map((row) => {
    const values = row.split(delimiter);
    const el = headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}
