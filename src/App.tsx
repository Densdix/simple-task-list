import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, useAppSelector } from './redux/store';
import { Navigate, Outlet } from 'react-router-dom';



const App = () => {

  const isLogged = useSelector((state: RootState) => state.tasklist.isAuth)

  return (
    <>
      {isLogged
        ? <div className="App" >
          <div className='App-content'>
            <Outlet />
          </div>
        </div>
        : <Navigate to="/login" />}
    </>
  )
}

export default App;
