import React from "react";
import style from "./PrivDisplay.module.scss";
import Avatar from "@material-ui/core/Avatar";
import { decideName, t } from "../../../utilities/lang";
import { hash, split_arr } from "../../../utilities/utilities";

const PrivDisplay = (thisK) => {
  const lang_no = thisK.props.lanState;
  const lang_table = thisK.props.lanTable;
  const formPrivs = thisK.state.user_formPrivs;
  const user = thisK.state.record;
  const currentForm = thisK.state.currentForm;
  const mode = thisK.state.mode;

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
          {t("name", lang_table, lang_no)}: {user[decideName("user", lang_no)]}
        </div>
        <div className={style.userId}>
          {t("user_no", lang_table, lang_no)}: {user.user_id}
        </div>
      </div>
    );
  }

  if (currentForm && formPrivs) {
    const formPrivs_hash = hash(formPrivs, "form_no");
    const formPriv = formPrivs_hash[currentForm];
    if (formPriv) {
      thisK.setFormPriv(formPriv);
    }
  }

  let privTable = (
    <p className="text-center">
      {t("prepare_privs", lang_table, lang_no)}....{" "}
    </p>
  );
  if (currentForm && thisK.state.formPriv) {
    const formPrivs_hash = hash(formPrivs, "form_no");
    const form_no = thisK.state.formPriv.form_no;
    const currentNode = thisK.state.currentNode;

    // get the name
    let form_name = formPrivs_hash[form_no][decideName("form", lang_no)];
    if (currentNode.label_code) {
      form_name = t(currentNode.label_code, lang_table, lang_no);
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
                  <th scope="col">{t(i.title, lang_table, lang_no)}</th>
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
                      onChange={(e) => thisK.privChangeHandler(e, i.prop)}
                      checked={thisK.state.formPriv[i.prop]}
                    ></input>
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
                  <th scope="col">{t(i.title, lang_table, lang_no)}</th>
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
                      onChange={(e) => thisK.privChangeHandler(e, i.prop)}
                      checked={thisK.state.formPriv[i.prop]}
                    ></input>
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
                  <th scope="col">{t(i.title, lang_table, lang_no)}</th>
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
                      onChange={(e) => thisK.privChangeHandler(e, i.prop)}
                      checked={thisK.state.formPriv[i.prop]}
                    ></input>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  if (thisK.state.record) {
    if (thisK.state.record.user_id === thisK.props.logged_user_id) {
      privTable = null;
    }
  }

  return (
    <div className={style.container}>
      {userInfo}
      {currentForm ? privTable : null}
    </div>
  );
};

export default PrivDisplay;
