import React, { PureComponent } from "react";
import { connect } from "react-redux";
import InputField from "./InputField/InputField";
import SelectField from "./SelectField/SelectField";
import CheckBoxField from "./CheckBoxField/CheckBoxField";
import AsyncSelectField from "./AsyncSelectField/AsyncSelectField";
import TextArea from "./TextArea/TextArea";
import FileField from "./FileField/FileField";
import ChipsField from "./ChipsField/ChipsField";
import PrimaryBtn from "../../../Components/UI/PrimaryBtn/PrimaryBtn.component"

class InputFields extends PureComponent {
  selectInputHandler = () => {
    const {field} = this.props;
    switch (field.fieldType) {
      case "input": return <InputField {...this.props}/>
      case "select": return <SelectField {...this.props}/>
      case "checkbox": return <CheckBoxField {...this.props}/>
      case "asyncSelect": return <AsyncSelectField {...this.props}/>
      case "textarea": return <TextArea {...this.props}/>
      case "file": return <FileField {...this.props}/>
      case "chips": return <ChipsField {...this.props}/>
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

export default connect(mapStateToProps, null)(InputFields);
