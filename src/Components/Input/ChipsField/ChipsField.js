import * as React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import style from './ChipsField.module.scss';
import { t } from '../../../Helpers/lang';
import { label } from '../../../Helpers/inputs';

class ChipsField extends React.PureComponent {
  render() {
    const {
      field: {
        value,
        addHandler,
        removeHandler,
        label: fieldLabel,
        writability,
        id,
        validity: { valid, message },
      },
      lanTable,
      lanState,
    } = this.props;

    const styles = { cursor: 'pointer' };
    if (!writability) {
      styles.opacity = '.6';
      styles.cursor = 'initial';
    }
    return (
      <div className={['form-group', style.inputField].join(' ')}>
        <label
          title={t(fieldLabel, lanTable, lanState)}
          htmlFor={id}
          className="col-sm-4 col-form-label"
        >
          {label(this)}
        </label>
        <div className="col-sm-8">
          <div className="position-relative">
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                minHeight: '4rem',
                cursor: 'pointer',
                ...styles,
                p: 0.5,
                m: 0,
              }}
              // title={writability ? t("click_to_add", lanTable, lanState) : null}
              component="ul"
              onClick={() => addHandler()}
            >
              {value.map((chip, index) => (
                <li key={index} style={{ padding: '.2rem' }}>
                  <Chip
                    sx={{
                      direction: 'ltr',
                    }}
                    style={{ fontSize: '1.4rem' }}
                    label={chip}
                    variant="outlined"
                    onDelete={writability ? () => removeHandler(index) : null}
                  />
                </li>
              ))}
            </Paper>
          </div>
          <div className={!valid ? style.invalidMessage : null}>{message}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  languages: state.lang.langInfo,
});

export default connect(mapStateToProps, null)(ChipsField);
