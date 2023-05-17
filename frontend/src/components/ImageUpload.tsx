import { useState, Dispatch,SetStateAction} from "react";
import FileUpload from "../action/FileUpload";
import User from "../types/User";
import {
  Button,
  Grid,
  LinearProgress,
  AlertColor
} from "@mui/material";
import Dropzone from 'react-dropzone';
import {styled} from '@mui/material/styles';

interface CurrentData{
  //userdata
  userdata:User,
  setUserData:Dispatch<SetStateAction<User>>,

  //alert
  triggerAlert:(msg: string, alertType: AlertColor) => void,
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function ImageUpload(Appdata:CurrentData){
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);


    const clearPreview = () => {
      setCurrentImage(undefined);
      setPreviewImage('');
      setProgress(0);
      Appdata.triggerAlert("Preview is cleared! Please select another image!","success");
    }

    const confirmSelected = (file:File)=>{
      if (['image/png','image/jpeg','image/svg'].includes(file.type)){
      setCurrentImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setProgress(0);
      Appdata.triggerAlert('Image was selected','info');
      }
      else{
        Appdata.triggerAlert('Incorrect file was selected! Allow file type is png,jpeg and svg.','error');
      }
    }

    const upload = () => {
        setProgress(0);
        if (!currentImage) return;
        FileUpload.upload(currentImage,currentImage.name,Appdata.userdata.id, (event: any) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        }).catch((err) => {
            setProgress(0);
    
            if (err.response && err.response.data && err.response.data.message) {
              Appdata.triggerAlert(err.response.data.message,"error");
            } else {
              Appdata.triggerAlert("Could not upload the Image!","error");
            }
          });

          clearPreview();
      };

      return (
        <Grid container spacing={2} direction="column" justifyContent="center">
          <Grid item xs>
            <Dropzone onDrop={acceptedFiles => confirmSelected(acceptedFiles?.[0])}>
              {({getRootProps, getInputProps}) => (
                <Button disabled={Appdata.userdata.id===0?true:false} {...getRootProps()} fullWidth sx={{height:"50vh"}}>
                  <input {...getInputProps()} />
                  <p>Drag and drop an image here, or click to select image</p>
                </Button>
              )}
            </Dropzone>
          </Grid>
          {previewImage && (
            <>
            <Grid item xs>
               <LinearProgress variant="determinate" value={progress} />
            </Grid>
            <Grid item xs>
              <Img className="preview" src={previewImage} alt="" />
            </Grid>
            </>
          )}
          <Grid item xs alignSelf="center">
            <Button
                  disabled={!currentImage}
                  onClick={upload}
            >
                  Upload
            </Button>
            <Button
                  disabled={!currentImage}
                  onClick={clearPreview}
            >
                  Clear
            </Button>
          </Grid>
        </Grid>
      );

}


export default ImageUpload;