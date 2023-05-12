import FreeBoardInsert from "./FreeBoardInsert";
import FreeBoardSelect from "./FreeBoardSelect";


const FreeBoard = () => {
  
  return (
    <div style={{padding: '1rem'}}>
      <h1>FreeBoard</h1>
      <FreeBoardInsert></FreeBoardInsert>
      <FreeBoardSelect></FreeBoardSelect>
    </div>
  );
};
 
export default FreeBoard;