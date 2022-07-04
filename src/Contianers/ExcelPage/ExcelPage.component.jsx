import { Button } from "@mui/material";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import InputFile from "../../Components/UI/InputFile/InputFile.component";
import { t } from "../../utilities/lang";
import { handleFileChange, handleValidateExcelSheet } from "../ScreenConstructor/screen/functions/excelSheet/handlers";
import style from "./ExcelPage.module.scss";
import {
  RenderErrorMessage,
  RenderErrorResponse,
  RenderLoading,
  RenderFileInputErrMess,
  RenderButtons,
  RenderValidMess,
  RenderAddMess
} from "./render.components";

class ExcelPage extends PureComponent {
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
    addDisable: true
  };

  fileChangeHandler = () => handleFileChange(this);
  validateExcelSheet = () => handleValidateExcelSheet(this);
  addExcelSheet = () => this.state.sender.add()

  render() {
    const {
      props: {
        close,
        lanState,
        lanTable,
        children,
        excelPageInfo: { excelLoading, serverValidate, addMess },
      },
      state: { fileInputErrMes, errMessages, selectedFile, renderButtons },
      validateExcelSheet,
      addExcelSheet,
    } = this;
    const containerClassess = [style.container];
    if (parseInt(lanState) === 1) {
      containerClassess.push(style.rtl);
    } else {
      containerClassess.push(style.ltr);
    }
    return (
      <div className={containerClassess.join(" ")}>
        <div className={style.btnContainer}>
          <Button onClick={close} variant="outlined" color="error">
            Close
          </Button>
        </div>
        <h1>{t("add_excel_sheet", lanTable, lanState)} :</h1>
        <div className={style.instructions}>{children}</div>
        <div className={style.inputsContainer}>
          <InputFile
            selectedFileName={selectedFile ? selectedFile.name : null}
            id="add_excel_sheet_file"
            ref={this.excelFileInput}
            onChange={this.fileChangeHandler}
          />
          <RenderFileInputErrMess fileInputErrMes={fileInputErrMes} />
        </div>
        <RenderButtons
          show={renderButtons}
          validate={validateExcelSheet}
          add={addExcelSheet}
          addDisable={serverValidate.addAvialabilty}
        />
        <RenderLoading loading={excelLoading} />
        <RenderErrorMessage errMessages={errMessages} />
        <RenderValidMess show={serverValidate.addAvialabilty} />
        <RenderAddMess mess={addMess} />
        <RenderErrorResponse
          responseData={serverValidate.validateRes}
          langNo={lanState}
        />
        {/* <RenderExcelTable excelSheet={excelSheet} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(ExcelPage);
