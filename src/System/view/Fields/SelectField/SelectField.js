import React, { PureComponent } from "react";
import { t } from "../../../../Languages/languages";
import { changeHandler, checkInputValidity, reflectOuterState, label } from "../handlers";
import style from "./SelectField.module.scss";

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
    const {field, screen} = this.props;
    const placeholder = t(this.props.field.label);
    let [invalidMessage, invalidInputStyle] = checkInputValidity(this, style);
    let options = null;
    if (field.options) {
      options = field.options.map((op) => {
        return (
          <option key={op.value} value={op.value}>
            {t(op.template)}
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
          title={t(field.label)}
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
            onBlur={(e) => screen.inputChange(this.state, field.id)}
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

export default SelectField;
