import React from 'react';
import { t } from '../../../Languages/languages';
import style from './TabPanel.module.scss';

function TabPanel(props) {
  const {
    children, tabs, current_tab, changeHandler
  } = props;

  return (
    <div className={style.container}>
      <div className={style.nav}>
        <ul className={style.navList}>
          {Object.keys(tabs).map((key, index) => {
            const i = tabs[key];
            let classes = null;
            if (key === current_tab) {
              classes = style.active;
            }
            return (
              <li key={index} className={classes} id={key} onClick={() => { changeHandler(key); }}>
                {t(i.label)}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default TabPanel;
