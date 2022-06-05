const bcrypt = require('bcrypt')//Package to Hash password
const User = require('../db/model/user')
const passport = require('passport')
module.exports = ()=>{
    return {
        login(req, res){
            res.render('LoginPageBS')
        },
        PostLogin(req, res, next){
            passport.authenticate('local', (err, user, info)=>{
                    if(err)
                    {
                        req.flash('error', info.message)
                        return next(err);
                    }
                    if(!user)
                    {
                        req.flash('error', info.message)
                        return res.redirect('/login');
                    }
                    req.login(user, (err)=>{
                        if(err){
                            req.flash('error', info.message)
                            return next(err)
                        }
                        return res.redirect('/success');
                    })
            })(req, res, next)
        },
        register(req, res){
            res.render('Registration')
        },
        async PostRegister(req, res){
            const {name, number, address, zip, password} = req.body
            // Validate request 
             
            if(!name || !number || !address || !password || zip != '466001'){
                if(!name || !number || !address || !password){
                    req.flash('error', 'The required fields can not be empty!!!.')
                    req.flash('name', name)
                    req.flash('number', number)
                    req.flash('address', address)
                    req.flash('zip', zip)
                    console.log('inside empty field')
                    return res.redirect('/register')
                }
                // console.log(req.body)
                if(zip != '466001')
                {
                    req.flash('outstation', 'Sorry currently we are serve our services only in Sehore!!!')
                    console.log('zip code not valid')    
                    return res.redirect('/register')               
                }
            }

            User.exists({number: number}, (err, result)=>{
                if(result){
                req.flash('error', 'Number is already taken.....')
                req.flash('name', name)
                req.flash('number', number)
                req.flash('address', address)
                req.flash('zip', zip)
                console.log('already exist')
                return res.redirect('/register')
                }
            })

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            // Register new user 
            const user = new User({
                name: name,
                number: number,
                address: address,
                password: hashedPassword
            })
            user.save().then((user)=>{
                return res.redirect('/login')
            }).catch(err=>{
                console.log(err);
                req.flash('error', 'Something went wrong!!!')
                return res.redirect('/register')
            })
            // req.flash('success', 'Congratulation to become Pizza Time family member....')
            // console.log(req.body)
        },
        logout(req, res){
            req.logout()
            return res.redirect('/')
        }
    }
}