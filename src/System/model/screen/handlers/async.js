import axios from '../../../../axios';

export const handleAsyncLangNoOpts = (thisK, mode) => {
  if (mode) {
    const fieldsClone = { ...thisK.state.fields };
    fieldsClone.lang_no.options = null;
    thisK.setState({ fields: fieldsClone });
  } else {
    request_lan_no_options(thisK);
  }
};
const request_lan_no_options = (think) => {
  // should be only active
  axios
    .get('public/language')
    .then((res) => {
      const options = [];
      res.data.forEach((i) => {
        if (i.active) {
          const itemTemp = `${i.lang_no} (${i.lang_name})`;
          options.push({ value: i.lang_no, template: itemTemp });
        }
      });
      const fieldsClone = { ...think.state.fields };
      fieldsClone.lang_no.options = options;
      think.setState({ fields: fieldsClone });
    })
    .catch((err) => console.log(err));
};

export const add_lan_dir_options = (thisK) => {
  const options = [];
  thisK.props.languages.forEach((i) => {
    let isPresent = false;
    options.forEach((ele) => {
      if (ele.value === i.lang_dir) {
        isPresent = true;
      }
    });
    if (!isPresent) {
      const itemTemp = `${i.lang_dir}`;
      options.push({ value: i.lang_dir, template: itemTemp });
    }
  });
  const fieldsClone = { ...thisK.state.fields };
  const options_noDub = [...new Set(options)];
  fieldsClone.lang_dir.options = options_noDub;
  thisK.setState({ fields: fieldsClone });
};

export function getTree(url, structure) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        const tree = structure(res.data);
        resolve(tree)
      })
      .catch((err) => console.log(err));
  })
}

// export const asyncTreeSave = (thisK) => {
//   thisK.setState({ tree: null });
//   handleSave(thisK, getTree);
// };

// parallel to send a bunch of requests at the same time
export const parallel = (...Promises) => Promise.all(Promises);
