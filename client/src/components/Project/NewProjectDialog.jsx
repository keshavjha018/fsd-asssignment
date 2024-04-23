import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner from '../Others/LoadingSpinner';

export default function NewProjectDialog({
  openNewProjectDialog,
  setOpenNewProjectDialog,
  handleNewProject
}) {

  const [projName, setProjName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleClose = () => {
    setOpenNewProjectDialog(false);
  };

  return (
    <>
      <Dialog
        open={openNewProjectDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            event.preventDefault();
            setIsCreating(true);
            await handleNewProject(projName);
            setIsCreating(false);
            handleClose();
          },
        }}
      >
        <DialogTitle> Name of your new project </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Project Title"
            type="text"
            fullWidth
            variant="standard"
            value={projName}
            onChange={(e)=> setProjName(e.target.value)}
          />
        </DialogContent>
        {!isCreating ?
          <DialogActions>
            <Button onClick={handleClose} style={{color: 'black'}} >Cancel</Button>
            <Button type="submit" style={{color: 'black'}}> Create </Button>
          </DialogActions>
          :
          <LoadingSpinner />
        }
      </Dialog>
    </>
  );
}