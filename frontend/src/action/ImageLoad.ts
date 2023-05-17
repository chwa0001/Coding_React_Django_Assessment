import request from "../request";

const getImageList = (userid:number) : Promise<any> => {
    return request.get(`/userimage?userid=${userid}`);
};

const ImageLoad = {
    getImageList,
  };

export default ImageLoad;