/**
 * @module RenderLists
 */
import Modal from "../../../Components/UI/Modal/Modal";
import { Button } from "@mui/material";
import RecordsListDisplay from "../RecordsListDisplay/RecordsListDisplay";
import { t } from "../../../Languages/languages";
import ShortCutsList from "../../../Components/ShortCutsList/ShortCutsList";
/**
 * manges rendering lists based on which one is active
 * take screen as prop
 */
export const RenderLists = ({ screen }) => {
  return (
    <>
    <RenderPrimaryList screen={screen} />
    <RenderForeignList screen={screen} />
    <RenderDtlForeignList screen={screen} />
    <RenderAddDtlForeignList screen={screen} />
    <RenderShortCutList screen={screen} />
    <RenderChipsList screen={screen} />
    <RenderCustomizedList screen={screen} />
    </>
  )
};

const RenderPrimaryList = ({ screen }) => {
  if (!screen.state.listShow) return null;
  return (
    <RecordsListDisplay
      urls={screen.state.urls}
      modalClose={screen.closeList}
      recordClick={screen.recordClick}
      pks={screen.state.pks}
      mainFields={screen.state.mainFields}
    />
  );
};

const RenderForeignList = ({ screen }) => {
  let fk = null;
  if (!screen.state.fkListShow) return null;
  fk = screen.state.fkListShow;
  return (
    <RecordsListDisplay
      urls={screen.state.fkList[fk].urls}
      modalClose={screen.closeFkList}
      recordClick={screen.recordFkClick}
      fk
      mainFields={screen.state.fkList[fk].mainFields}
      filterBody={screen.state.fkList[fk].filterBody}
    />
  );
};

const RenderDtlForeignList = ({ screen }) => {
  if (!screen.state.details) return null;
  const {
    details,
    details: { current_tab },
  } = screen.state;
  const activeDtlFk = details.tabs[current_tab].activeForeignList;
  const focusedField = details.tabs[current_tab].headers[activeDtlFk];
  if (!activeDtlFk) return null;
  return (
    <RecordsListDisplay
      urls={focusedField.foreignURLs}
      modalClose={screen.closeDetailsFkList}
      recordClick={screen.recordDetailsClick}
      fk // to ensure not to set the index of the records
      mainFields={focusedField.foreignMainFields}
      filterBody={focusedField.filterBody}
    />
  );
};

const RenderAddDtlForeignList = ({ screen }) => {
  if (!screen.state.details) return null;
  const { addDtlForeignList, details } = screen.state;
  if (!addDtlForeignList) return null;
  return (
    <RecordsListDisplay
      urls={details.tabs[addDtlForeignList].foreignURLs_ADD}
      modalClose={screen.closeDetailsFkList_ADD}
      recordClick={screen.recordDetailsClick_ADD}
      fk
      mainFields={details.tabs[addDtlForeignList].foreignMainFields_ADD}
    />
  );
};

const RenderShortCutList = ({ screen }) => {
  if (!screen.state.ShortCutsList) return null;
  return <ShortCutsList close={screen.ShortCutsListCloseHandler} />;
};

const RenderChipsList = ({ screen }) => {
  const { chipsListShow, chipsList } = screen.state;
  if (!chipsListShow) return null;
  return (
    <RecordsListDisplay
      urls={chipsList[chipsListShow].urls}
      modalClose={screen.closeChipsList}
      recordClick={screen.chipsRecordClick}
      fk
      mainFields={chipsList[chipsListShow].mainFields}
    />
  );
};

const RenderCustomizedList = ({ screen }) => {
  const {
    state: {
      customizedList: { open },
      customizedList,
    },
    closeCustomizedList,
  } = screen;
  if (!open) return null;
  return (
    <Modal show clicked={closeCustomizedList}>
      <div style={{ padding: "1.5rem" }}>
        {customizedList.render}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "5rem",
          }}
        >
          <Button onClick={closeCustomizedList} color="secondary">
            {t("close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
