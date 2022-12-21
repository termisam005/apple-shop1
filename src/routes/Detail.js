import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";
import { useDispatch } from "react-redux";


const YellowBtn = styled.button`
    background:${props => props.bg};
    color:${props => props.bg == '#999' ? '#fff' : '#555'};
    padding:10px;
    border:1px solid #bbb;
`
const Box = styled.div`
    background:#eee;
    padding:20px;
`


function Detail(props) {

    let [count, setCount] = useState(0);

    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id
    });

    let [alert, setAlert] = useState(true);

    useEffect(() => {
        let a = setTimeout(() => { setAlert(false) }, 2000)
        return () => {
            clearTimeout(a)
        }
    }, [])


    let [탭, 탭변경] = useState(0);

    let [fade2, setFade2] = useState('');

    useEffect(() => {
        setFade2('end')
        return () => {
            setFade2('')
        }
    }, []);


    let dispatch = useDispatch();


    return (
        <div className={'container start ' + fade2}>
            {
                alert == true ?
                    <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }

            {count}
            <div>
                <button onClick={() => { setCount(count + 1) }}>버튼</button>
            </div>
            <Box>
                <YellowBtn bg="#999">버튼</YellowBtn>
                <YellowBtn bg="orange">버튼</YellowBtn>
            </Box>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">
                        {찾은상품.title}
                    </h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem(
                            { id: 1, name: 'Red Night', count: 1 }
                        ))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent shoes={props.shoes} tab={탭} />
        </div>
    )
}

function TabContent({ tab, shoes }) {

    const [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)

        return () => {
            setFade('')
        }
    }, [tab])

    return (
        <div className={'start ' + fade}>
            {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )
}

// function TabContent({ tab }) {
//     if (tab === 0) {
//         return (
//             <div>내용0</div>
//         )
//     }
//     if (tab === 1) {
//         return (
//             <div>내용1</div>
//         )
//     }
//     if (tab === 2) {
//         return (
//             <div>내용2</div>
//         )
//     }
// }


export default Detail;