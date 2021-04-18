import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { t } from '../../utilities/lang';


function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose(true)} color="secondary">
            {t("yes", props.lanTable, props.lanState)}
          </Button>
          <Button onClick={() => props.handleClose(false)} color="primary" autoFocus>
            {t("no", props.lanTable, props.lanState)}  
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      lanState: state.lang.lan,
      lanTable: state.lang.langTables,
      token: state.auth.authData.token,
      languages: state.lang.langInfo
  }
}

export default connect(mapStateToProps, null)(AlertDialog);

