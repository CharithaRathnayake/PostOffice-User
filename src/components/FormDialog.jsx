import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../App.css";


export default function FormDialog() {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit=()=>{
    setOpen(false);
  }

  return (
    <div className="Map">
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Enter Your Post ID
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Your Post ID"
            type="text"
            fullWidth
            variant="standard"
          />
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit"onClick={handleSubmit}>Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}