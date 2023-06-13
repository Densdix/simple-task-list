import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import Login from './components/Login/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList2 from './components/TaskList/TaskList2';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskList2 />
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "*",
    element: <Navigate to="/" />
  },
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
