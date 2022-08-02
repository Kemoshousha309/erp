import React, { PureComponent } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import { connect } from 'react-redux';
import style from './Filter.module.scss';
import { triggerEnterButton } from '../../utilities';
import { getF } from '../../../../../Helpers/utilities';
import { t } from '../../../../../Languages/languages';

class Filter extends PureComponent {
  componentDidMount() {
    this.props.fields.map((f, i) => {
      const id = `${getF(f, 'label', this.props.lanState)}${i}100`;
      triggerEnterButton(id, this.props.searchClick);
      return null;
    });
  }

  render() {
    const {
      props: {
        fields,
        lanState,
        inputValueChangeHandler,
        searchClick,
      },
    } = this;
    // fields => list of str or object{label, propName} to define the displayed fields
    // inputValueChangeHandler => on blur get the value of the filter field
    // searchClick => clicker handler of the search icon
    const colSpan = 12 / fields.length;
    const searchFields = fields.map((f, i) => {
      const id = `${getF(f, 'label', this.props.lanState)}${i}100`;
      let type = 'text';
      if (f === 'lang_no') {
        type = 'number';
      }
      return (
        <div key={i} className={`col-sm-${colSpan}`}>
          <TextField
            type={type}
            id={id}
            onBlur={(e) => inputValueChangeHandler(e, getF(f, 'propName', lanState))}
            autoComplete="off"
            variant="standard"
            fullWidth
            label={t(getF(f, 'label', lanState))}
          />
        </div>
      );
    });

    return (
      <div className={style.Filter}>
        <div className="row">{searchFields}</div>
        <span>
          <FontAwesomeIcon icon={faSearch} onClick={searchClick} />
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lanTable: state.lang.langTables,
});

export default connect(mapStateToProps, null)(Filter);
