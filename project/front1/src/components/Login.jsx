import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
const Login = () => {
  const params = useParams();
  const [myinfo, setMyinfo] = useState(params.info);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const emailinput = e => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState('');
  const passwordInput = e => {
    setPassword(e.target.value);
  };

  const [token, setToken] = useState('');

  const signin = () => {
    axios
      .post(`http://localhost:9000/auth/signin`, {
        email,
        password,
      })
      .then(result => {
        setToken(result.data.token);
        localStorage.setItem('mytoken', result.data.token);
      });
  };

  useEffect(() => {
    axios
      .post(`http://localhost:9000/auth/login`, {
        mytoken: localStorage.getItem('mytoken'),
      })
      .then(result => {
        console.log(result);
        if (result.data.newToken) {
          localStorage.setItem('mytoken', result.data.newToken);
        }
        navigate('/mypage');
      })
      .catch(err => {
        console.log(err.response.data.code);
      });
  }, [token]);

  return (
    <div style={{padding: '1rem'}}>
      <h1>Login</h1>
      <div>
        <label>email</label>
        <input
          className="form-control"
          type="text"
          onChange={emailinput}
          value={email}
        />
      </div>
      <div>
        <label>password</label>
        <input
          className="form-control"
          type="text"
          onChange={passwordInput}
          value={password}
        />
      </div>
      <button onClick={signin} className="btn btn-primary mt-3">
        SIGNIN
      </button>
      <h1>{myinfo}</h1>
    </div>
  );
};
 
export default Login;