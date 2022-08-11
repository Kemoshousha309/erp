import React from "react";
import { Button } from "@mui/material";
import InputPrivsTable from "./InputPrivsTable";
import { t } from "../../../Languages/languages";

function InputPrivsView(props) {
  const {
    lanTable,
    lanState,
    input_privs,
    mode,
    privChangeHandler,
    logged_user_id,
    viewInputPrivs,
    content,
    privControlInputHandler,
  } = props;
  const additionalStyle = {
    margin: "2rem",
  };
  return (
    <div style={additionalStyle}>
      <Button
        onClick={viewInputPrivs}
        variant="contained"
        color="primary"
        style={{ marginBottom: "2rem" }}
      >
        {t("view")}
      </Button>
      {input_privs
        ? InputPrivsTable(
            content,
            inputsControl,
            lanTable,
            lanState,
            input_privs,
            mode,
            logged_user_id,
            privChangeHandler,
            privControlInputHandler
          )
        : null}
    </div>
  );
}

const inputsControl = (disabled, i, propName, cursor, logged_user_id) => {
  let message = null;
  let newCursor = cursor;
  if (!i[`can_change_${propName}`]) {
    disabled = true;
    message = t("donot_have_privileges", " ");
  }
  if (i.admin_group) {
    disabled = true;
    message = t("group_admin_cannot_change_privs");
  }
  if (i.user_id === logged_user_id) {
    disabled = true;
    message = t("you_logged_user");
  }
  if (message) {
    newCursor = "help";
  }
  return [disabled, message, newCursor];
};

export const RenderPrivilegesView = ({ screen }) => {
  const {
    state: { input_privs, mode, content, isPrivScreen },
    props: { lanState, lanTable },
    viewInputPrivs,
    privChangeHandler,
    privControlInputHandler,
  } = screen;
  if(!isPrivScreen) return null;
  return (
    <InputPrivsView
      lanState={lanState}
      lanTable={lanTable}
      viewInputPrivs={viewInputPrivs}
      content={content}
      mode={mode}
      privChangeHandler={privChangeHandler}
      input_privs={input_privs}
      privControlInputHandler={privControlInputHandler}
    />
  );
};
