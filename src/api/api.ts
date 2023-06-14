import axios, {AxiosResponse} from "axios";
import simpleResponse2 from '../utils/sample-response-v2.json'

const axInstance = axios.create({
    baseURL: 'https://lowebot.azurewebsites.net/api',
    headers: {"Access-Control-Allow-Origin": "*"}
})

export const axiosGetTaskListData = async () => {

    return axInstance.get(`az_http_tasks?code=NDbxgThJzSuakM7LuFMZMQEdl2B_mUjEDxL7PrK5KH9TAzFureY-rw==`).then((response: any) => {
        console.log(response)
        return response.data as typeof simpleResponse2
    })
}   