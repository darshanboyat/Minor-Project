const ControllerRoutes = require('../HTTP/main')
const AuthRoutesController = require('../HTTP/auth')
const CartController = require('../HTTP/cartController')
const SupportRoutes = require('../HTTP/support')
const orderController = require('../HTTP/OrderController')
const guest = require('../HTTP/Middlewares/guest')
const guest2 = require('../HTTP/Middlewares/guest2')
const Admin = require('../HTTP/Admin/AdminController')


module.exports = (app)=>{
    
app.get('/', guest, ControllerRoutes().index)

app.get('/success', guest2, ControllerRoutes().succ)

app.get('/login', guest, AuthRoutesController().login)
app.post('/login', AuthRoutesController().PostLogin)

app.get('/register', guest, AuthRoutesController().register)
app.post('/register', AuthRoutesController().PostRegister)

app.post('/logout', AuthRoutesController().logout)

app.get('/cart', guest2, CartController().cart)

app.post('/update-cart', CartController().update)

app.get('/about', ControllerRoutes().about)

app.get('/follow', ControllerRoutes().follow)

app.get('/contact', ControllerRoutes().contact)

app.get('/profile', guest2, ControllerRoutes().profile)

app.get('/support', SupportRoutes().support)
app.post('/support', SupportRoutes().PostSupport)

app.post('/order', guest2, orderController().store)
app.get('/myorder', guest2, orderController().order)

app.get('/error', (req, res)=>{
    res.render('error')
})
app.get('/admin/order', Admin().index)

}