import _ from 'lodash';
import axios from '../../../../axios';


export function getDetails(record, screen) {
  return new Promise((resolve, reject) => {
    const {
      fields,
      details: { tabs },
    } = screen.state;
    const detailsPagesURLs = Object.keys(tabs).map((key) => {
      tabs[key].pageURL.id = key;
      return tabs[key].pageURL;
    });
    detailsPagesURLs.forEach((pageURL) => {
      const { master, temp, id } = pageURL;
      let key = record[master] ? record[master] : fields[master].value
      const url = `${temp}/${key}`;
      const recordClone = _.cloneDeep(record)
      axios
        .get(url)
        .then((res) => {
          recordClone[tabs[id].recordDetailPropName] = res.data[tabs[id].recordDetailPropName];
          resolve(recordClone)
        })
        .catch((err) => {
          console.log(err)
          reject({recordClone})
        });
    });
  })
}

// this function transform the data get form foreign screen to look like the current details
export const transformForeignDetailsData = (record, headers) => {
  const newRecord = {
    action: 'add',
    frontRow: true,
  };
  Object.values(headers).forEach((header) => {
    const { foreignPropName, propName, defaultValue } = header;
    if (record.hasOwnProperty(foreignPropName)) {
      newRecord[propName] = record[foreignPropName];
    } else {
      newRecord[propName] = defaultValue;
    }
  });
  return newRecord;
};
