import react,{useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };


const Detail = (props) => {
    
    const divStyle = {
        marginTop: 30,
        marginLeft:200,
        marginRight:200,
        marginBottom:50
    };

    const [post,setpost] = useState({
        subject:"",
        board: []
    });
    
    const {subject,board} = post;

    useEffect(() => { //생성자 같은 함수, 이 페이지에 (/board/detail) 에 들어오면 바로 실행되는 느낌
        if (props.location.query !== undefined) { //쿼리로 보낸게 없으면 (NavLink 로 이 페이지 주소로 연결할때 주는)
          getDetail();
        } else {
          
        }
    },[])
    
    const deleteBoard = _id => {
        const send_param = {
          headers,
          _id
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
          axios
            .post("http://172.10.18.153:80/board/delete", send_param) //보드라우터 가서 딜리트 실행
            //정상 수행
            .then(returnData => {
              alert("게시글이 삭제 되었습니다.");
              window.location.href = "/";
            })
            //에러
            .catch(err => {
              console.log(err);
              alert("글 삭제 실패");
            });
        }
      };
    
    const getComment = () => {
    
        const tableId = props.tableId;
        const send_param ={
            headers,
            _id: props.location.query._id,
            tableId: tableId
        }
            axios.post("http://172.10.18.153:80/comment/getCommentList", send_param)
            .then(returnData=>{
                if(returnData.data.success){
                const comment=(
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    {returnData.data.comment[0].title}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                dangerouslySetInnerHTML={{
                                    __html: returnData.data.comment[0].content
                                }}>
                            
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
            else{
                alert('코멘트 정보를 가져오는 것을 실패하였습니다.')
            }
        })
        }
    
    const getDetail = () => {
        const send_param = {
            headers,
            _id: props.location.query._id
        };
        axios
          .post("http://172.10.18.153:80/board/detail", send_param) //보드 라우터의 디테일 실행 (파람을 보내기)
          //정상 수행
          .then(returnData => { //받아온 보드 데이터들 
            if (returnData.data.board[0]) { //받아온 보드 데이터는 한개이므로 걍 0번째 인덱스로 하면됨
              const board = ( //받아온 보드 데이터를 아래 형식으로 표현
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>{returnData.data.board[0].title}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          dangerouslySetInnerHTML={{ //
                            __html: returnData.data.board[0].content
                          }}
                        ></td>
                      </tr>
                    </tbody>
                  </Table>
    
                  <div>
                    <NavLink
                      to={{
                        pathname: "/boardWrite",
                        query: {
                          title: returnData.data.board[0].title,
                          content: returnData.data.board[0].content,
                          _id: props.location.query._id
                        }
                      }}
                    >
                      <button block className="my-3">
                        글 수정
                      </button>
                    </NavLink>
                    <button
                      block
                      className="my-3"
                      onClick={deleteBoard.bind(
                        null,
                        props.location.query._id
                      )}
                    >
                      글 삭제
                    </button>
                  </div>
                </div>
              );
              setpost({
                ...post,
                subject: returnData.data.board[0].title,
                board: board //맨위에서 선언한 board : 방금 받아온 board 데이터
              });
            } else {
              alert("글 상세 조회 실패");
            }
          })
          //에러
          .catch(err => {
            console.log(err);
          });
      };
    
      //onClick={this.getBoard.bind(null,this.props._id)}
      
    return (
        <div>
            <h2><strong>Subject : {subject}</strong></h2>
            <div style={divStyle}>{board}</div>
        </div>
    ); //this.state.board 에 테이블이 들어감
      
}

export default Detail;
