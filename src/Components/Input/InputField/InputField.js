import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { t } from "../../../Helpers/lang";
import style from "./InputField.module.scss";
import {
  changeHandler,
  label,
  checkInputValiditiy,
  reflectOuterState,
  handlePassIcon,
} from "../../../Helpers/inputs";

class InputField extends PureComponent {
  state = {
    value: "",
    valid: true,
    invalidFeedBack: null,
    lastPropValue: null,
    lastPropValid: null,
    passIconOpen: true,
  };
  inputChange = (e) =>  
    changeHandler(
      e,
      this,
      this.props.field.changeHandler,
      this.props.field.changeHandler2
    );
  static getDerivedStateFromProps(props, state) {
    return reflectOuterState(props, state);
  }
  onBlurHandler = () => {
    const field = this.props.field;
    this.props.changeHandler(this.state, field.id);
  };

  render() {
    // console.log(`[InputSelectField] render`, this.state)
    const { field, lanTable, lanState } = this.props;
    let { value } = this.state;
    if (field.capitalize) {
      value = value.toUpperCase()
    }
    const placeholder = t(field.label, lanTable, lanState);
    let [invalidMessage, invalidInputStyle] = checkInputValiditiy(this, style);
    const passIcon = handlePassIcon(this, style);

    // style
    const classes = ["form-control", invalidInputStyle];
    if (!field.writability) {
      classes.push(style.disabled);
    }

    return (
      <div className={["form-group", style.inputField].join(" ")}>
        <label
          title={t(field.label, lanTable, lanState)}
          htmlFor={field.id}
          className="col-sm-4 col-form-label"
        >
          {label(this)}
        </label>
        <div className="col-sm-8">
          <div className="position-relative">
            <input
              value={value}
              onChange={this.inputChange}
              onBlur={this.onBlurHandler}
              autoComplete="off"
              disabled={!field.writability}
              type={field.type}
              className={classes.join(" ")}
              id={field.id}
              placeholder={placeholder}
            ></input>
            {passIcon}
          </div>
          {invalidMessage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
    languages: state.lang.langInfo,
  };
};

export default connect(mapStateToProps, null)(InputField);
