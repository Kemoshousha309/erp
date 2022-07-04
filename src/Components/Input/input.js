import React, { PureComponent } from "react";
import { connect } from "react-redux";
import InputField from "./InputField/InputField";
import SelectField from "./SelectField/SelectField";
import CheckBoxField from "./CheckBoxField/CheckBoxField";
import AsyncSelectField from "./AsyncSelectField/AsyncSelectField";
import TextArea from "./TextArea/TextArea";
import FileField from "./FileField/FileField";
import ChipsField from "./ChipsField/ChipsField";
import PrimaryBtn from "../UI/PrimaryBtn/PrimaryBtn.component";

class Input extends PureComponent {
  selectInputHandler = () => {
    const field = this.props.field;
    switch (field.fieldType) {
      case "input":
        return (
          <InputField
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
      case "select":
        return (
          <SelectField
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
      case "checkbox":
        return (
          <CheckBoxField
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
      case "asyncSelect":
        return (
          <AsyncSelectField
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
      case "textarea":
        return (
          <TextArea
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
      case "file":
        return (
          <FileField
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
      case "chips":
        return (
          <ChipsField
            field={this.props.field}
            changeHandler={this.props.changeHandler}
            thisK={this.props.thisK}
          />
        );
        case "button":
          return (
            <PrimaryBtn
              {...this.props.field}
              center
              variant="outline"
            />
          );
      case "holder":
        return <div style={{ height: "4.5rem" }}></div>;
      case "line":
        return <div style={{ borderBottom: "2px solid rgb(171 174 197)" }} />;
      default:
        return <div className="d-block"></div>;
    }
  };
  render() {
    // console.log("[Input] render")
    return this.selectInputHandler();
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(Input);
