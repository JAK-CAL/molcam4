import react, { useState,useCallback,useEffect } from "react";
import $ from "jquery";
import {} from "jquery.cookie";
import Select from 'react-select';
import axios from "axios";
import './Writepost.css';

const Writepost = (props) => {

    const [post, setpost] = useState({
        old:"",
        bed:'',
        soil:'',
        grass:'',
        futsal:"",
        basket:"",
        tenis:"",
        vaca:"",
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
        {value: "8", label:"8사단 직할 정보통신대대"},
    ];

    useEffect(() => {
        handleLoad();
        console.log(post);
    },[]);

    const {old,bed,playg,futsal,basket,tenis,vaca, health,PC,trans,taste,PXdis,etc} = post;

    const handleOnChange = (e) => {
        console.log(e.target.name,e.target.value)
        //e.preventDefault();
        setpost({
            ...post,
            [e.target.name]:e.target.value,
        });
        console.log(post)
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
                window.location.href="http://localhost:3000/avg";
                // console.log(boardList);
            } else {
                console.log(returnData);
                console.log(returnData.data.dup2);
                console.log('ddd');
                if(window.confirm('다시 제출하시겠습니까?')){
                    axios
                        .post("http://192.249.18.153:80/user/updateRes",
                         params)
                        .then(returnData => {
                            if(returnData.status === 200){
                                console.log('새로 등록되었습니다');
                                window.location.href="http://localhost:3000/avg";
                            }
                        })
                }
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
                    console.log(returnData.data.result)
                    let before = returnData.data.result;
                    setpost({
                        ...post,
                        "old":before.old,
                        "vaca":before.vaca,
                        "PC":before.PC,
                        "trans":before.trans,
                        "taste":before.taste,
                        "PXdis":before.PXdis,
                        "health":before.health,
                        "bed":before.bed,
                        "tenis":before.tenis,
                        "soil":before.soil,
                        "grass":before.grass,
                        "futsal":before.futsal,
                    })
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
    

    const makeRadio = (title) => {
        return (
            <div class = "res">
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
        <body>
            <div class = "form">
                <div class = "boodae">
                
                <Select styles={{ // zIndex 
                menu: provided => ({...provided, zIndex: 999}) }} 
                value={options.find(op => { // choice state에 따라 디폴트 option 세팅 
                    return op.value === unit })} 
                    placeholder="부대 선택" 
                    onChange={(value) => { handleChange(value.value); }}
                    options={options} 
                />
            
                </div>
                <div class = "gita">
                <div class="name">부대에 있는 운동시설을 고르시오.(중복선택 가능)</div>
                    <span class = "res">
                    <input type="checkbox"  name="futsal" onChange={handleOnChange}>
                    </input>
                    풋살장
                    <input type="checkbox"  name="basket" onChange={handleOnChange}>
                    </input>
                    농구코트
                    <input type="checkbox"  name="tenis" onChange={handleOnChange}>
                    </input>
                    테니스장
                    <input type="checkbox" name="grass" onChange={handleOnChange}>
                    </input>
                    인조잔디
                    <input type="checkbox"  name="soil" onChange={handleOnChange}>
                    </input>
                    흙운동장
                    </span>
                </div>

            
                <div class = "chimdae">
                <div class="name">침상인가요, 침대인가요?</div>
                    <div >
                    <span class = "res">
                    <input type="radio" name="bed" value="notbed" onChange={handleOnChange}>
                    </input>
                    침상
                    <input type="radio" name="bed" value="bed" onChange={handleOnChange}>
                    </input>
                    침대
                    </span>
                    </div>
                </div>

                <div class = "pcbang">
                <div class="name">부대 주변 PC방은 좋은가요? (없으면 0)</div>
                <span class = "res">
                    <input type="radio" name="PC" value="0" onChange={handleOnChange}>
                    </input>
                    0(없음)
                    <input type="radio" name="PC" value="1" onChange={handleOnChange}>
                    </input>
                    1
                    <input type="radio" name="PC" value="2" onChange={handleOnChange}>
                    </input>
                    2
                    <input type="radio" name="PC" value="3" onChange={handleOnChange}>
                    </input>
                    3
                    </span>
                </div>
                
                <div class = "healthjang">
                <div class="name">부대 헬스장은 어떤가요? (없으면 0)</div>
                <span class = "res">
                    <input type="radio" name="health" value="0" onChange={handleOnChange}>
                    </input>
                    0(없음)
                    <input type="radio" name="health" value="1" onChange={handleOnChange}>
                    </input>
                    1
                    <input type="radio" name="health" value="2" onChange={handleOnChange}>
                    </input>
                    2
                    <input type="radio" name="health" value="3" onChange={handleOnChange}>
                    </input>
                    3
                    </span>
                </div>
                
                <div class = "gunmul">
                <div class="name">건물은 좋은가요?</div>
                {makeRadio("old")}
                </div>

                <div class = "huega">
                <div class="name">휴가는 많이 주나요?</div>
                {makeRadio("vaca")}
                </div>
                
                <div class = "gyotong">
                <div class="name">교통은 편리한가요?</div>
                {makeRadio("trans")}
                </div>
                
                <div class = "px">
                <div class="name">PX는 좋은가요?</div>
                {makeRadio("PXdis")}
                </div>
                
                <div class = "bab">
                <div class="name">밥은 맛있나요? </div>
                {makeRadio("taste")}
                </div>
               
                <div>
                    <button class = 'btn' onClick = {handleSubmit}>작성</button>
                   
                </div>
                
            </div>
        </body>
    )
}

export default Writepost;
