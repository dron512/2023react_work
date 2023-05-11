import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const emailinput = e => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const passwordInput = e => {
    setPassword(e.target.value);
  };

  const [token,setToken] = useState('');

  const signin = () => {
    axios.post(`http://localhost:9000/auth/signin`,{
      email,
      password
    }).then(
      result=>{
        setToken(result.data.token);
        localStorage.setItem('mytoken',result.data.token);
      }
    )
  };

  useEffect(()=>{
    axios.post(`http://localhost:9000/auth/login`,{
      mytoken:localStorage.getItem('mytoken')
    })
    .then(result=>{
      console.log(result);
      if( result.data.newToken ){
        localStorage.setItem('mytoken',result.data.newToken)
      }
      navigate('/mypage');
    })
    .catch(err=>{
      console.log(err.response.data.code);

    })
  },[token]);

  
  return (
    <div style={{padding: '1rem'}}>
      <h1>Login</h1>
      <div>
        <label>email</label>
        <input
          style={{display: 'block', width: '50%', height: '1.7rem'}}
          type="text"
          onChange={emailinput}
          value={email}
        />
      </div>
      <div>
        <label>password</label>
        <input
          style={{display: 'block', width: '50%', height: '1.7rem'}}
          type="text"
          onChange={passwordInput}
          value={password}
        />
      </div>
      <button
        onClick={signin}
        style={{padding: '0.5rem', marginTop: '0.5rem', fontSize: '1.2rem'}}
      >
        SIGNIN
      </button>
    </div>
  );
};
 
export default Login;