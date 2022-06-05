let addToCart = document.querySelectorAll('.add-to-cart')
function updateCart(pizza) {
  axios.post('/update-cart', pizza).then(res => {
    console.log(res)
  })
}

addToCart.forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    let pizza = JSON.parse(btn.dataset.pizza)
    updateCart(pizza) 
  })
})

let place = document.querySelectorAll('.Order')

place.forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    let pizza = JSON.parse(btn.dataset.pizza)
    placeOrder(pizza) 
  })
})
