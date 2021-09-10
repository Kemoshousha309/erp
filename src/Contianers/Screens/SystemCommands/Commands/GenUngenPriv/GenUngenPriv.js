import React from "react";
import { connect } from "react-redux";
import { t } from "../../../../../utilities/lang";
import Command from "../../Command";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import style from "./GenUngenPriv.module.scss";

const GenUngenPriv = (props) => {
  const {
    lanTable,
    lanState,
    genUngenPrivExcuteHandler,
    genUngenPrivRadioHandler,
    value,
  } = props;
  const theme = createMuiTheme({
    typography: {
      fontSize: 21,
    },
  });
  return (
    <Command excute={genUngenPrivExcuteHandler}>
      <div className={style.head}>
        <p>{t("generate_ungenerated_priv", lanTable, lanState)}</p>
        <div className={style.subCommand}>
          <span className={style.note}>{t("generated_privs_will_be", lanTable, lanState)}</span>
          <FormControl component="fieldset">
            <ThemeProvider theme={theme}>
              <RadioGroup
                onChange={genUngenPrivRadioHandler}
                className={style.radioGroup}
                aria-label="gender"
                name="genUngenPriv"
                value={value}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </ThemeProvider>
          </FormControl>
        </div>
      </div>
    </Command>
  );
};

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(GenUngenPriv);
