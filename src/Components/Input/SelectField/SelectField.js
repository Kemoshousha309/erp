import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { t } from "../../../Helpers/lang";
import style from "./SelectField.module.scss";
import {
  changeHandler,
  label,
  checkInputValiditiy,
  reflectOuterState,
} from "../../../Helpers/inputs";

class SelectField extends PureComponent {
  state = {
    value: "",
    touched: false,
    valid: true,
    invalidFeedBack: null,
    lastPropValue: null,
    lastPropValid: null,
  };
  inputChange = (e) => changeHandler(e, this);
  static getDerivedStateFromProps(props, state) {
    return reflectOuterState(props, state);
  }

  render() {
    // console.log(`[selectField] render`, this.state)
    const field = this.props.field;
    const placeholder = t(
      this.props.field.label,
      this.props.lanTable,
      this.props.lanState
    );
    let [invalidMessage, invalidInputStyle] = checkInputValiditiy(this, style);
    let options = null;
    if (field.options) {
      options = field.options.map((op) => {
        return (
          <option key={op.value} value={op.value}>
            {t(op.template, this.props.lanTable, this.props.lanState)}
          </option>
        );
      });
    }
    // style
    const classes = ["form-control", invalidInputStyle];
    if (!field.writability) {
      classes.push(style.disabled);
    }
    return (
      <div className={["form-group", style.inputField].join(" ")}>
        <label
          title={t(
            this.props.field.label,
            this.props.lanTable,
            this.props.lanState
          )}
          htmlFor={field.id}
          className="col-sm-4 col-form-label"
        >
          {label(this)}
        </label>
        <div className="col-sm-8">
          <select
            onChange={this.inputChange}
            value={this.state.value}
            autoComplete="off"
            id={field.id}
            disabled={!field.writability}
            onBlur={(e) => this.props.changeHandler(this.state, field.id)}
            className={classes.join(" ")}
          >
            <option hidden defaultValue>
              {" "}
              {placeholder}{" "}
            </option>
            {options}
          </select>
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

export default connect(mapStateToProps, null)(SelectField);
