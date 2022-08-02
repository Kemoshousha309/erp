import _, { cloneDeep } from 'lodash';
import axios from '../../../../axios';


export function getDetails(record, screen) {
  return new Promise((resolve, reject) => {
    const {
      details: { tabs },
    } = screen.state;
    const detailsPagesURLs = Object.keys(tabs).map((key) => {
      tabs[key].pageURL.id = key;
      return tabs[key].pageURL;
    });
    detailsPagesURLs.forEach((pageURL) => {
      const { master, temp, id } = pageURL;
      const url = `${temp}/${record[master]}`;
      axios
        .get(url)
        .then((res) => {
          const recordClone = _.cloneDeep(record)
          recordClone[tabs[id].recordDetailPropName] = res.data[tabs[id].recordDetailPropName];
          resolve(cloneDeep(recordClone))
        })
        .catch((err) => console.log(err.response));
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
