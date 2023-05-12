import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyPage = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`http://localhost:9000/auth/login`, {
        mytoken: localStorage.getItem('mytoken'),
      })
      .then(result => {
        if( result.data.newToken ){
          localStorage.setItem('mytoken',result.data.newToken)
        }
        setName(result.data.decoded.name);
        setEmail(result.data.decoded.email);
      })
      .catch(err => {
        console.log(err);
        navigate('/login/세션이만료되어로그인하셔야됩니다.');
      });
  }, []);

  return (
    <div style={{padding: '1rem'}}>
      <h1>MyPage</h1>
      <MyContent>
        <MyPageH2>나의정보</MyPageH2>
        <label>EMAIL</label>
        <p>{email}</p>
        <label>NAME</label>
        <p>{name}</p>
      </MyContent>
    </div>
  );
};
 
export default MyPage;

const MyPageH2 = styled.h1`
  margin: .5rem;
`
const MyContent = styled.div`
  padding: .5rem;
`