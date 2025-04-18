import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    border: solid 1px #ffffff;

`
const Th = styled.th`
    background:#de8585;
    padding: 10px;

`

const productItems = [{
    product_name : "삼성 TV",
    price : 10000,
    color : "블랙"
},{
    product_name : "엘지 냉장고",
    price : 30000,
    color : "베이지"
},{
    product_name : "애플 노트북",
    price : 50000,
    color : "그레이"
}]

const Products = () => {
  return (
    <div>
        <Table>
            <thead>
                <tr>
                    <Th>제품명</Th>
                    <Th>가격</Th>
                    <Th>색상</Th>
                </tr>
            </thead>
            <tbody>
                {productItems.map((item) => 
                <tr key={item.product_name}> 
                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    <td>{item.color}</td>
                </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}

export default Products