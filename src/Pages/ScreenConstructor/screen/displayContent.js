import React from 'react';
import { Button, Drawer } from '@mui/material';
import AlertDialog from '../../../Components/AlertDialog/AlertDialog';
import Boilerplate from '../../../Components/Boilerplate/Boilerplate';
import RecordDisplay from './RecordDisplay/RecordDisplay';
import ShortCutsList from '../../../Components/ShortCutsList/ShortCutsList';
import ErrorMess from '../../../Error/ErrorMess/ErrorMess';
import ExcelPage from '../../ExcelPage/ExcelPage.component';
import Modal from '../../../Components/UI/Modal/Modal';
import { t } from '../../../Helpers/lang';
import { getParam } from '../../../Helpers/utilities';
import { displayPattren, displayPattrenTree } from '../../../Helpers/display';

export const displayContent = (screen, location, additional) => {
  // this should be a component that use the the upper componet data to display the content
  let content = null;
  if (screen.state.tree === null || screen.state.tree) {
    content = displayPattrenTree(
      screen.state.fields,
      screen.inputChange,
      screen,
      screen.state.tree,
      additional,
    );
  } else {
    content = displayPattren(
      screen.state.fields,
      screen.inputChange,
      screen,
      additional,
    );
  }
  const tapContent = (
    <div id="tap" style={{ height: '100%' }}>
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
      {addDtlForeignListHandler.call(screen)}
      {DtlForeignListHandler.call(screen)}
      {chipsList.call(screen)}
      {excelSheetPage.call(screen)}
      {renderCustimzedList(screen)}

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
        {t('delete_confirm', screen.props.lanTable, screen.props.lanState)}
      </AlertDialog>
      {screen.state.ShortCutsList ? (
        <ShortCutsList close={screen.ShortCutsListCloseHandler} />
      ) : null}
    </div>
  );

  const form = screen.props.rawTree_hash[getParam(location.search, 'no')];
  if (form) {
    return tapContent;
  }
  return (
    <ErrorMess
      message={t('not_allowed', screen.props.lanTable, screen.props.lanState)}
    />
  );
};

function renderCustimzedList(screen) {
  const {
    state: { custimizedList },
    closeCustmizedList,
    props: { lanTable, lanState },
  } = screen;
  if (!custimizedList.open) return;
  return (
    <Modal show clicked={closeCustmizedList}>
      <div style={{ padding: '1.5rem' }}>
        {custimizedList.render}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '5rem',
        }}
        >
          <Button
            onClick={closeCustmizedList}
            color="secondary"
          >
            {t('close', lanTable, lanState)}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

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
      filterBody={screen.state.fkList[fk].filterBody}
    />
  ) : null;
};

function addDtlForeignListHandler() {
  const { addDtlForeignList, details } = this.state;
  return addDtlForeignList ? (
    <RecordDisplay
      urls={details.tabs[addDtlForeignList].foreignURLs_ADD}
      modalClose={this.closeDetailsFkList_ADD}
      recordClick={this.recordDetailsClick_ADD}
      fk
      mainFields={details.tabs[addDtlForeignList].foreignMainFields_ADD}
    />
  ) : null;
}

function DtlForeignListHandler() {
  if (!this.state.details) return null;
  const {
    details,
    details: { current_tab },
  } = this.state;
  const activeDtlFk = details.tabs[current_tab].activeForeignList;
  const focusedField = details.tabs[current_tab].headers[activeDtlFk];
  return activeDtlFk ? (
    <RecordDisplay
      urls={focusedField.foreignURLs}
      modalClose={this.closeDetailsFkList}
      recordClick={this.recordDetailsClick}
      fk // to ensure not to set the index of the records
      mainFields={focusedField.foreignMainFields}
      filterBody={focusedField.filterBody}
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
    resetExcelPage,
  } = this;
  let output = null;
  if (excelSheetOpen) {
    output = (
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
  return output;
}
