import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const MyNav = () => {
  const navigate = useNavigate();
  const [mystyle, setMystyle] = useState({
    visibility: '',
  });
  const menu = () => {
    setMystyle(e => {
      return e.visibility === ''
        ? {
            visibility: 'hidden',
            height:0,
            opacity: '0',
          }
        : {
            visibility: '',
          };
    });
  };
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1 className='display-2 p-2 m-2' style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>HOME</h1>
        <h1 className='display-2 p-2 m-2' style={{cursor:'pointer'}} onClick={menu}>
          메뉴
        </h1>
      </div>
      <div style={mystyle} className='myMenu'>
        <Link to="/user">User</Link>
        <Link to="/freeboard">FreeBoard</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
 
export default MyNav;