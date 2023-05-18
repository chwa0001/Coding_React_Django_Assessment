import { useEffect,useState, Dispatch,SetStateAction} from "react";
import ImageLoad from "../action/ImageLoad";
import User from "../types/User";
import {
 ImageList,
 ImageListItem,
 ImageListItemBar,
 AlertColor,
} from "@mui/material";
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
  maxWidth: '80%',
  maxHeight: '80%',
});

interface Image{
    datetime:string,
    imagename:string,
    imageid:number,
}

export default function ImageGallery(Appdata:CurrentData){
    const [imageList,setImageList] = useState<Array<Image>>([]);
    useEffect(() => {
        ImageLoad.getImageList(Appdata.userdata.id).then((response) => {
        if(!response.data)
        {
          Appdata.triggerAlert("No images retrieved from database!","warning");
          setImageList([]);
        }
        else
        {
          setImageList(response.data.images);
        }
        }).catch((err) => {
          Appdata.triggerAlert("Error to retrieve images!","error")
        })
    }, [Appdata.userdata.id]);

    return (
    <ImageList>
      <ImageListItem key="Subheader" cols={2} sx={{margin:2}}/>
      {imageList.length===0?null:imageList.map((item) => (
        <ImageListItem key={item.imageid}>
          <Img
            src={`/image?imageid=${item.imageid}`}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.imagename}
            subtitle={item.datetime}
          />
        </ImageListItem>
      ))}
    </ImageList>
    );
}
