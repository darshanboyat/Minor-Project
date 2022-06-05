const Order = require('../db/model/order')
const moment = require('moment')
module.exports = ()=>{
        return{
                store(req, res){
                        const order = new Order({
                                customerId: req.user._id,
                                items: req.session.cart.items,
                                user: req.user
                        })
                        order.save().then(result => {
                                req.flash('success', 'Order placed successfully....')
                                delete req.session.cart
                                return res.redirect('/myorder')
                        }).catch(err =>{
                                req.flash('error', 'Something went wrong')
                                console.log(err)
                                return res.redirect('/error')
                        })
                 },
                async order(req, res){
                        const order = await Order.find({customerId: req.user._id})
                        res.render('MyOrder', {orders: order, moment: moment})
                }
        }
}