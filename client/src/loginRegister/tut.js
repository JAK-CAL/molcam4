import React,{ useState } from 'react';
import webgazer from "webgazer";
import $ from "jquery";
import {} from "jquery.cookie"; 
import Swal from 'sweetalert2';
import "./tut.css"
import './modal.css';

var PointCalibrate = 0;
var CalibrationPoints={};

const Tut = (props) => {
    const [modalopen,setmodal] = useState(true);
    const [modal2open,setmodal2] = useState(false);
    const [modal3open,setmodal3] = useState(false);
    var temp;
    const appStyle = {
        height: '800px',
        display: 'flex'
      };
    const wrapStyle = {
      transform: modalopen ? 'translateY(0vh)' : 'translateY(-100vh)',
      opacity: modalopen ? '1' : '0',
      position: "absolute",
      left: "37.5%",
      top: "20%",
      width: "25%",
      height: "33%"   
    }
    const headerStyle = {
      height: "14%"   
    }
    const bodyStyle ={
      height: "54%"    
    }
    const footerStyle ={
      height: "8%", 
    }

    

    
      
    
    
    // this array will store all the eye movements
    var x = [];
    var stage1 = true;
    var stage2 = true;

    // start recording
    function recordGaze() {
        console.log(modalopen)
        webgazer.setGazeListener(function (data, elapsedTime) {
            if (data == null) {
                return;
            }
            var xprediction = data.x; 
            var yprediction = data.y;

            var save_url = "https://anupm12.github.io/Eye-tracking-WebGazer.js/?"+"x="+xprediction+";y="+yprediction;

            var temp_image = new Image();

            temp_image.src= save_url;
            x.push([xprediction, yprediction]);
            console.log(xprediction + "," + yprediction);
            if(stage1){
              temp = x.filter(xy => xy[1] > 650);
            }else if(stage2){
              temp = x.filter(xy => xy[0] < 200);
            }
            
            console.log(temp);
            if(temp.length > 50 && stage1){
              alert("선임의 화를 피하셨군요!")
              setmodal2(true);
              stage1 = false;
              webgazer.pause();
            } else if(temp.length > 50 && stage2){
              alert("후임에게 눈치를 줬군요!")
              setmodal3(true);
              stage2 = false;
              webgazer.pause();
            }
        }).begin();
        
    }
    
    return (
      <div>
        <div className="modal-wrapper"
            style={wrapStyle}>
          <div className="modal-header"
            style={headerStyle}
           >
            <h2>미필을 위한 군대 튜토리얼!</h2>
            <span className="close-modal-btn" onClick={() => {setmodal(false)}}>×</span>
          </div>
          <div className="modal-body"style={bodyStyle}>
            <p>
            <h5>아이트래킹으로 군 생활을 체험해봅시다!</h5>
            <h5>우선 선임이 화가 났을 때의 상황부터 익혀봅시다.</h5>
            <h5>눈을 최대한 아래로 내려 선임의 눈을 피하세요.</h5>
            </p>
          </div>
          <div className="modal-footer"
            style={footerStyle}>
            <button onClick={() => {
              setmodal(false);
              recordGaze();
            }}
              >체험 시작!
            </button>
          </div>
        </div>
        <div className="modal-wrapper"
          style={{
            transform: modal2open ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: modal2open ? '1' : '0',
            position: "absolute",
            left: "37.5%",
            top: "20%",
            width: "25%",
            height: "33%"   
          }}>
          <div className="modal-header"
            style={headerStyle}>
            <h2>미필을 위한 군대 튜토리얼!</h2>
            <span className="close-modal-btn" onClick={() => {setmodal2(false)}}>×</span>
          </div>
          <div className="modal-body"
            style={bodyStyle}>
            <p>
            <h4>선임의 시선을 잘 피하셨습니다!</h4>
            <h4>다음은 후임이 사고를 쳤을 때의 상황을 연습해보겠습니다.</h4>
            <h4>왼쪽으로 째려봄으로써 후임에게 눈치를 줍시다.</h4>
            </p>
          </div>
          <div className="modal-footer"
            style={footerStyle}>
            <button onClick={() => {
              setmodal2(false);
              webgazer.resume()
            }}
              >체험 시작!
            </button>
          </div>
        </div>
        <div className="modal-wrapper"
          style={{
            transform: modal3open ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: modal3open ? '1' : '0',
            position: "absolute",
            left: "37.5%",
            top: "20%",
            width: "25%",
            height: "33%"   
          }}>
          <div className="modal-header">
            <h2>미필을 위한 군대 튜토리얼!</h2>
            <span className="close-modal-btn" onClick={() => {setmodal3(false)}}>×</span>
          </div>
          <div className="modal-body"
            style={bodyStyle}>
            <p>
            <h4>튜토리얼을 끝내셨습니다!</h4>
            <h4>물론 군대에서는 이런 상황 말고도 좀 더 복잡한 생활이 많이 존재합니다.</h4>
            <h4>이 사이트를 통해 부디 안전하고 평안한 군생활을 찾길 기원합니다!</h4>
            </p>
          </div>
          <div className="modal-footer">
            <button onClick={() => {
              
              window.location.href = "avg";
            }}
              >게시판으로 가기!
            </button>
          </div>
        </div>
      </div>
        
        
    
       
    
      
   
    );
}


//onChange={this.handleChange} onChange={this.handleChange}
export default Tut;