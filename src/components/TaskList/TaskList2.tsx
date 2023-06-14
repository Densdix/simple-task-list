import React, { useEffect, useState } from "react"
import simpleResponse2 from './../../utils/sample-response-v2.json'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getTaskList2Thunk, setResponse } from "../../redux/reducers/tasklistSlice"

const TaskList2 = () => {
    const simpleResponse = useAppSelector(state => state.tasklist.response2)
    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index: number) => {
        console.log(index)
        setToggleState(index)
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        // const tempResponse = {...simpleResponse2}
        // let timeStamp= 1807110465663
        // Object.entries(tempResponse).map(el => el[1].tasks.map(el => el.due_date = new Date(+el.due_date * 1000).toLocaleDateString()))
        dispatch(getTaskList2Thunk())
        // console.log(simpleResponse2)
        // console.log(Object.entries(simpleResponse2).at(1))
    }, [])

    return (
        <div className="w-full h-screen">
            <div className="flex justify-center flex-wrap mt-3">
                {Object.entries(simpleResponse).
                    map((el, index) => <div
                        onClick={() => toggleTab(index)}
                        style={{ background: el[1].colour === "red" ? "rgb(244 63 94)" : el[1].colour === "yellow" ? "rgb(234 179 8)" : "rgb(34 197 94)" }}
                        className={toggleState === index ? "border border-white cursor-pointer p-2 text-white" : "cursor-pointer p-2 text-white"}>{el[0]}
                    </div>)}
            </div>
            <div className="bg-gray-200 m-3 p-2 mb-5 h-full">
                <div className="text-left text-5xl font-bold text-black">{Object.entries(simpleResponse2).at(toggleState)?.[0]}</div>
                <div className="pt-2">
                    <div className="">{Object.entries(simpleResponse).at(toggleState)?.[1].tasks
                        .map(el => <TaskCard
                            task_name={el.task_name}
                            task_description={el.task_description}
                            due_date={el.due_date}
                            received_date={el.received_date}
                            colour={el.colour} />)}</div>
                </div>
            </div>

        </div>
    )
}

export interface ITaskCard {
    task_name: string
    task_description: string
    due_date: string
    received_date: string
    colour: string
}

const TaskCard: React.FC<ITaskCard> = ({ due_date, received_date, task_description, task_name, colour }) => {

    if (colour === "red") {
        return (
            <div className="bg-rose-500 max-md:w-full justify-center m-auto flex py-1 my-2">
                <div className="w-8/12 text-sm font-bold text-white text-left pl-5 m-auto">{task_name}</div>
                <div className="w-2/12 text-xs text-white text-left pl-5 m-auto">{received_date}</div>
                <div className="w-2/12 text-xs text-white text-left pl-5 m-auto">{due_date}</div>
            </div>
        )
    } else if (colour === "yellow") {
        return (
            <div className="bg-yellow-500 max-md:w-full justify-center m-auto flex py-1 my-2">
                <div className="w-8/12 text-sm font-bold text-white text-left pl-5 m-auto">{task_name}</div>
                <div className="w-2/12 text-xs text-white text-left pl-5 m-auto">{received_date}</div>
                <div className="w-2/12 text-xs text-white text-left pl-5 m-auto">{due_date}</div>
            </div>
        )
    } else {
        return (
            <div className="bg-green-500 max-md:w-full justify-center m-auto flex py-1 my-2">
                <div className="w-8/12 text-sm font-bold text-white text-left pl-5 m-auto">{task_name}</div>
                <div className="w-2/12 text-xs text-white text-left pl-5 m-auto">{received_date}</div>
                <div className="w-2/12 text-xs text-white text-left pl-5 m-auto">{due_date}</div>
            </div>
        )
    }
}

export default TaskList2