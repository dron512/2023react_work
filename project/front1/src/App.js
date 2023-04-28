import './App.css';
import React, {createContext, useState} from 'react';
import MyNav from './components/MyNav';
import User from './components/User';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './components/FreeBoard';

export const selectContext = createContext();

function App() {
  const [ok, setOk] = useState('');
  return (
    <>
      <MyNav/>
      <selectContext.Provider value={{ok, setOk}}>
        <Routes>
          <Route path='user' element={<User/>}></Route>
          <Route path='freeboard' element={<FreeBoard/>}></Route>
        </Routes>
      </selectContext.Provider>
    </>
  );
}

export default App;
