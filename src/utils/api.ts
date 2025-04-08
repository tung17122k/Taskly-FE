
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

const loginApi = async ({ email, password }: IUserData) => {
    const URL_API = "/v1/api/login";
    const data: IUserData = {
        email,
        password,
    }

    try {
        const response = await axios.post(URL_API, data);
        return response.data;
    } catch (error: any) {
        console.log('error:', error.response.data);
        return error.response.data;
    }
}



export {
    createUserApi, loginApi
}