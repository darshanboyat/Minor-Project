const { json } = require("express")

module.exports = ()=>{

    return{
        cart(req, res){
            res.render('CartEmpty')
        },
        update(req, res){
            // let cart = {
            //     items: {
            //         pizzaId: {item: pizzaObject, qty: 0}
            //     },
            //     totalPrice: 0
            // }
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            
            // console.log(req.body)

            // if item is already exist in the cart 
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            return res.json({pizza: 'All ok'})
        }
    }
}