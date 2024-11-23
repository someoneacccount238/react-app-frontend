import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import "./WorkHoursInputForm.css";
import WorkHoursInputForm2 from "../WorkHoursInputForm2/WorkHoursInputForm2.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WorkHoursInputForm(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} disabled={props.disabled}>
        {props.workHours == " " ? " " : props.workHours}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper className="root containr">
          <WorkHoursInputForm2 day={props.day} date={props.date} />
        </Paper>
      </Modal>
    </div>
  );
}
