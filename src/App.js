import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";
import Total from "./Total";

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(list)
  }
  else {
    return []
  }
}

function App() {

const [name, setName] = useState('')
const [quantity, setQuantity] = useState(1)
const [price, setPrice] = useState('')
const [list, setList] = useState(getLocalStorage())
const [alert, setAlert] = useState({show: false, type: '', msg: ''})
const [mainBudget, setMainBudget] = useState('')
const [editing, setEditing] = useState(false)
const [editID, setEditID] = useState(null)

const showAlert = (show=false, type='', msg='') => {
  setAlert({show, type, msg})
}

const handleSubmit = (e) => {
  e.preventDefault()
  if(!name || !quantity || !price) {
    showAlert(true, 'fail', 'Enter values')
  }
  else if(name && quantity && price && editing) {
    setList(list.map((item) => {
      if(item.id === editID) { //id kod editItem koji zelim da editujem
        return{...item,title: name, quantityValue: quantity, priceValue: price } //ostavi isti id, promeni title
      }
      return item
    })
    )
    setEditID(null)
    setEditing(false)
    showAlert(true, 'success', 'Value changed')
  }
  else{
    showAlert(true, 'success', 'Item added to the list')
    const newItem = {id: new Date().getTime().toString(), title: name, quantityValue: quantity, priceValue: price}
    setList([newItem, ...list])
  }
  setName('')
  setQuantity(1)
  setPrice('')
}

const editItem = (id) => {
  const specificItem = list.find((item) => item.id === id) //ako se id poklapaju, vrati mi njih
    setEditing(true)
    setEditID(id)
    setName(specificItem.title)
    setQuantity(specificItem.quantityValue)
    setPrice(specificItem.priceValue)
}

const removeItem = (id) => {
  setList(list.filter((item) => item.id !== id))
}

const handleClear = () => {
  setList([])
  setMainBudget('')
}

const handleBudget = (e) => {
  e.preventDefault()
  var totalPrice = 0
  {list.map((item) => {
    const {priceValue, quantityValue} = item
    const singlePrice = quantityValue * priceValue
    totalPrice = totalPrice + singlePrice 
  })
  }

  var leftover = mainBudget - totalPrice
  if(leftover >= 0){
    showAlert(true, 'success', `You can spend ${leftover}$ more`)
  } else {
    showAlert(true, 'fail', `You need to add ${-leftover}$`)
  }
}

useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list))
},[list])

  return (
    <div className="background">
    <section className="section">
      <form onSubmit={handleSubmit}>
        <h3>Grocery List</h3>
        <div className="budget">
          <label>Main Budget:</label>
          <input 
            type="number"
            className="main-budget"
            min="1"
            value={mainBudget}
            onChange={(e) => setMainBudget(e.target.value)}
          />
          <span>$</span>
          <button onClick={handleBudget} className="budget-btn">Calculate</button>
        </div>
        <div className="form">
          <input 
            type="text"
            className="name"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="number"
            className="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input 
            type="number"
            className="price"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span>$</span>
          <button className="submit-btn" type="submit">Add</button>
        </div>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      </form>
  
    {list.length <= 0 ? <p className="empty">List is empty!</p> : (   
        <div className="container">
          <List items={list} editItem={editItem} removeItem={removeItem} />
          <button className="clear-btn" onClick={handleClear}>Clear All Items</button>
          <Total price={price} quantity={quantity} list={list} />
          </div>
    )}
    </section>
    </div>
  );
}

export default App;
