import React from 'react'

function List({items, removeItem, editItem}) {
    const arr = Array.from(items)

  return (
    <div className='grocery-list'>
        {arr.map((item) => {
            const {id, title, quantityValue, priceValue} = item
            return (
                <article key={id} className='grocery-item'>
                    <div className='grocery-single-item'>
                        <p className='item-quantity'>{quantityValue} x {priceValue}$</p>
                        <p className='item-title'>{title}</p>
                    
                        <button className='edit-btn' onClick={() => editItem(id)}>Edit</button>
                        <button className='delete-btn' onClick={() => removeItem(id)}>Delete</button>
                    </div>
                </article>
            )
        })}
    </div>
  )
}

export default List