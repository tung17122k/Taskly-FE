
import axios from "./axios.customize"



const createUserApi = ({ username, email, password }: IUserData) => {
    const URL_API = "/v1/api/register";
    const data: IUserData = {
        username,
        email,
        password,
    }
    return axios.post(URL_API, data);
}

export {
    createUserApi
}