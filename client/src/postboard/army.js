import React,{useState,useEffect} from 'react';

import { NavLink,Route } from 'react-router-dom';
import BoardRow from './BoardRow';
import Writepost from './Writepost';
import Head from '../Head';



const Postboard = (props) =>{
  
    const [boardList,setboard] = useState([]);
    
    
    useEffect(() => {
      getBoardList();
  }, [])
    console.log("게시판 이름:"+props.name);
    
    const handleadd = e => {
      //setboard(e.target);
      setboard(boardList.reverse().concat(
        [<BoardRow
        key={Date.now() + Math.random() * 500}
        unit={"8사단"}
        createdAt={"TODAY"}>
        </BoardRow>]
         
      ))
      console.log(boardList);
    }


    
    const getBoardList = () => {
        setboard([
          <BoardRow
          key={Date.now() + Math.random() * 500}
          unit={"8사단"}
          createdAt={"TODAY"}>

          </BoardRow>]
        );
        
        /*
        axios
          .post("http://192.249.18.151:80/board/getBoardList",
          params:{
            board:props.name
          })
          .then(returnData => {
            let boardList;
            console.log(returnData.data);
            if (returnData.data.list.length > 0) {
              // console.log(returnData.data.list.length);
              const boards = returnData.data.list;
              boardList = boards.map(item => (
                <BoardRow
                  key={Date.now() + Math.random() * 500}
                  _id={item._id}
                  createdAt={item.createdAt}
                  title={item.title}
                  author={item.author}
                ></BoardRow>
              ));
              // console.log(boardList);
            } else {
              boardList = (
                <tr>
                  <td colSpan="3">작성한 게시글이 존재하지 않습니다.</td>
                </tr>
              );
            }
            setboard(boardList);
          })
          .catch(err => {
            console.log(err);
          });*/
      };
    
      
        const divStyle = {
          marginTop:65,
          marginLeft:180,
          marginRight:200,
          marginBottom:160
        };
        //console.log(window.location.href);

        return (
          <div>
             <Head/>
            <NavLink to= "/writepost"> 
            <button >임시 추가 버튼</button>
            </NavLink>
            <h1><strong>{props.name}</strong></h1>
            <p></p>
            <div>
              <table warning striped bordered hover>
                <thead>
                </thead>
                <tbody>{boardList}</tbody>
              </table>
            </div>
            <Route path="/writepost" component={Writepost}></Route>
          </div>
        );
}

export default Postboard;