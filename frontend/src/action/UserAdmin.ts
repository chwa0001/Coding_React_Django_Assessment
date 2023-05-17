import request from "../request";
import Cookies from 'js-cookie';


const createUser = (username:string):Promise<any> => {
    const jsonData = JSON.stringify({
        username : username,
    })

    return request.post("/createUser", jsonData, {
        headers: {
         "Content-Type": "application/json",
        "X-CSRFToken" : Cookies.get('csrftoken'),
        }
    });
}

const getUsers = () : Promise<any> => {
    return request.get("/getUsers");
};

const UserAdmin = {
    createUser,
    getUsers,
  };
  
export default UserAdmin;