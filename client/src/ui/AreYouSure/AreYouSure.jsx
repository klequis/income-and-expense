import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AreYouSure = ({ open, onYesAction, onNoAction }) => {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        onClose={onNoAction}
      >
        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onNoAction()} >
            No
          </Button>
          <Button onClick={() => onYesAction()}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AreYouSure