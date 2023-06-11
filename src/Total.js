import React from 'react'

function Total({list}) {
    var totalPrice = 0
    const arr = Array.from(list)

 return (
    <div>
        {arr.map((item) => {
            const {priceValue, quantityValue} = item
            const singlePrice = quantityValue * priceValue
            totalPrice = totalPrice + singlePrice 
        })
        }
        {list.length > 0 ?
         <p className='total-price'>Total: {totalPrice}$</p> : 
         <p className='total-price'>Total: 0$</p>}
    </div>
  )
}

export default Total