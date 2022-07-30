import React from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { t } from "../../Languages/languages";

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
            {t("yes")}
          </Button>
          <Button
            onClick={() => props.handleClose(false)}
            color="primary"
            autoFocus
          >
            {t("no")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
