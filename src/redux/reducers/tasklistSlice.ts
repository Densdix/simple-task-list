import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import simpleResponse from '../../utils/sample-response.json'

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
    overWeekTasksList: ITask[]
}

const initState: initStateType = {
    isAuth: false,
    todayTasksList: [],
    withinWeekTasksList: [],
    overWeekTasksList: []
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
        }
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

// Extract the action creators object and the reducer
const { actions, reducer } = tasklistSlice
// Extract and export each action creator by name
export const { setAuth, setTodayTasksList, setoverWeekTasksList, setwithinWeekTasksList } = actions
// Export the reducer, either as a default or named export
export default reducer