/**
 * @module RenderScreen
 */
import React from "react";
import { getParam } from "../../Helpers/utilities";
import { RenderBoilerplate } from "./Boilerplate/Boilerplate";
import { t } from "../../Languages/languages";
import ErrorMess from "../../Error/ErrorMess/ErrorMess";
import { RenderExcelSheetPage } from "./ExcelPage/ExcelPage.component";
import { RenderDisplayPattern } from "./RenderDisplayPattern";
import { RenderLists } from "./RenderLists/RenderLists";
import { RenderDialogs } from "./RenderDialogs/RenderDialogs";

/**
 * A component that responsible for rendering the ui of the screen.
 */
export const RenderScreen = ({ screen, additional }) => {
  const {
    props: {
      location: { search },
      rawTree_hash,
    },
  } = screen;
  // confirm that the user has a privilege on this screen
  const form = rawTree_hash[getParam(search, "no")];
  if (!form) return <ErrorMess message={t("not_allowed")} />;
  return (
    <div id="tap" style={{ height: "100%" }}>
      <RenderBoilerplate screen={screen}>
        <RenderDisplayPattern screen={screen} additional={additional} />
        <RenderLists screen={screen} />
        <RenderDialogs screen={screen} />
        <RenderExcelSheetPage screen={screen} />
      </RenderBoilerplate>
    </div>
  );
};
