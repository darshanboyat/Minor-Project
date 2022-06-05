const pizzas = require('../db/model/pizza')

module.exports = ()=>{
    return{
        async index(req, res){

            const menu = await pizzas.find()
            return res.render('index', {data: menu})
        },
        async succ(req, res){
            const menu = await pizzas.find()
            return res.render('SuccLoginBS', {data: menu})
        },
        about(req, res){
            res.render('Aboutus')
        },
        follow(req, res){
            res.render('FollowUS')
        },
        contact(req, res){
            res.render('Contact-us')
        },
        profile(req, res){
            res.render('MyProfileBS')
        },
    }
}