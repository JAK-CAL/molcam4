import React,{ useState } from 'react';
import webgazer from "webgazer";
import $ from "jquery";
import {} from "jquery.cookie"; 
import Swal from 'sweetalert2'
import "./tut.css"

var PointCalibrate = 0;
var CalibrationPoints={};

const Tut = (props) => {
    const [modalopen,setmodal] = useState(true);


    const appStyle = {
        height: '800px',
        display: 'flex'
      };

      const formStyle = {
        margin: 'auto',
        padding: '10px',
        border: '1px solid #c9c9c9',
        borderRadius: '5px',
        background: '#f5f5f5',
        width: '300px',
          display: 'block'
    };

    function calculatePrecision(past50Array) {
      
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();
      console.log(windowHeight,windowWidth);
        // Retrieve the last 50 gaze prediction points
      var x50 = past50Array[0];
      var y50 = past50Array[1];
      
        // Calculate the position of the point the user is staring at
      var staringPointX = windowWidth / 2;
      var staringPointY = windowHeight / 2;
      
       var precisionPercentages = new Array(50);
        calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
        var precision = calculateAverage(precisionPercentages);
      
        // Return the precision measurement as a rounded percentage
        return Math.round(precision);
      };
      
      /*
       * Calculate percentage accuracy for each prediction based on distance of
       * the prediction point from the centre point (uses the window height as
       * lower threshold 0%)
       */
      function calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY) {
        for (x = 0; x < 50; x++) {
          // Calculate distance between each prediction and staring point
          var xDiff = staringPointX - x50[x];
          var yDiff = staringPointY - y50[x];
          var distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
      
          // Calculate precision percentage
          var halfWindowHeight = windowHeight / 2;
          var precision = 0;
          if (distance <= halfWindowHeight && distance > -1) {
            precision = 100 - (distance / halfWindowHeight * 100);
          } else if (distance > halfWindowHeight) {
            precision = 0;
          } else if (distance > -1) {
            precision = 100;
          }
      
          // Store the precision
          precisionPercentages[x] = precision;
        }
      }
      
      /*
       * Calculates the average of all precision percentages calculated
       */
      function calculateAverage(precisionPercentages) {
        var precision = 0;
        for (x = 0; x < 50; x++) {
          precision += precisionPercentages[x];
        }
        precision = precision / 50;
        return precision;
      }

    
      function store_points_variable(){
        webgazer.params.storingPoints = true;
      }
      
      /*
       * Sets store_points to false, so prediction points aren't
       * stored any more
       */
      function stop_storing_points_variable(){
        webgazer.params.storingPoints = false;
      }

    function ClearCanvas(){
        $(".Calibration").hide();
        var canvas = document.getElementById("plotting_canvas");
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      }
      
      /**
       * Show the instruction of using calibration at the start up screen.
       */
    function PopUpInstruction(){
        ClearCanvas();
        Swal.fire({
          title:"Calibration",
          text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
          buttons:{
            cancel: false,
            confirm: true
          }
        }).then(isConfirm => {
          ShowCalibrationPoint();
        });
    }

    function helpModalShow() {
        $('#helpModal').modal('show');
    }

    function ShowCalibrationPoint() {
        $(".Calibration").show();
        $("#Pt5").hide(); // initially hides the middle button
      }
      
      /**
      * This function clears the calibration buttons memory
      */
      function ClearCalibration(){
        // Clear data from WebGazer
      
        $(".Calibration").css('background-color','red');
        $(".Calibration").css('opacity',0.2);
        $(".Calibration").prop('disabled',false);
      
        CalibrationPoints = {};
        PointCalibrate = 0;
    }
      

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    
    
    // this array will store all the eye movements
    var x = [];

    // start recording
    function recordGaze() {
    
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
            //console.log(xprediction + "," + yprediction);
        }).begin();

    var id = $(this).attr('id');

    if (!CalibrationPoints[id]){ // initialises if not done
        CalibrationPoints[id]=0;
    }
      CalibrationPoints[id]++; // increments values

      if (CalibrationPoints[id]==5){ //only turn to yellow after 5 clicks
        $(this).css('background-color','yellow');
        $(this).prop('disabled', true); //disables the button
        PointCalibrate++;
      }else if (CalibrationPoints[id]<5){
        //Gradually increase the opacity of calibration points when click to give some indication to user.
        var opacity = 0.2*CalibrationPoints[id]+0.2;
        $(this).css('opacity',opacity);
      }

      //Show the middle calibration point after all other points have been clicked.
      if (PointCalibrate == 8){
        $("#Pt5").show();
      }

      if (PointCalibrate >= 9){ // last point is calibrated
            //using jquery to grab every element in Calibration class and hide them except the middle point.
            $(".Calibration").hide();
            $("#Pt5").show();

            // clears the canvas
            var canvas = document.getElementById("plotting_canvas");
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            // notification for the measurement process
            Swal.fire({
              title: "Calculating measurement",
              text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
              closeOnEsc: false,
              allowOutsideClick: false,
              closeModal: true
            }).then( isConfirm => {

                // makes the variables true for 5 seconds & plots the points
                $(document).ready(function(){

                  store_points_variable(); // start storing the prediction points

                  sleep(5000).then(() => {
                      stop_storing_points_variable(); // stop storing the prediction points
                      var past50 = webgazer.getStoredPoints(); // retrieve the stored points
                      var precision_measurement = calculatePrecision(past50);
                      var accuracyLabel = "<a>Accuracy | "+precision_measurement+"%</a>";
                      document.getElementById("Accuracy").innerHTML = accuracyLabel; // Show the accuracy in the nav bar.
                      Swal.fire({
                        title: "Your accuracy measure is " + precision_measurement + "%",
                        allowOutsideClick: false,
                        buttons: {
                          cancel: "Recalibrate",
                          confirm: true,
                        }
                      }).then(isConfirm => {
                          if (isConfirm){
                            //clear the calibration & hide the last middle button
                            ClearCanvas();
                          } else {
                            //use restart function to restart the calibration
                            document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
                            webgazer.clearData();
                            ClearCalibration();
                            ClearCanvas();
                            ShowCalibrationPoint();
                          }
                      });
                  });
                });
            });
          }
    }
    

    // exporting data to .csv file
    function saveGaze() {
        console.log(x);

        var csv = '';
        x.forEach(function (row) {
            csv += row.join(',');
            csv += "\n";
        });


        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'gazeData.csv';
        hiddenElement.click();
    }

    return (
      <div>
        <div style={appStyle}>
          
            <div onClick={saveGaze} className="ml-auto">
                <button class="btn btn-light">Save</button>
            </div>

            <div onClick={webgazer.resume}>
                <button class="btn btn-light">Resume</button>
            </div>

            <div onClick={webgazer.pause}>
                <button class="btn btn-light">Pause</button>
            </div>

            <div onClick={recordGaze}>
                <button className="btn btn-light">Start</button>
            </div>
           
            

        </div>
      </div>
    );
}


//onChange={this.handleChange} onChange={this.handleChange}
export default Tut;