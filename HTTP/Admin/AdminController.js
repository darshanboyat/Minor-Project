const Order = require('../../db/model/order')
const moment = require("moment")
const User = require('../../db/model/user')

module.exports = ()=>{
    return {
       
        async index(req, res) {
                const order = await Order.find()
                
                // const id_order = await Order.find({_id: {$eq: {data}}}/)
                var x = Object.values(order)
                res.render('admin/order', {orders: order, x: x, data: id_order, moment: moment})
        }
    }
}