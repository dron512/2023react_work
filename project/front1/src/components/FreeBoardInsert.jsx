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
      <div className="m-1">
        <label>title</label>
        <input
          className="form-control"
          type="text"
          onChange={titlelInput}
          value={title}
        />
      </div>
      <div className="m-1">
        <label>content</label>
        <textarea
          rows="10"
          className="form-control"
          type="text"
          onChange={contentInput}
          value={content}
        ></textarea>
      </div>
      <div className="m-1">
        <label>name</label>
        <input
          className="form-control"
          type="text"
          onChange={nameInput}
          value={name}
        />
      </div>
      <div className="m-1">
        <label>email</label>
        <input
          className="form-control"
          type="text"
          onChange={emailInput}
          value={email}
        />
      </div>
      <div className="d-flex justify-contnet-end m-3">
        <input type="file" onChange={handleFileChange} className='btn btn-primary me-3'/>
        <button onClick={write} className="btn btn-primary">
          Write
        </button>
      </div>
    </>
  );
};
 
export default FreeBoardInsert;