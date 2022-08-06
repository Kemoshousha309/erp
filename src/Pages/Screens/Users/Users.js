import _ from "lodash";
import { connect } from "react-redux";
import { formatDate } from "../../../Helpers/date";
import { langChangeActivity } from "../../../Context/actions/lang";
import { displayContent } from "../../ScreenConstructor/screen/displayContent";
import { setLastIndex } from "../../ScreenConstructor/screen/functions/moves";
import { handleDerivedState } from "../../ScreenConstructor/screen/handlers";
import {
  autoDisplayModel,
  changeFieldPropNameAccordingToLanNo,
  checkPassConfirm,
  FieldsAutoDisplayer,
  onlyActiveField,
} from "../../ScreenConstructor/screen/inputsHandlers";
import { functionsListeners } from "../../ScreenConstructor/screen/listeners";
import ScreenConstructor from "../../ScreenConstructor/ScreenConstructor";
import { usersInitState } from "./state";

class Users extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      ..._.cloneDeep(usersInitState),
    };
    this.autoDisplayHandler = new FieldsAutoDisplayer(this);
  }

  componentDidMount() {
    setLastIndex(this);
    functionsListeners(this, true);

    const {fields} = this.state;
    let fieldsUpdate = this.copyPrivFromAutoDisplay(fields);
    fieldsUpdate = this.directMangeAutoDisplay(fieldsUpdate);
    fieldsUpdate = this.copyPrivToAutoDisplay(fieldsUpdate);
    fieldsUpdate = this.groupNoAutoDisplay(fieldsUpdate);
    fieldsUpdate = this.changeGroupNoNameProp(fieldsUpdate);
    fieldsUpdate = this.changeDirectMangProp(fieldsUpdate);
    fieldsUpdate = checkPassConfirm(this, fieldsUpdate);
    fieldsUpdate = handleInactiveFields(this, fieldsUpdate);
    this.setState({fields: fieldsUpdate})
  }

  copyPrivToAutoDisplay(fields) {
    return autoDisplayModel.call(
      this,
      "copy_priv_to",
      "usersgroups",
      {
        main: {
          d: { recordProp: "group_d_name", stateProp: "copy_priv_to_name" },
          f: { recordProp: "group_f_name", stateProp: "copy_priv_to_name" },
        },
      },
      fields
    );
  }
  directMangeAutoDisplay(fields) {
    return autoDisplayModel.call(
      this,
      "direct_mang",
      "users",
      {
        main: {
          d: { recordProp: "user_d_name", stateProp: "direct_mang_d_name" },
          f: { recordProp: "user_f_name", stateProp: "direct_mang_f_name" },
        },
      },
      fields
    );
  }
  copyPrivFromAutoDisplay(fields) {
    return autoDisplayModel.call(
      this,
      "copy_priv_from",
      "users",
      {
        main: {
          d: { recordProp: "user_d_name", stateProp: "copy_priv_from_name" },
          f: { recordProp: "user_f_name", stateProp: "copy_priv_from_name" },
        },
      },
      fields
    );
  }
  groupNoAutoDisplay(fields) {
    return autoDisplayModel.call(
      this,
      "group_no",
      "usersgroups",
      {
        main: {
          d: { recordProp: "group_d_name", stateProp: "group_no_d_name" },
          f: { recordProp: "group_f_name", stateProp: "group_no_f_name" },
        },
      },
      fields
    );
  }
  changeGroupNoNameProp(fields) {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "group_no_name",
      "group_no",
      "group_no"
    );
  }
  changeDirectMangProp(fields) {
    return changeFieldPropNameAccordingToLanNo(
      this.props,
      fields,
      "direct_mang_name",
      "direct_mang",
      "direct_mang"
    );
  }

  static getDerivedStateFromProps(props, state) {
    const fieldsClone = { ...state.fields };
    let fieldsUpdate = fieldsClone;
    let lang_no = state.langNo;
    // this is the technique of active only one field without affect other things
    if (parseInt(props.lanState) !== parseInt(state.langNo)) {
      lang_no = props.lanState;
    } else {
      fieldsUpdate = onlyActiveField(
        fieldsClone,
        "copy_priv_from",
        "copy_priv_to",
        state.mode
      );
    }
    const { tools } = handleDerivedState(props, state);
    return {
      tools,
      fields: fieldsUpdate,
      langNo: lang_no,
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
  changeLangSelectActivity: (mode) => dispatch(langChangeActivity(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const handleInactiveFields = (screen, fields) => {
  const fieldsClone = _.cloneDeep(fields);
  fieldsClone.inactive.changeHandler = (state) => {
    const fieldsUpdate = _.cloneDeep(screen.state.fields);
    const flag = !state.value;
    if (flag) {
      fieldsUpdate.inactive_reason.writability = true;
      if (screen.state.mode !== "add") {
        fieldsUpdate.inactive_reason.value = screen.state.record.inactive_reason;
        fieldsUpdate.inactive_user.value = screen.state.record.inactive_user;
        fieldsUpdate.inactive_date.value = formatDate(
          screen.state.record.inactive_date
        );
      }
      screen.setState({ fields: fieldsUpdate });
    } else {
      fieldsUpdate.inactive_reason.writability = false;
      if (screen.state.mode !== "add") {
        fieldsUpdate.inactive_reason.value = "";
        fieldsUpdate.inactive_user.value = "";
        fieldsUpdate.inactive_date.value = "";
      }
      screen.setState({ fields: fieldsUpdate });
    }
  };
  return fieldsClone
};
