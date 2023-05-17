import axios from 'axios';
import {memo, useContext, useEffect, useState} from 'react';
import {selectContext} from '../App';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const UserSelect = () => {
  const {ok, setOk} = useContext(selectContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let myTimer = null;
    axios
      .get(`http://localhost:9000/users/list`)
      .then(result => {
        setUsers(result.data);
        myTimer = setTimeout(() => {
          MySwal.fire({
            title: <p>Hello World</p>,
            didOpen: () => {
              // MySwal.showLoading()
            },
          })
        }, 2000);
      })
      .catch(e => {
        console.log(e);
      });
    return () => {
      clearTimeout(myTimer);
    };
  }, [ok]);
  return (
    <div>
      <h1>select</h1>
      <table className='table table-hover border text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id} style={{textAlign: 'center'}}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>*****</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
 
export default memo(UserSelect);