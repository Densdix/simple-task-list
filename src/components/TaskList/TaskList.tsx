import React, { useEffect } from "react"
import simpleResponse from '../../utils/sample-response.json'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { ITask, getTaskListThunk } from "../../redux/reducers/tasklistSlice"

const TaskList = () => {

    const todayTasksList = useAppSelector(state => state.tasklist.todayTasksList)
    const withinWeekTasksList = useAppSelector(state => state.tasklist.withinWeekTasksList)
    const overWeekTasksList = useAppSelector(state => state.tasklist.overWeekTasksList)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskListThunk())
    }, [])

    return (
        <div className="m-4">
            <div className="float-right">{new Date(Date.now()).toLocaleDateString()}</div>
            <div><h1 className="text-left font-bold py-4">Hi,</h1></div>
            <div><h2 className="text-left pb-4">Here's how your team's doing in terms of tasks:</h2></div>

            <div className="h-0.5 bg-black"></div>
            <div className="flex items-center py-1">
                <div className="float-left w-1/3 text-center flex justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-full text-center mr-1 inline-block"></div>
                    <span className="text-left font-bold text-xs inline-block">DUE TODAY</span>
                </div>
                <div className="float-left w-1/3 text-center flex justify-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full text-center mr-1 inline-block"></div>
                    <span className="text-left font-bold text-xs inline-block">WITHIN A WEEK</span>
                </div>
                <div className="float-left w-1/3 text-center flex justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-full text-center mr-1 inline-block"></div>
                    <span className="text-left font-bold text-xs inline-block">OVER A WEEK</span>
                </div>
            </div>
            <div className="h-0.5 bg-black"></div>

            <div className="">
                <div className="float-left w-1/3 text-center">
                    {todayTasksList.length !== 0 ? todayTasksList.map(el => <TaskCard
                        assignee={el.assignee}
                        due_date={el.due_date}
                        task_description={el.task_description}
                        task_name={el.task_name}
                        color={Color.Red}
                    />) : <NoTaskCard color={Color.Red}/>}
                </div>
                <div className="float-left w-1/3">
                    {withinWeekTasksList.length !== 0 ? withinWeekTasksList.map(el => <TaskCard
                        assignee={el.assignee}
                        due_date={el.due_date}
                        task_description={el.task_description}
                        task_name={el.task_name}
                        color={Color.Yellow}
                    />) : <NoTaskCard color={Color.Yellow} />}
                </div>
                <div className="float-left w-1/3">
                    {overWeekTasksList.length !== 0 ? overWeekTasksList.map(el => <TaskCard
                        assignee={el.assignee}
                        due_date={el.due_date}
                        task_description={el.task_description}
                        task_name={el.task_name}
                        color={Color.Green}
                        />) : <NoTaskCard color={Color.Green} />}
                </div>
            </div>
        </div>
    )
}

enum Color {
    Red = 1,
    Yellow = 2,
    Green = 3
}

export interface ITaskCard {
    assignee: string
    task_name: string
    task_description: string
    due_date: string
    color: Color
}

const TaskCard: React.FC<ITaskCard> = ({ assignee, due_date, task_description, task_name, color }) => {

    if (color === Color.Red) {
        return (
            <div className="border-2 rounded-full border-rose-500 w-1/2 max-md:w-full justify-center m-auto py-2 my-4">
                <div className="text-sm font-bold text-rose-500 text-left pl-5">{task_name}</div>
                <div className="text-xs text-rose-500 text-left pl-5">CD: {task_description}</div>
            </div>
        )
    } else if (color === Color.Yellow) {
        return (
            <div className="border-2 rounded-full border-yellow-500 w-1/2 max-md:w-full justify-center m-auto py-2 my-4">
                <div className="text-sm font-bold text-yellow-500 text-left pl-5">{task_name}</div>
                <div className="text-xs text-yellow-500 text-left pl-5">CD: {task_description}</div>
            </div>
        )
    } else {
        return (
            <div className="border-2 rounded-full border-green-500 w-1/2 max-md:w-full justify-center m-auto py-2 my-4">
                <div className="text-sm font-bold text-green-500 text-left pl-5">{task_name}</div>
                <div className="text-xs text-green-500 text-left pl-5">CD: {task_description}</div>
            </div>
        )
    }
}

const NoTaskCard: React.FC<{ color: Color }> = ({ color }) => {
    if (color === Color.Red) {
        return (
            <div className="border-2 rounded-full border-rose-500 w-1/2 max-md:w-full justify-center m-auto py-2 my-4">
                <div className="text-sm font-bold text-rose-500 text-left pl-5">No Tasks</div>
            </div>
        )
    }
    else if (color === Color.Yellow) {
        return (
            <div className="border-2 rounded-full border-yellow-500 w-1/2 max-md:w-full justify-center m-auto py-2 my-4">
                <div className="text-sm font-bold text-yellow-500 text-left pl-5">No Tasks</div>
            </div>
        )
    } else {
        return (
            <div className="border-2 rounded-full border-green-500 w-1/2 max-md:w-full justify-center m-auto py-2 my-4">
                <div className="text-sm font-bold text-green-500 text-left pl-5">No Tasks</div>
            </div>
        )
    }
}

export default TaskList