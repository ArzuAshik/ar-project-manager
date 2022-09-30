import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthCheck from './hooks/useAuthCheck';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import "./styles/style.css";


function App() {
  const login = useAuthCheck();

  if (!login) {
    return <Login />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to="/projects" />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick
        pauseOnHover
      />
    </DndProvider>
  );
}

export default App;
