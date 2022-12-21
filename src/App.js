import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import './App.css';
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';


function App() {

  let [재고] = useState([10, 11, 12]);
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();


  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Routes>

        <Route path="/" element={<div>
          <div className='main-bg'></div>
          <Container>
            <Row>
              {
                shoes.map((a, i) => {
                  return (
                    <Card key={i} 신발={shoes[i]} i={i + 1} />
                  )
                })
              }
            </Row>
          </Container>

          <button onClick={() => {
            axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과) => {
                console.log(결과.data)
                let copy = [...shoes, ...결과.data];
                setShoes(copy);
              })
          }}>더보기</button>

        </div>} />

        <Route path="/detail/:id" element={
          <Detail shoes={shoes} />
        } />

        <Route path="*" element={<div>없는 페이지요</div>} />

        <Route path="/cart" element={<Cart />} />

      </Routes>

    </div>
  );
}

// function About() {
//   return (
//     <div>
//       <h4>회사정보임</h4>
//       <Outlet></Outlet>
//     </div>
//   )
// }



function Card(props) {
  return (
    <Col md={4}>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
      <h4>{props.신발.title}</h4>
      <p>{props.신발.price}</p>
    </Col>
  )
}

export default App;
