import react, { useState,useCallback } from "react";
import $ from "jquery";
import {} from "jquery.cookie";
import Select from 'react-select';
import axios from "axios";

const Writepost = (props) => {

    const [post, setpost] = useState({
        old:"",
        bed:'',
        playg:'',
        futsal:"",
        basket:"",
        tenis:"",
        health:"",
        PC:"",
        trans:"",
        taste:"",
        PXdis:"",
        etc:""
    });
    const [unit, setUnit] = useState(0);
    
    const handleChange = useCallback((inputValue) => {
        setUnit(inputValue);
        
    }, []);

    const options = [
        {value: "8", label:"8사단"},
    ];

    const {old,bed,playg,futsal,basket,tenis,health,PC,trans,taste,PXdis,etc} = post;

    const handleOnChange = (e) => {
        //e.preventDefault();
        setpost({
            ...post,
            [e.target.name]:e.target.value,
        });
    }

    const handleSubmit = (e) => {
        const params = {
            email:  $.cookie("login_email"),
            post:post
        };
        
        axios
          .post("http://192.249.18.153:80/user/addOneres",
          params)
          .then(returnData => {
            
            if (returnData.data.dup === '0') {
                // console.log(returnData.data.list.length);
                alert("제출되었습니다!");
                // console.log(boardList);
            } else {
                console.log(returnData);
                console.log(returnData.dup2);
                console.log('ddd');
                alert("중복입력금지!");
            }
            // setboard(boardList);
          })
          .catch(err => {
            console.log(err);
          });
    }

    const handleLoad = () => {
        const params = {
            email:  $.cookie("login_email"),
        };

        axios
            .post("http://192.249.18.153:80/user/loadres",
            params) 
            .then(returnData => {
                if(returnData === null){
                    alert('설문을 작성하세요.');
                }else{
                    console.log(returnData);
                }

            })
    }

    const handleDelete = () => {
        const params = {
            email:  $.cookie("login_email"),
        };

        axios
            .post("http://192.249.18.153:80/user/remove",
            params)
            .then(returnData => {
                alert('지웠습니다');
            })
    }
    

    const makeRadio = (name,title) => {
        return (
            <div>
                {name}
                <input type="radio" name={title} value="1" onChange={handleOnChange}>
                </input>
                1
                <input type="radio" name={title} value="2" onChange={handleOnChange}>
                </input>
                2
                <input type="radio" name={title} value="3" onChange={handleOnChange}>
                </input>
                3
            </div>

        )
    }

    return (
        <div>
            <div>
            부대
            <Select styles={{ // zIndex 
            menu: provided => ({...provided, zIndex: 999}) }} 
            value={options.find(op => { // choice state에 따라 디폴트 option 세팅 
                return op.value === unit })} 
                placeholder="사단" 
                onChange={(value) => { handleChange(value.value); }}
                options={options} 
            />
           
            </div>
            {makeRadio("막사 노후도","old")}
            <div>
                <div>
                침상 및 침대
                <input type="radio" name="bed" value="notbed" onChange={handleOnChange}>
                </input>
                침상
                <input type="radio" name="bed" value="bed" onChange={handleOnChange}>
                </input>
                침대
                </div>
            </div>

            <div>
                운동장
                <input type="radio" name="playg" value="grass" onChange={handleOnChange}>
                </input>
                인조잔디
                <input type="radio"  name="playg" value="soil" onChange={handleOnChange}>
                </input>
                흙운동장
            </div>
            
            <div>
                기타 운동장
                <input type="checkbox"  name="futsal" onChange={handleOnChange}>
                </input>
                풋살장
                <input type="checkbox"  name="basket" onChange={handleOnChange}>
                </input>
                농구코트
                <input type="checkbox"  name="tenis" onChange={handleOnChange}>
                </input>
                테니스장
            </div>
            
            <div>
                복지 및 역세권
            </div>
            
            {makeRadio("휴가","vaca")}
        
            <div>
                헬스장
                <input type="radio" name="health" value="0" onChange={handleOnChange}>
                </input>
                없음
                <input type="radio" name="health" value="1" onChange={handleOnChange}>
                </input>
                1
                <input type="radio" name="health" value="2" onChange={handleOnChange}>
                </input>
                2
                <input type="radio" name="health" value="3" onChange={handleOnChange}>
                </input>
                3
            </div>
            <div>
                피시방 거리
                <input type="radio" name="PC" value="0" onChange={handleOnChange}>
                </input>
                근처에 없음
                <input type="radio" name="PC" value="3" onChange={handleOnChange}>
                </input>
                3
                <input type="radio" name="PC" value="2" onChange={handleOnChange}>
                </input>
                2
                <input type="radio" name="PC" value="1" onChange={handleOnChange}>
                </input>
                1
            </div>
            {makeRadio("교통","trans")}
            {makeRadio("밥","taste")}
            {makeRadio("PX와의 거리","PXdis")}
            <div>
                <button onClick = {handleSubmit}>작성</button>
                <button onClick = {handleLoad}>불러오기</button>
                <button onClick = {handleDelete}>삭제</button>
            </div>
        </div>
    )
}

export default Writepost;
