import request from "../request";
import Cookies from 'js-cookie';

const upload = (file: File,filename:string,userid:number, onUploadProgress: any): Promise<any> => {
    let formData = new FormData();
    
    let jsonData = new Blob([
      JSON.stringify({
        userid: userid,
        filename: filename,
      })
    ],{
      type: 'application/json'
    });

    formData.append("file", file,filename);
    formData.append("document", jsonData);
  
    return request.post("/upload", formData, {
      headers: {
       "Content-Type": "multipart/form-data",
      "X-CSRFToken" : Cookies.get('csrftoken'),
      },
      onUploadProgress,
    });
  };
  
const getFiles = () : Promise<any> => {
    return request.get("/files");
  };
  
const FileUpload = {
    upload,
    getFiles,
  };
  
export default FileUpload;