import './App.css';
import Login from './loginRegister/Login';
import Register from "./loginRegister/Register";
import Unfulfilled from './loginRegister/Unfulfilled';
import Fulfilled from './loginRegister/Fulfilled';
import Writepost from './postboard/Writepost';
import Detail from "./postboard/Detail";
import Postboard from './postboard/army';
import styled from "styled-components";
import {} from "jquery.cookie";
import {Navigation} from 'react-minimal-side-navigation';
import { Route, NavLink, Link } from "react-router-dom";
import tut from './loginRegister/tut';
import Average from './postboard/average';



const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
  background: linear-gradient(
      to left,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.8) 40%,
      rgba(20, 20, 20, 1)70%
    ),
    url(http://192.249.18.153/static/background1.jpg);
  background-size: cover;`
  ;

  const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 40px;
  margin-left: 19.5%;
  margin-top: 2%;
  padding-top: 5px;
  padding-bottom: 5px;
  /* margin: 10px 10px 10px 10px; */
  width: 17%;
  cursor: pointer;`;

  const Sidebar = styled.div`
    position: fixed;
    color:black;
    background-color: black;
    z-index: 9;
    left: 0;
    top: 0;
    width:20%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    border-left: 1px solid #d6d6d6;
    font-family: "맑은 고딕", "돋움", "Apple SD Gothic Neo", sans-serif;
    background-color: #fff;
    `



function App() {

  let resultForm;
  const setstyle = {
    margin:"20px",
  }
  
  const SubNavigation = (items) => {
    console.log("템"+items.subNav);
    // Here I’m trying to return if the props are not present
    if(!items) return null;
    return (<ul>
        {items.map((item, index) => {
          return <Link key={index} to={item.path}>{item.name}</Link>
        })}
      </ul>
    );
  }
  
  const items=
    [{
      title: '육군',
      itemId: '/army',
      subNav: [
        {
          title: '제8기동사단',
          itemId: '/army/8',
          subNav:[
            {
              title: "사단직할대",
              itemID: "/army/8/dir",
              subNav:
                [
                  {
                    title: "정보통신대대",
                    itemID: "/army/8/dir/info",
                    
                  }
                ]
              },
          ]
        },
      ],
    },]
  
  const getResultForm = () => {
    //console.log($.cookie("login_id"));
   
      resultForm = 
      
      <Route exact path = "/">
      
      <Container>
       </Container>
      <h1 class = "title">요즘 군대가 군대냐</h1>
        
        <div style ={
          setstyle 
        }>
        <div>
        <NavLink to="/fulfilled">
          <Button class ="mainbt">군필입니다</Button>
        </NavLink>
        </div>
        <div>
        <NavLink to="/unfulfilled">
          <Button class ="mainbt">미필입니다</Button>
        </NavLink>
        </div>
        </div>
        
       
      </Route>
        
    return resultForm;
  }


  getResultForm();
    
  return (
    <div>
      
      {resultForm}
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path = "/unfulfilled" component={Unfulfilled}></Route>
      <Route path = "/fulfilled" component={Fulfilled}></Route>
      <Route path = "/writepost" component={Writepost}></Route>
      <Route path = "/tut" component = {tut}></Route>
      <Route path = "/army" component = {Postboard}></Route>
      <Route path = "/army/detail" component={Detail}></Route>
      <Route path = "/avg" component={Average}></Route>
      
    </div>
  );  
}




export default App;
