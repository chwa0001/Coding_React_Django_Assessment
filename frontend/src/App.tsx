import { useState} from "react";
import {
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  AlertColor,
  Tabs,
  Tab,
} from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CollectionsIcon from '@mui/icons-material/Collections';

//types
import User from "./types/User";

// Components
import ImageGallery from "./components/ImageGallery";
import ImageUpload from "./components/ImageUpload";
import UserInfo from "./components/UserInfo";

export function App() {
  const [currentUserid, setCurrentUserId] = useState<User>({id:0,username:''});
  const [message, setMessage] = useState<string>("");
  const [popup,setPopup] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const triggerAlert = (msg:string,alertType:AlertColor) =>{
    setMessage(msg);
    setSeverity(alertType);
    setPopup(true);
  }

  const handleSelectedTab = (event: React.SyntheticEvent, tabValue: number) => {
    if (currentUserid.id===0)
    {
      setSelectedTab(0);
      triggerAlert("Please login your username!", "warning");
      return
    }
    setSelectedTab(tabValue);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          maxHeight:"100vh",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleSelectedTab}
          variant="fullWidth"
          centered
          >
          <Tab label={<Typography>Upload Image</Typography>} icon={<AddToPhotosIcon/>} iconPosition="end"/>
          <Tab label={<Typography>View Image</Typography>} icon={<CollectionsIcon/>} iconPosition="end"/>
        </Tabs>
        {
          selectedTab===0?
          <ImageUpload userdata={currentUserid} setUserData={setCurrentUserId} triggerAlert={triggerAlert}/>
          :null
        }
        {
          selectedTab===1?
          <ImageGallery userdata={currentUserid} setUserData={setCurrentUserId} triggerAlert={triggerAlert}/>
          :null
        }
        
        <UserInfo userdata={currentUserid} setUserData={setCurrentUserId} triggerAlert={triggerAlert} />

        <Snackbar open={popup} autoHideDuration={3000} onClose={()=>{setPopup(false)}}>
          <Alert onClose={()=>{setPopup(false)}} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}