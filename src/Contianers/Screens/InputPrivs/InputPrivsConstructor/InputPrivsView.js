import React from "react";
import { Button } from "@mui/material";
import InputPrivsTable from "./InputPrivsTable";
import { t } from "../../../../utilities/lang";

const InputPrivsView = (props) => {
  const {
    lanTable,
    lanState,
    input_privs,
    mode,
    privChangeHandler,
    logged_user_id,
    viewInputPrivs,
    content,
    privControlIpnputHandler,
  } = props;
  const aditionalStyle = {
    margin: "2rem",
  };
  return (
    <div style={aditionalStyle}>
      <Button
        onClick={viewInputPrivs}
        variant="contained"
        color="primary"
        style={{ marginBottom: "2rem" }}
      >
        {t("view", lanTable, lanState)}
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
            privControlIpnputHandler
          )
        : null}
    </div>
  );
};

export function initInputPrivsView() {
  const {
    state: { input_privs, mode, content },
    props: { lanState, lanTable },
    viewInputPrivs,
    privChangeHandler,
    privControlIpnputHandler,
  } = this;
  return (
    <InputPrivsView
      lanState={lanState}
      lanTable={lanTable}
      viewInputPrivs={viewInputPrivs}
      content={content}
      mode={mode}
      privChangeHandler={privChangeHandler}
      input_privs={input_privs}
      privControlIpnputHandler={privControlIpnputHandler}
    />
  );
}

const inputsControl = (
  disabled,
  i,
  propName,
  cursor,
  lanState,
  lanTable,
  logged_user_id
) => {
  let message = null;
  let newCursor = cursor;
  if (!i[`can_change_${propName}`]) {
    disabled = true;
    message = t("donot_have_privileges", lanTable, lanState, " ");
  }
  if (i.admin_group) {
    disabled = true;
    message = t("group_admin_cannot_change_privs", lanTable, lanState);
  }
  if (i.user_id === logged_user_id) {
    disabled = true;
    message = t("you_logged_user", lanTable, lanState);
  }
  if (message) {
    newCursor = "help";
  }
  return [disabled, message, newCursor];
};
