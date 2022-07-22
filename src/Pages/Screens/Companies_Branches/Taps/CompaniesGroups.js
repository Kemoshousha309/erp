import { connect } from 'react-redux';
import ScreenConstructor from '../../../ScreenConstructor/ScreenConstructor';
import { displayContent } from '../../../ScreenConstructor/screen/displayContent';
import { langChangeActivity } from '../../../../store/actions/lang';

class CompaniesGroups extends ScreenConstructor {
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
          },
          validity: {
            valid: true,
            touched: false,
            message: null,
          },
          writability: false,
          value: '',
          autoIncrement: 'companyGroup/nextPK',
        },
        group_d_name: {
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
        group_f_name: {
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
      },
      pks: ['group_no'],
      mode: 'start',
      mainFields: ['group_no', 'group_d_name'],
      tapName: 'companyGroup',
      searchFields: ['group_no'],
      urls: {
        add: 'companyGroup',
        modify: 'companyGroup',
        search: 'companyGroup',
        pages: 'companyGroup/pages',
        page: 'companyGroup/page',
        lastPage: 'companyGroup/lastPage',
        filter: 'companyGroup/filteredPages',
        pageNo: 'companyGroup/pageNo',
        delete: 'companyGroup',
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

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesGroups);
