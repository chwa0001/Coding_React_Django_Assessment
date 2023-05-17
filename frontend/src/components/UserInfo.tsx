import { useState, useEffect,Dispatch,SetStateAction } from "react";
import UserAdmin from "../action/UserAdmin";
import User from "../types/User"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  OutlinedInput,
  MenuItem,
  FormControl,
  TextField,
  AlertColor
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {AccountCircle} from '@mui/icons-material';

interface CurrentData{
  //userdata
  userdata:User,
  setUserData:Dispatch<SetStateAction<User>>,

  //alert
  triggerAlert:(msg: string, alertType: AlertColor) => void,
}


export default function UserInfo(Appdata:CurrentData) {
  const [userInfos, setUserInfos] = useState<Array<User>>([]);
  const [open, setOpen] = useState(false);
  const [selectedUserid, setSelectedUserId] = useState<User>({id:0,username:''});
  const [newUser,setNewUser] = useState<string>('');
  
  useEffect(() => {
    UserAdmin.getUsers().then((response) => {
      setUserInfos(response.data.data);
    });
  }, [open]);

  const handleChange = (event: SelectChangeEvent) => {
    const user = userInfos.find(user=>user.id===Number(event.target.value))
    if (user != null){
      setSelectedUserId(user);
      setNewUser('');
    }
    else{
      setSelectedUserId({id:0,username:''});
      setNewUser('');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setNewUser('');
    }
  };

  const handleOk = () => {
    if(newUser!=='' && selectedUserid.id===0){
      UserAdmin.createUser(newUser).then((response) => {
        Appdata.setUserData(response.data.data);

        Appdata.triggerAlert(`New User ${newUser} is created successfully!`,"success");
      })
      .catch((err) => {
        Appdata.triggerAlert(String(err),"error");
      });;
    }
    else{
      Appdata.setUserData(selectedUserid);
      Appdata.triggerAlert(`${selectedUserid.username} is login successfully!`,"success");
    }
    setOpen(false);

  };

  return (
      <Box alignSelf="center" sx={{my:2}}>
      <Button onClick={handleClickOpen}>{Appdata.userdata.id===0?"Select User":`Login by ${Appdata.userdata.username}`}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }} flexDirection="column">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Age</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={String(selectedUserid.id)}
                onChange={handleChange}
                input={<OutlinedInput label="Username" />}
              >
                <MenuItem value="0">
                  <em>Select this to create user</em>
                </MenuItem>
                {userInfos.length===0?null:
                  userInfos.map((value)=>{
                    return(
                      <MenuItem key={value.id} value={String(value.id)}>{value.username}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField disabled={selectedUserid.id===0?false:true}
              id="input-with-sx"
              label="Create User"
              variant="standard"
              onChange={(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setNewUser(event.target.value)}}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
      </Box>
  );
}
