import React, { PureComponent } from "react";
import { connect } from "react-redux";
import InputFile from "../../Components/UI/InputFile/InputFile.component";
import { t } from "../../Languages/languages";
import {
  handleFileChange,
  handleValidateExcelSheet,
} from "../ScreenConstructor/screen/functions/excelSheet/handlers";
import { ExcelPage } from "./render.components";

class ExcelPageWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.excelFileInput = React.createRef();
  }
  state = {
    fileInputErrMes: {
      state: false,
      content: null,
    },
    rawExcelSheet: null,
    errMessages: null,
    selectedFile: null,
    renderButtons: false,
    sheetColumnsNum: null,
    addDisable: true,
  };

  fileChangeHandler = () => handleFileChange(this);
  validateExcelSheet = () => handleValidateExcelSheet(this);
  addExcelSheet = () => this.state.sender.add();

  render() {
    const {
      props: { children, lanState },
      state: { selectedFile },
    } = this;

    return (
      <ExcelPageContext.Provider value={this}>
        <ExcelPage lanState={lanState}>
          <ExcelPage.CloseBtn>Close</ExcelPage.CloseBtn>
          <ExcelPage.Header>{t("add_excel_sheet")} :</ExcelPage.Header>
          <ExcelPage.Instructions>{children}</ExcelPage.Instructions>
          <ExcelPage.InputsContainer>
            <InputFile
              selectedFileName={selectedFile ? selectedFile.name : null}
              id="add_excel_sheet_file"
              ref={this.excelFileInput}
              onChange={this.fileChangeHandler}
            />
            <ExcelPage.InputErrMess />
          </ExcelPage.InputsContainer>
          <ExcelPage.FunctionBtns />
          <ExcelPage.Loading />
          <ExcelPage.ErrorMess />
          <ExcelPage.ServerErr />
          <ExcelPage.AddMess />
          <ExcelPage.ValidMess />
        </ExcelPage>
      </ExcelPageContext.Provider>
    );
  }
}



export const ExcelPageContext = React.createContext(null);


const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan
  };
};


export default connect(mapStateToProps, null)(ExcelPageWrapper);

