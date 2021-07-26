import React,{ useState } from 'react';
import webgazer from 'webgazer'


const Unfulfilled = (props) => {
    
    const appStyle = {
        height: '800px',
          display: 'flex'
      };


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
            console.log(xprediction + "," + yprediction);
        }).begin();
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
        <div style={appStyle}>
            <div onClick={saveGaze} class="ml-auto">
                <button class="btn btn-light">Save</button>
            </div>

            <div onClick={webgazer.resume}>
                <button class="btn btn-light">Resume</button>
            </div>

            <div onClick={webgazer.pause}>
                <button class="btn btn-light">Pause</button>
            </div>

            <div onClick={recordGaze}>
                <button class="btn btn-light">Start</button>
            </div>
        </div>
    );
}


//onChange={this.handleChange} onChange={this.handleChange}
export default Unfulfilled;