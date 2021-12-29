import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import db from "../FireBase"
import { TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";

const EditDialog = ({id,name}) => {
    const [value, setvalue] = useState(name)
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const editDoc = async () => {
    const docref = doc(db, "Todo", id);
    const payload = {name:value };
    await updateDoc(docref, payload);
  };

  return (
    <div>
      
        <EditIcon onClick={()=>{handleClickOpen()}}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Change Todo Task.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
            <TextField value={value} onChange={(e)=>setvalue(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{handleClose();  editDoc()}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditDialog;
