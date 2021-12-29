import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import db from "../FireBase"
import { doc, deleteDoc } from "firebase/firestore";

const AlertDialog = ({id}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DeleteDoc = async () => {
    const docref = doc(db, "Todo",id );
    await deleteDoc(docref);
  };

  return (
    <div>
        <DeleteIcon onClick={()=>{handleClickOpen()}}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you Sure"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This task will be deleted permanently .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>{handleClose();  DeleteDoc()}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
