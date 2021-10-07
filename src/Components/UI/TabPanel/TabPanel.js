import React from "react";
import { t } from "../../../utilities/lang";
import style from "./TabPanel.module.scss";

const TabPanel = (props) => {
  const { children, tabs, current_tab, changeHandler, lanTable, lanState } = props;

  return (
    <div className={style.container}>
      <div className={style.nav}>
        <ul className={style.navList}>
          {Object.keys(tabs).map((key, index) => {
            const i = tabs[key]
            let classes = null;
            if (key === current_tab) {
              classes = style.active;
            }
            return (
              <li key={index} className={classes} id={key} onClick={() => {changeHandler(key)}}>
                {t(i.label, lanTable, lanState)}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default TabPanel;
