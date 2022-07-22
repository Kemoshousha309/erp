import { connect } from 'react-redux';
import { setlastIndex } from '../../../ScreenConstructor/screen/functions/moves';
import { functionsListenrs } from '../../../ScreenConstructor/screen/listeners';
import ScreenConstructor from '../../../ScreenConstructor/ScreenConstructor';
import {
  autoDisplay,
  changePropName,
} from '../../../ScreenConstructor/screen/inputsHandlers';
import { handleDrivedState } from '../../../ScreenConstructor/screen/handlers';
import { displayContent } from '../../../ScreenConstructor/screen/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';

class Country extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        country_no: {
          fieldType: 'input',
          type: 'number',
          label: 'country_no',
          validation: {
            requiered: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
          autoIncrement: 'country/nextPK',
        },
        country_d_name: {
          fieldType: 'input',
          type: 'text',
          label: 'name',
          validation: {
            requiered: true,
            length: 50,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
        country_f_name: {
          fieldType: 'input',
          type: 'text',
          label: 'foreign_name',
          validation: {
            requiered: true,
            length: 50,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
        shortcut: {
          fieldType: 'input',
          type: 'text',
          label: 'shortcut',
          validation: {
            requiered: true,
            length: 50,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },

        region_no: {
          fieldType: 'input',
          type: 'number',
          label: 'region_no',
          validation: {
            requiered: true,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
          fKTable: {
            SPN: 'region',
            PN: 'region_no',
          },
          fillFields: [
            {
              recordName: 'region_no',
              stateName: 'region_no',
            },
            {
              recordName: 'region_d_name',
              stateName: 'region_no_d_name',
            },
            {
              recordName: 'region_f_name',
              stateName: 'region_no_f_name',
            },
          ],
        },
        region_no_name: {
          fieldType: 'input',
          label: 'name',
          readOnly: true,
          value: '',
        },
      },
      pks: ['country_no'],
      tapTools: [], // to be deleted and view the others
      mainFields: ['country_no', 'country_d_name', 'shortcut'],
      tapName: 'country',
      searchFields: ['country_no'],
      urls: {
        add: 'country',
        modify: 'country',
        search: 'country',
        pages: 'country/pages',
        page: 'country/page',
        lastPage: 'country/lastPage',
        filter: 'country/filteredPages',
        pageNo: 'country/pageNo',
        delete: 'country',
      },
      fks: ['region_no'],
      fkList: {
        region_no: {
          mainFields: ['region_no', 'region_d_name', 'shortcut'],
          urls: {
            add: 'region',
            modify: 'region',
            search: 'region',
            pages: 'region/pages',
            page: 'region/page',
            lastPage: 'region/lastPage',
            filter: 'region/filteredPages',
            pageNo: 'region/pageNo',
            delete: 'region',
          },
        },
      },
    };
  }

  componentDidMount() {
    setlastIndex(this);
    functionsListenrs(this, true);

    autoDisplay(this, 'region_no', 'region', {
      main: {
        d: { recordProp: 'region_d_name', stateProp: 'region_no_d_name' },
        f: { recordProp: 'region_f_name', stateProp: 'region_no_f_name' },
      },
    });
  }

  static getDerivedStateFromProps(props, state) {
    const fieldsUpdate = changePropName(
      props,
      state.fields,
      'region_no_name',
      'region_no',
    );
    const { tools } = handleDrivedState(props, state);
    return {
      tools,
      fields: fieldsUpdate,
    };
  }

  render() {
    return displayContent(this, this.props.location);
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  token: state.auth.authData.token,
  languages: state.lang.langInfo,
  rawTree_hash: state.auth.authData.raw_tree_hash,
  forms_privs_hash: state.auth.authData.forms_privs_hash,
});
const mapDispatchToProps = (dispatch) => ({
  changeLangSelectAcivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
