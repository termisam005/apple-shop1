import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice';
import { countPlus } from './../store';
import { memo, useState } from 'react';


const Child = memo(function () {
    console.log('재랜더링됨')
    return <div>자식임</div>
});

function Cart() {

    let station = useSelector((state) => { return state });
    let dispatch = useDispatch();
    let [count, setCount] = useState(0);

    return (
        <div>
            <Child count={count}></Child>
            <h6>{station.user.name}{station.user.age}의 장바구니</h6>
            <button onClick={() => { setCount(count + 1) }}>버튼</button>
            {/* <button onClick={() => {
                dispatch(increase(10))
            }}>버튼</button> */}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        station.cart.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <td>{station.cart[i].id}</td>
                                    <td>{station.cart[i].name}</td>
                                    <td>{station.cart[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(countPlus(station.cart[i].id))
                                        }}>+</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>

        </div>
    )
}


export default Cart;