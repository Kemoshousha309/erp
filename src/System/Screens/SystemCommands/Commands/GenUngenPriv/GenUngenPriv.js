import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import Command from '../../Command';
import style from './GenUngenPriv.module.scss';
import { t } from '../../../../../Languages/languages';

function GenUngenPriv(props) {
  const {
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
        <p>{t('generate_ungenerated_priv')}</p>
        <div className={style.subCommand}>
          <span className={style.note}>
            {t('generated_privs_will_be')}
          </span>
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
}


export default GenUngenPriv;
