import React,{useState,useEffect} from 'react';
import { Navbar,Nav,Container,Button } from 'react-bootstrap';
import { NavLink,Route } from 'react-router-dom';
import BoardRow from './BoardRow';
import Writepost from './Writepost';
import $ from "jquery";
import {} from "jquery.cookie"; 



const Postboard = (props) =>{


  const buttonStyle = {
    margin: "15px 10px 15px 10px",
  };

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
             <Navbar Navbar bg="light" expand="lg">
          <Container>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          
           
            
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
            <Navbar bg="dark" variant="dark">
              <Container>
              <Navbar.Brand href="#home">사이트 이름</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#home">부대 리뷰</Nav.Link>
                  <Nav.Link href="#features">부대 위치</Nav.Link>

                </Nav>
              </Container>
            </Navbar>
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