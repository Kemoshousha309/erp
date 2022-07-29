import { connect } from 'react-redux';
import ScreenConstructor from '../../../ScreenConstructor/ScreenConstructor';
import { displayContent } from '../../../ScreenConstructor/screen/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';

class CostCenterGroup extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      fields: {
        group_no: {
          fieldType: 'input',
          type: 'number',
          label: 'group_no',
          validation: {
            requiered: true,
            size: 2147483647,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
        group_d_name: {
          fieldType: 'input',
          type: 'text',
          label: 'name',
          validation: {
            requiered: true,
            length: 100,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
        group_f_name: {
          fieldType: 'input',
          type: 'text',
          label: 'foreign_name',
          validation: {
            length: 100,
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
        },
      },
      pks: ['group_no'],
      tapName: 'costcentergroup',
      searchFields: ['group_no'],
      mainFields: ['group_no', { label: 'name', propName: 'group_d_name' }],
      urls: {
        add: 'costcentergroup',
        modify: 'costcentergroup',
        search: 'costcentergroup',
        pages: 'costcentergroup/pages',
        page: 'costcentergroup/page',
        lastPage: 'costcentergroup/lastPage',
        filter: 'costcentergroup/filteredPages',
        pageNo: 'costcentergroup/pageNo',
        delete: 'costcentergroup',
        preAdd: 'costcentergroup/preAdd',
        preModify: 'costcentergroup/preModify',
      },
      preAdd: {
        state: true,
        content: null,
      },
      preModify: {
        state: true,
        content: null,
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

export default connect(mapStateToProps, mapDispatchToProps)(CostCenterGroup);