import React from "react";
import { Avatar } from "@mui/material";
import style from "./ScreenPrivs.module.scss";
import { hash, split_arr } from "../../../Helpers/utilities";
import { decideName, t } from "../../../Languages/languages";

function ScreenPrivs({screen}) {
  const formPrivs = screen.state.user_formPrivs;
  const user = screen.state.record;
  const { currentForm } = screen.state;
  const { mode } = screen.state;

  // accessibility to modify
  let TableStyle = { opacity: ".5" };
  let disabled = true;
  if (mode === "modify") {
    TableStyle = { opacity: "1" };
    disabled = false;
  }

  let userInfo = null;
  if (user) {
    userInfo = (
      <div className={style.userInfo}>
        <div className={style.userImg}>
          <Avatar
            alt="user"
            src="https://via.placeholder.com"
            className={style.avatar}
          />
        </div>
        <div className={style.userName}>
          {t("name")}:{user[decideName("user")]}
        </div>
        <div className={style.userId}>
          {t("user_no")}:{user.user_id}
        </div>
      </div>
    );
  }

  if (currentForm && formPrivs) {
    const formPrivs_hash = hash(formPrivs, "form_no");
    const formPriv = formPrivs_hash[currentForm];
    if (formPriv) {
      screen.setFormPriv(formPriv);
    }
  }

  let privTable = (
    <p className="text-center">
      {t("prepare_privs")}
      ....{" "}
    </p>
  );
  if (currentForm && screen.state.formPriv) {
    const formPrivs_hash = hash(formPrivs, "form_no");
    const { form_no } = screen.state.formPriv;
    const { currentNode } = screen.state;

    // get the name
    let form_name = formPrivs_hash[form_no][decideName("form")];
    if (currentNode.label_code) {
      form_name = t(currentNode.label_code);
    }

    // get the right privs
    const flag_priv_arr = [
      { title: "add_prv", prop: "add_priv" },
      { title: "modify_prv", prop: "modify_priv" },
      { title: "view_prv", prop: "view_priv" },
      { title: "delete_prv", prop: "delete_priv" },
      { title: "print_prv", prop: "print_priv" },
    ];
    const form_priv_arr = [
      { title: "add_prv", prop: "add_priv" },
      { title: "modify_prv", prop: "modify_priv" },
      { title: "view_prv", prop: "view_priv" },
      { title: "delete_prv", prop: "delete_priv" },
      { title: "print_prv", prop: "print_priv" },
      { title: "include_prv", prop: "include_priv" },
      { title: "post_prv", prop: "post_priv" },
      { title: "audit_prv", prop: "audit_priv" },
    ];
    const main_priv_arr = [{ title: "include_prv", prop: "include_priv" }];

    let priv_arr = form_priv_arr;
    if (currentNode.main || currentNode.flag_code) {
      priv_arr = main_priv_arr;
    }
    if (currentNode.label_code) {
      priv_arr = flag_priv_arr;
    }

    if (priv_arr.length === 8) {
      const [priv_arr1, priv_arr2] = split_arr(priv_arr);
      privTable = (
        <div id="form_priv" className={style.table_container}>
          <span>{form_name}</span>
          <table
            style={TableStyle}
            className="table table-bordered table-dark text-center w-100"
          >
            <thead>
              <tr>
                {priv_arr1.map((i) => (
                  <th scope="col">{t(i.title)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {priv_arr1.map((i) => (
                  <td>
                    <input
                      disabled={disabled}
                      type="checkbox"
                      onChange={(e) => screen.privChangeHandler(e, i.prop)}
                      checked={screen.state.formPriv[i.prop]}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <table
            style={TableStyle}
            className="table table-bordered table-dark text-center w-100 mt-4"
          >
            <thead>
              <tr>
                {priv_arr2.map((i) => (
                  <th scope="col">{t(i.title)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {priv_arr2.map((i) => (
                  <td>
                    <input
                      disabled={disabled}
                      type="checkbox"
                      onChange={(e) => screen.privChangeHandler(e, i.prop)}
                      checked={screen.state.formPriv[i.prop]}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      let classes = "table table-bordered table-dark text-center";
      if (priv_arr.length > 1) {
        classes = "table table-bordered table-dark text-center w-100";
      }
      privTable = (
        <div id="form_priv" className={style.table_container}>
          <span>{form_name}</span>
          <table style={TableStyle} className={classes}>
            <thead>
              <tr>
                {priv_arr.map((i) => (
                  <th scope="col">{t(i.title)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {priv_arr.map((i) => (
                  <td>
                    <input
                      disabled={disabled}
                      type="checkbox"
                      onChange={(e) => screen.privChangeHandler(e, i.prop)}
                      checked={screen.state.formPriv[i.prop]}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  if (screen.state.record) {
    if (screen.state.record.user_id === screen.props.logged_user_id) {
      privTable = null;
    }
  }

  return (
    <div className={style.container}>
      {userInfo}
      {currentForm ? privTable : null}
    </div>
  );
}

export default ScreenPrivs;
