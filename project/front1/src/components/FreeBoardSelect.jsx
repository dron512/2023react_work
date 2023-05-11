import axios from 'axios';
import {memo, useContext, useEffect, useState} from 'react';
import {selectContext} from '../App';

const FreeBoardSelect = () => {
  const {ok, setOk} = useContext(selectContext);
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    let myTimer = null;
    axios
      .get(`http://localhost:9000/board/list`)
      .then(result => {
        setBoards(result.data);
        myTimer = setTimeout(() => {
          setOk('select 완료');
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
      <table style={{border: '1px solid black', width: '100%'}}>
        <thead>
          <tr>
            <th>file</th>
            <th>Title</th>
            <th>Content</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => {
            return (
              <tr key={board.id} style={{textAlign: 'center'}}>
                <td><img src={`http://localhost:9000/img/${board.filename}`} width="100" alt="img"/></td>
                <td>{board.title}</td>
                <td>{board.content}</td>
                <td>{board.name}</td>
                <td>{board.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(FreeBoardSelect);
