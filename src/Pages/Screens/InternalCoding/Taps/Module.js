import { connect } from 'react-redux';
import ScreenConstructor from '../../../ScreenConstructor/ScreenConstructor';
import { displayContent } from '../../../ScreenConstructor/screen/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';

class Module extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        module_no: {
          fieldType: 'input',
          type: 'number',
          label: 'module_no',
          validation: {
            requiered: true,
            length: 30,
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
            length: 200,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
        module_d_name: {
          fieldType: 'input',
          type: 'text',
          label: 'name',
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
        },
        module_f_name: {
          fieldType: 'input',
          type: 'text',
          label: 'foreign_name',
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
        },
        order_no: {
          fieldType: 'input',
          type: 'number',
          label: 'order_no',
          validation: {
            requiered: true,
            length: 30,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
        active: {
          fieldType: 'checkbox',
          type: 'checkbox',
          label: 'active',
          writability: false,
          value: false,
        },
      },
      pks: ['module_no'],
      tapTools: ['delete', 'add', 'copy'],
      mainFields: ['module_no', 'shortcut', 'module_d_name'],
      tapName: 'modules',
      searchFields: ['module_no'],
      urls: {
        add: 'modules',
        modify: 'modules',
        search: 'modules',
        pages: 'modules/pages',
        page: 'modules/page',
        lastPage: 'modules/lastPage',
        filter: 'modules/filteredPages',
        pageNo: 'modules/pageNo',
        delete: 'modules',
      },
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

export default connect(mapStateToProps, mapDispatchToProps)(Module);
