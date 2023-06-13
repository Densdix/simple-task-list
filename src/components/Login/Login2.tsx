import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import tasklistSlice, { setAuth } from "../../redux/reducers/tasklistSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import style from "./Login.module.css"

type Inputs = {
    login: string,
    password: string,
  };

const Login2 = () => {
    const isLogged = useSelector((state: RootState) => state.tasklist.isAuth)
    const dispatch = useAppDispatch()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        if(data.login === "guest" && data.password === "admin"){
            dispatch(setAuth(true))
        }
    }

    // useEffect(() => {
    //     dispatch(setAuth(true))
    // }, [])

    return (
        <>
            {!isLogged ?
            <div className={style.content}>
            <div className="flex min-h-full flex justify-center px-6 py-12 lg:px-8">
                <div className={style.header}>
                    <h2 className="text-3xl text-white select-none ">Logo</h2>
                    <nav className={style.navigation}>
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Contact</a>
                        <button className={style.btnLogin}>Login</button>
                    </nav>
                </div>
                {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div> */}
                <div className={style.wrapper}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("login", { required: true })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                
                            </div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("password", { required: true })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center font-semibold text-sm text-green-500">
                    username: guest{' '}
                        <p className="font-semibold leading-6 text-indigo-600">
                        password: admin
                        </p>
                    </p>
                </div></div>
            </div></div>
            : <Navigate to="/" />}
        </>
    )
}

export default Login2