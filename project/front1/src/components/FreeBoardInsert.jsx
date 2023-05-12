import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {selectContext} from '../App';

const FreeBoardInsert = () => {
  const {ok, setOk} = useContext(selectContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setCotent] = useState('');

  const [file, setFile] = useState(null);

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  const emailInput = e => {
    setEmail(e.target.value);
  };
  const titlelInput = e => {
    setTitle(e.target.value);
  };
  const contentInput = e => {
    setCotent(e.target.value);
  };
  const nameInput = e => {
    setName(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`http://localhost:9000/auth/login`, {
        mytoken: localStorage.getItem('mytoken'),
      })
      .then(result => {
        if (result.data.newToken) {
          localStorage.setItem('mytoken', result.data.newToken);
        }
        setName(result.data.decoded.name);
        setEmail(result.data.decoded.email);
      })
      .catch(err => {
        console.log(err);
        navigate('/login/세션이만료되어로그인하셔야됩니다.');
      });
  }, []);

  const write = () => {
    const formData = new FormData();
    formData.set('file', file);
    formData.set('title', title);
    formData.set('email', email);
    formData.set('content', content);
    formData.set('name', name);

    axios
      .post('http://localhost:9000/file/upload', formData)
      .then(result => {
        console.log(result);
        setOk('등록성공');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <>
      <div>
        <label>title</label>
        <input
          style={{display: 'block', width: '50%', height: '1.7rem'}}
          type="text"
          onChange={titlelInput}
          value={title}
        />
      </div>
      <div>
        <label>content</label>
        <textarea
          rows="10"
          style={{display: 'block', width: '75%'}}
          type="text"
          onChange={contentInput}
          value={content}
        ></textarea>
      </div>
      <div>
        <label>name</label>
        <input
          style={{display: 'block', width: '50%', height: '1.7rem'}}
          type="text"
          onChange={nameInput}
          value={name}
        />
      </div>
      <div>
        <label>email</label>
        <input
          style={{display: 'block', width: '50%', height: '1.7rem'}}
          type="text"
          onChange={emailInput}
          value={email}
        />
      </div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={write}
        style={{padding: '0.5rem', marginTop: '0.5rem', fontSize: '1.2rem'}}
      >
        Write
      </button>
    </>
  );
};
 
export default FreeBoardInsert;