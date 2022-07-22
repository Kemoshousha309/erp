import React from 'react';
import {
  DialogTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@mui/material';
import { connect } from 'react-redux';
import { t } from '../../Helpers/lang';

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
            {t('yes', props.lanTable, props.lanState)}
          </Button>
          <Button onClick={() => props.handleClose(false)} color="primary" autoFocus>
            {t('no', props.lanTable, props.lanState)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
  token: state.auth.authData.token,
  languages: state.lang.langInfo,
});

export default connect(mapStateToProps, null)(AlertDialog);
