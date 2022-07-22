import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from './lang';
import { isValid } from '../Validation/validation';

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const changeHandler = (e, thisK, handler1, handler2) => {
  const validationRules = thisK.props.field.validation;
  const stateClone = { ...thisK.state };
  const [valid, message] = isValid(e.target.value, validationRules, thisK);
  stateClone.valid = valid;
  stateClone.invalidFeedBack = message;
  if (thisK.props.field.type === 'file') {
    const file = e.target.files[0];
    if (file) {
      getBase64(file).then((data) => {
        stateClone.value = data;
        thisK.setState(stateClone);
      });
    } else {
      stateClone.value = '';
    }
  } else {
    stateClone.value = e.target.value;
  }
  thisK.setState(stateClone);
  if (handler1) {
    handler1(e, thisK);
  }
  if (handler2) {
    handler2(e, thisK);
  }
};

export const label = (thisK) => {
  const label = t(
    thisK.props.field.label,
    thisK.props.lanTable,
    thisK.props.lanState,
  );
  if (thisK.props.field.validation) {
    if (thisK.props.field.validation.requiered) {
      return (
        <>
          {label}
          <span style={{ color: 'red', fontSize: '2rem' }}> *</span>
        </>
      );
    }
    return label;
  }
  return label;
};

export const checkInputValiditiy = (thisK, style) => {
  let invalidMessage = null;
  let invalidInputStyle = null;
  if (!thisK.state.valid) {
    invalidMessage = (
      <div className={style.invalidMessage}>{thisK.state.invalidFeedBack}</div>
    );
    invalidInputStyle = style.invalidInput;
  }
  return [invalidMessage, invalidInputStyle];
};

export const reflectOuterState = (props, state) => {
  const updatedState = { ...state };
  if (state.lastPropValue !== props.field.value) {
    updatedState.value = props.field.value;
    updatedState.displayValue = props.field.value;
    updatedState.lastPropValue = props.field.value;
  }
  if (!props.field.readOnly && props.field.validity) {
    if (state.lastPropValid !== props.field.validity.valid) {
      updatedState.valid = props.field.validity.valid;
      updatedState.invalidFeedBack = props.field.validity.message;
      updatedState.lastPropValid = props.field.validity.valid;
    }
  }
  return updatedState;
};

export const handlePassIcon = (thisK, style) => {
  const passIconHandler = (e, id, disabled) => {
    if (!disabled) {
      const field = document.getElementById(id);
      // change the field type
      const typeAtr = field.getAttribute('type');
      if (typeAtr === 'text') {
        field.setAttribute('type', 'password');
        thisK.setState({ passIconOpen: true });
      } else {
        field.setAttribute('type', 'text');
        thisK.setState({ passIconOpen: false });
      }
      // toggle the icon
    }
  };
  /// *******************************************************8 */
  let passIcon = null;
  const classes = [style.eyeIcon];
  let disabled = false;
  if (!thisK.props.field.writability) {
    classes.push(style.disableIcon);
    disabled = true;
  }
  if (thisK.props.field.type === 'password') {
    let icon = faEye;
    if (thisK.state.passIconOpen || disabled) {
      icon = faEyeSlash;
    }
    passIcon = (
      <FontAwesomeIcon
        className={classes.join(' ')}
        onClick={(e) => {
          const { id } = thisK.props.field;
          return passIconHandler(e, id, disabled);
        }}
        icon={icon}
      />
    );
  }
  return passIcon;
};
