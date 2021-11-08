import axios from "../../../../axios";

export function getDetails(record, i) {
  const {
    details: { tabs },
    details,
  } = this.state;
  const detailsPagesURLs = Object.keys(tabs).map((key) => {
    tabs[key].pageURL.id = key;
    return tabs[key].pageURL;
  });
  detailsPagesURLs.forEach((pageURL) => {
    const { master, temp, id } = pageURL;
    const url = `${temp}/${record[master]}`;
    this.setState({ details: { ...details, loading: true } });
    axios
      .get(url)
      .then((res) => {
        record[tabs[id].recordDetailPropName] =
          res.data[tabs[id].recordDetailPropName];
        this.setState({
          record: record,
          details: { ...details, loading: false },
        });
      })
      .catch((err) => console.log(err));
  });
}

// this function transform the data get form forieng screen to look like the current details
export const transformForiegnDetailsData = (record, headers) => {
  const newRecord = {
    action: "add",
    frontRow: true,
  }
  headers.forEach((header) => {
    const { foriegnPropName, propName, defaultValue } = header;
    if (record.hasOwnProperty(foriegnPropName)) {
      newRecord[propName] = record[foriegnPropName];
    } else {
      newRecord[propName] = defaultValue;
    }
  });
  return newRecord;
};
