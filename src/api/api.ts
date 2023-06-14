import axios, {AxiosResponse} from "axios";

const axInstance = axios.create({
    baseURL: 'https://lowebot.azurewebsites.net/api',
    withCredentials: true
})

export const axiosGetTaskListData = async () => {

    return axInstance.get(`az_http_tasks?code=NDbxgThJzSuakM7LuFMZMQEdl2B_mUjEDxL7PrK5KH9TAzFureY-rw==`).then((response: any) => {
        console.log(response)
        return response.data
    })
}   