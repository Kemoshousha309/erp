import { Component } from 'react';
import { Button } from '@mui/material';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import style from './SystemCommands.module.scss';
import { t } from '../../../Languages/languages';

class Command extends Component {
  render() {
    const {
      props: {
        lanState, children, excute,
      },
    } = this;
    let dirStyle = style.ltr;
    if (parseInt(lanState) === 1) {
      dirStyle = style.rtl;
    }
    return (
      <div className={[style.command, dirStyle].join(' ')}>
        <div className={style.commandContent}>{children}</div>
        <Button onClick={excute} variant="contained" color="primary">
          {t('excute')}
        </Button>
        <FontAwesomeIcon className={style.icon} icon={faPaperPlane} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
});

export default connect(mapStateToProps, null)(Command);
