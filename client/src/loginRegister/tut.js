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

    const appStyle = {
        height: '800px',
        display: 'flex'
      };


    
      
    
    
    // this array will store all the eye movements
    var x = [];
    var stage1 = true;

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
            
            const temp = x.filter(xy => xy[1] > 650);
            console.log(temp);
            if(temp.length > 50 && stage1){
              alert("선임의 화를 피하셨군요!")
              setmodal2(true);
              stage1 = false;
              webgazer.pause();
            }
        }).begin();
        
    }
    
    return (
      <div>
        <div style={appStyle}>
          <div className="modal-wrapper"
            style={{
            transform: modalopen ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: modalopen ? '1' : '0'
          }}>
          <div className="modal-header">
            <h2>미필을 위한 군대 튜토리얼!</h2>
            <span className="close-modal-btn" onClick={() => {setmodal(false)}}>×</span>
          </div>
          <div className="modal-body">
            <p>
            <h4>아이트래킹을 통해 선임 및 후임 생활을 체험할 수 있습니다!</h4>
            <h4>우선 선임이 화가 났을 때의 상황부터 익혀봅시다.</h4>
            <h4>눈을 최대한 아래로 내려 선임의 눈을 피하세요.</h4>
            </p>
          </div>
          <div className="modal-footer">
            <button onClick={() => {
              setmodal(false);
              recordGaze();
            }}
              >체험 시작!
            </button>
          </div>
          
        </div>

        <div style={appStyle}>
          <div className="modal-wrapper"
            style={{
            transform: modal2open ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: modal2open ? '1' : '0'
          }}>
          <div className="modal-header">
            <h2>미필을 위한 군대 튜토리얼!</h2>
            <span className="close-modal-btn" onClick={() => {setmodal(false)}}>×</span>
          </div>
          <div className="modal-body">
            <p>
            <h4>선임의 시선을 잘 피하셨습니다!</h4>
            <h4>다음은 후임이 사고를 쳤을 때의 상황을 연습해보겠습니다.</h4>
            <h4>화면을 향해 째려봄으로써 후임에게 눈치를 줍시다.</h4>
            </p>
          </div>
          <div className="modal-footer">
            <button onClick={() => {
              setmodal2(false);
              recordGaze();
            }}
              >체험 시작!
            </button>
          </div>
          
        </div>
        
        <div onClick={webgazer.resume}>
          <button class="btn btn-light">Resume</button>
        </div>
        <div onClick={webgazer.pause}>
          <button class="btn btn-light">Pause</button>
        </div>
      </div>
       
    </div> 
      
    </div>
    );
}


//onChange={this.handleChange} onChange={this.handleChange}
export default Tut;