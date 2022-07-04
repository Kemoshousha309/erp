import React from "react";
import AlertDialog from "../../../Components/AlertDialog/AlertDialog";
import Boilerplate from "../../../Components/Boilerplate/Boilerplate";
import RecordDisplay from "../../ScreenConstructor/screen/RecordDisplay/RecordDisplay";
import ShortCutsList from "../../../Components/ShortCutsList/ShortCutsList";
import { displayPattren, displayPattrenTree } from "../../../utilities/display";
import ErrorPage from "../../../Components/UI/ErrorPage/ErrorPage";
import { t } from "../../../utilities/lang";
import { getParam } from "../../../utilities/utilities";
import { Drawer } from "@mui/material";
import ExcelPage from "../../ExcelPage/ExcelPage.component";

export const displayContent = (screen, location, additional) => {
  // this should be a component that use the the upper componet data to display the content
  let content = null;
  if (screen.state.tree === null || screen.state.tree) {
    content = displayPattrenTree(
      screen.state.fields,
      screen.inputChange,
      screen,
      screen.state.tree,
      additional
    );
  } else {
    content = displayPattren(
      screen.state.fields,
      screen.inputChange,
      screen,
      additional
    );
  }
  const tapContent = (
    <div id="tap" style={{ height: "100%" }}>
      {screen.state.listShow ? (
        <RecordDisplay
          urls={screen.state.urls}
          modalClose={screen.closeList}
          recordClick={screen.recordClick}
          pks={screen.state.pks}
          mainFields={screen.state.mainFields}
        />
      ) : null}
      {fkList(screen)}
      {detailsForeignListHandler.call(screen)}
      {chipsList.call(screen)}
      {excelSheetPage.call(screen)}

      <Boilerplate
        gridType={screen.state.gridType}
        dropDown={screen.props.dropDown}
        toolsClicked={screen.toolsClickedHandler}
        tools={screen.state.tools}
        loading={screen.state.loading}
        message={screen.state.message}
      >
        {content}
      </Boilerplate>
      <AlertDialog
        open={screen.state.deleteConfirm}
        handleClose={screen.deleteConfirmation}
      >
        {t("delete_confirm", screen.props.lanTable, screen.props.lanState)}
      </AlertDialog>
      {screen.state.ShortCutsList ? (
        <ShortCutsList close={screen.ShortCutsListCloseHandler} />
      ) : null}
    </div>
  );

  let form = screen.props.rawTree_hash[getParam(location.search, "no")];
  if (form) {
    return tapContent;
  } else {
    return (
      <ErrorPage
        message={t("not_allowed", screen.props.lanTable, screen.props.lanState)}
      />
    );
  }
};

const fkList = (screen) => {
  let fk = null;
  if (screen.state.fkListShow) {
    fk = screen.state.fkListShow;
  }
  return screen.state.fkListShow ? (
    <RecordDisplay
      urls={screen.state.fkList[fk].urls}
      modalClose={screen.closeFkList}
      recordClick={screen.recordFkClick}
      fk
      mainFields={screen.state.fkList[fk].mainFields}
    />
  ) : null;
};

function detailsForeignListHandler() {
  const { detailsForeignList, details } = this.state;
  return detailsForeignList ? (
    <RecordDisplay
      urls={details.tabs[detailsForeignList].foreignURLs}
      modalClose={this.closeDetailsFkList}
      recordClick={this.recordDetailsClick}
      fk
      mainFields={details.tabs[detailsForeignList].foreignMainFields}
    />
  ) : null;
}

function chipsList() {
  const { chipsListShow, chipsList } = this.state;
  return chipsListShow ? (
    <RecordDisplay
      urls={chipsList[chipsListShow].urls}
      modalClose={this.closeChipsList}
      recordClick={this.chipsRecordClick}
      fk
      mainFields={chipsList[chipsListShow].mainFields}
    />
  ) : null;
}

function excelSheetPage() {
  const {
    state: {
      excelPage,
      excelSheetOpen,
      recordPropNames,
      ExcelSheetInstructions, // component
    },
    excelPageClose,
    saveExcelSheet,
    excelPageValidator,
    excelPagePreparer,
    excelSheetServerSender,
    resetExcelPage
  } = this;
  return (
    <Drawer anchor="top" onClose={excelPageClose} open={excelSheetOpen}>
      <ExcelPage
        excelPageInfo={excelPage}
        recordPropNames={recordPropNames}
        excelPageValidator={excelPageValidator}
        excelPagePreparer={excelPagePreparer}
        saveExcelSheet={saveExcelSheet}
        close={excelPageClose}
        excelSheetServerSender={excelSheetServerSender}
        resetExcelPage={resetExcelPage}
      >
        <ExcelSheetInstructions />
      </ExcelPage>
    </Drawer>
  );
}
