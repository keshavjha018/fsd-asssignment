import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner from '../../components/Others/LoadingSpinner';
import AuthContext from '../../Contexts/AuthContext';
import DialogContentText from '@mui/material/DialogContentText';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function EditProfile({user, setShowDialog, showDialog}) {

  const {setUser} = useContext(AuthContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };

  async function handleUpdateProfile() {
    try {
      setIsUpdating(true);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/update`, {
        id: user.id,
        name: name,
        email: email
      });

      if (true == res?.data?.success) {
        toast.success("Profile Updated");
        // Store User data in LocalStorage & Context
        let userInfoData = {
          id: user.id,
          email: email,
          name: name
        }
        localStorage.setItem("user", JSON.stringify(userInfoData));
        setUser(userInfoData);
        setIsUpdating(false);
      } 
      else {
        toast.error("Profile Save Failed");
        setIsUpdating(false);
        return;
      }

    } catch(err) {
      setIsUpdating(false)
      console.log(err);
      toast.error("server error")
    }
  }

  return (
    <>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            event.preventDefault();
            await handleUpdateProfile();
            handleClose();
          },
        }}
        fullWidth
      >
        <DialogTitle> Edit Profile </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </DialogContent>
        
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </DialogContent>

        {!isUpdating ?
          <DialogActions>
            <Button onClick={handleClose} style={{color: 'black'}} >Cancel</Button>
            <Button type="submit" style={{color: 'black'}}> Update </Button>
          </DialogActions>
          :
          <LoadingSpinner />
        }
      </Dialog>
    </>
  );
}