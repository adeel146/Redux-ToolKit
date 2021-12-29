import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import AlertDialog from "./Dialog";
import { addDoc, collection, onSnapshot,query,orderBy, serverTimestamp } from "firebase/firestore";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import db from "../FireBase";
import EditDialog from "./EditDialog";

const BasicTable = () => {
  const [data, setdata] = useState([]);
  const [input, setinput] = useState("");

  useEffect(() => {
    const collectionRef = collection(db, "Todo");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);
  
  let SN = 0;

  const addtodo = async () => {
    const documentReference = collection(db, "Todo");
    const payload = { name: input,timestamp:serverTimestamp() };
    await addDoc(documentReference, payload);
  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <TextField
          onChange={(e) => setinput(e.target.value)}
          value={input}
        ></TextField>

        <Button
          size="large"
          variant="contained"
          style={{ height: "55px" }}
          endIcon={<SendIcon />}
          onClick={() => {
            addtodo();
            setinput("");
          }}
        >
          addDoc
        </Button>
      </div>
      <div style={{ margin: "100px 300px 0 300px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              Width: 650,
              backgroundColor: "cornflowerblue",
              borderRadius: "10px",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Serial Number</TableCell>
                <TableCell align="right" >Todo Task</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {SN++}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <IconButton>
                      <AlertDialog id={row.id} />
                    </IconButton>
                    <IconButton >
                      <EditDialog id={row.id} name={row.name} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default BasicTable;
