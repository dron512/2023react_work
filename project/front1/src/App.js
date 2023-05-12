import './App.css';
import React, {createContext, useState} from 'react';
import MyNav from './components/MyNav';
import User from './components/User';
import {Route, Routes} from 'react-router-dom';
import FreeBoard from './components/FreeBoard';
import Login from './components/Login';
import MyPage from './components/MyPage';

export const selectContext = createContext();

function MyFontSize() {
  const doBigger = () => {
    const html = document.documentElement;
    const style = window.getComputedStyle(html);
    html.style.fontSize = parseInt(style.fontSize) + 1 + 'px';
  };
  const doSmaller = () => {
    const html = document.documentElement;
    const style = window.getComputedStyle(html);
    html.style.fontSize = parseInt(style.fontSize) - 1 + 'px';
  };

  return (
    <div style={{textAlign: 'center', paddingTop: '50px'}}>
      <h1>전체 글자크기 바꾸기</h1>
      <button className='border m-1' style={{width: '50px', height: '50px'}} onClick={doBigger}>
        +
      </button>
      <button className='border m-1' style={{width: '50px', height: '50px'}} onClick={doSmaller}>
        -
      </button>
    </div>
  );
}

function App() {
  const [ok, setOk] = useState('User 추가해주세요');
  return (
    <>
      <MyNav />
      <selectContext.Provider value={{ok, setOk}}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <h1 className='p-2'>메뉴를 클릭해주세요</h1>
                <MyFontSize />
              </>
            }
          ></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/freeboard" element={<FreeBoard />}></Route>
          <Route path="/login" element={<Login />}>
            <Route path=":info" element={<h1>Test</h1>} />
          </Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </selectContext.Provider>
    </>
  );
}

export default App;
