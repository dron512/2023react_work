import axios from 'axios';
import React, {memo, useContext, useState} from 'react';
import {selectContext} from '../App';

const UserInsert = () => {
    const {ok, setOk} = useContext(selectContext);

  const [email, setEmail] = useState('');
  const emailinput = e => {
    setEmail(e.target.value);
  };

  const [name, setName] = useState('');
  const nameInput = e => {
    setName(e.target.value);
  };

  const [password, setPassword] = useState('');
  const passwordInput = e => {
    setPassword(e.target.value);
  };

  const dosave = () => {
    axios
      .post(`http://localhost:9000/users/insert`, {
        email,
        name,
        password,
      })
      .then(() => {
        setOk(result => {
          if (result === 'select 완료' || result === '')
            return '등록되었습니다.';
          else return result + '!';
        });
        setEmail('');
        setName('');
        setPassword('');
      })
      .catch(e => {
        setOk('email 중복입니다.등록실패');
      });
  };
  return (
    <>
      <div>
        <h1>insert</h1>
      </div>
      <div>
        <div>
          <label>email</label>
          <input className='form-control' type="email" onChange={emailinput} value={email} />
        </div>
        <div>
          <label>name</label>
          <input className='form-control' type="text" onChange={nameInput} value={name} />
        </div>
        <div>
          <label>password</label>
          <input className='form-control' type="password" onChange={passwordInput} value={password} />
        </div>
        <button className='btn btn-primary my-3' onClick={dosave}>insert</button>
        <h1>{ok}</h1>
      </div>
    </>
  );
};
 
export default memo(UserInsert);