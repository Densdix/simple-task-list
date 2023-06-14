import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import simpleResponse from '../../utils/sample-response.json'
import simpleResponse2 from '../../utils/sample-response-v2.json'
import { axiosGetTaskListData } from "../../api/api";

export interface ITask {
    assignee: string
    task_name: string
    task_description: string
    due_date: string
}

type initStateType = {
    isAuth: boolean,
    todayTasksList: ITask[]
    withinWeekTasksList: ITask[]
    overWeekTasksList: ITask[],
    response2: typeof simpleResponse2
}

const initState: initStateType = {
    isAuth: false,
    todayTasksList: [],
    withinWeekTasksList: [],
    overWeekTasksList: [],
    response2: {} as typeof simpleResponse2
}

const tasklistSlice = createSlice({
    name: "tasklist",
    initialState: initState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setTodayTasksList: (state, action: PayloadAction<ITask[]>) => {
            state.todayTasksList = action.payload
        },
        setwithinWeekTasksList: (state, action: PayloadAction<ITask[]>) => {
            state.withinWeekTasksList = action.payload
        },
        setoverWeekTasksList: (state, action: PayloadAction<ITask[]>) => {
            state.overWeekTasksList = action.payload
        },
        setResponse: (state, action: PayloadAction<typeof simpleResponse2>) => {
            state.response2 = action.payload
        },
    }
})

export const getTaskListThunk = () => async (dispatch: Dispatch, getState: () => RootState) => {

    const todayTasks: ITask[] = []
    const withinWeekTasks: ITask[] = []
    const overWeekTasks: ITask[] = []
    
    const dayInMillis = 24 * 60 * 60 * 1000
    const weekInMillis = dayInMillis * 7
    //axios mock
    await simpleResponse.map(el => {
        if (Date.now() - +el.due_date * 1000 < dayInMillis) {
            todayTasks.push(el)
        } else if (Date.now() - +el.due_date * 1000 < weekInMillis) {
            console.log("Date.now() - +el.due_date * 1000", Date.now() - +el.due_date * 1000)
            console.log("weekInMillis", weekInMillis)
            withinWeekTasks.push(el)
        } else {
            console.log("3")
            overWeekTasks.push(el)
        }
    })
    dispatch(setTodayTasksList(todayTasks))
    dispatch(setwithinWeekTasksList(withinWeekTasks))
    dispatch(setoverWeekTasksList(overWeekTasks))
}

export const getTaskList2Thunk = () => async (dispatch: Dispatch, getState: () => RootState) => {    
    axiosGetTaskListData().then(data => {
        let tempResponse2 = {...data}
        Object.entries(data).map(el => el[1].tasks.map(el => el.due_date = new Date(+el.due_date * 1000).toLocaleDateString().slice(0, 5)))
        Object.entries(tempResponse2).map(el => el[1].tasks.map(el => el.received_date = new Date(+el.received_date * 1000).toLocaleDateString().slice(0, 5)))
        dispatch(setResponse(tempResponse2))
    })
}

// Extract the action creators object and the reducer
const { actions, reducer } = tasklistSlice
// Extract and export each action creator by name
export const { setAuth, setTodayTasksList, setoverWeekTasksList, setwithinWeekTasksList, setResponse } = actions
// Export the reducer, either as a default or named export
export default reducer