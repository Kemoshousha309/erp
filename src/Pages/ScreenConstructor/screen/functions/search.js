import { timer } from '../utilities';
import {
  getValues, fields, getPkUrl, fillRecord,
} from '../fields';
import axios from '../../../../axios';
import { logout } from '../../../../store';
import { store } from '../../../../index';
import { checkValidity } from '../../../../Validation/validation';
import { selectMessage } from '../../../../Helpers/lang';

// Handle search ******************************************************
export const handleSearch = (thisK) => {
  if (thisK.state.mode === 'search') {
    const values = getValues(thisK.state.fields);
    const [valid, fieldsUpdate] = checkValidity(thisK);
    if (valid) {
      searchRequest(thisK, values);
    } else {
      thisK.setState({ fields: fieldsUpdate });
    }
  } else {
    fields(thisK.state.fields, 'open', true, thisK.state.searchFields);
    thisK.setState({ mode: 'search' });
  }
};

const searchRequest = (thisK, values) => {
  thisK.setState({ loading: true }); // use get pk url
  const pkUrl = getPkUrl(thisK.state.pks, values);
  const url = `${thisK.state.urls.search}${pkUrl}`;
  axios.get(url)
    .then((res) => {
      fillRecord(thisK.state.fields, res.data);
      fields(thisK.state.fields, 'close', false);
      thisK.setState({
        mode: 'd_record',
        loading: false,
        recordIndex: null,
        record: res.data,
      });
      timer(thisK);
    })
    .catch((err) => {
      let message = null;
      if (err.response) {
        // update the previlliges
        if (err.response.status === 401) {
          store.dispatch(logout());
        }
        fields(thisK.state.fields, 'open', false, thisK.state.searchFields);
        message = {
          content: selectMessage(err.response.data.message, thisK.props.lanState),
          type: 'error',
        };
      }
      thisK.setState({
        loading: false,
        message,
        recordIndex: null,
      });
      timer(thisK);
    });
};
