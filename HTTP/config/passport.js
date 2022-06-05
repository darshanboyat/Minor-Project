const Local = require('passport-local').Strategy
const User = require('../../db/model/user')
const bcrypt = require('bcrypt')

module.exports = (passport)=>{
    passport.use(new Local({usernameField: 'number'}, async (number, password, done)=>{
        const user = await User.findOne({number: number})

        if(!user)
        {
            return done(null, false, {message: 'No user with this number!!!'})
        }
        bcrypt.compare(password, user.password).then(match=>{
            if(match)
            {
                return done(null, user, {message: 'Logged in Successfully....'})
            }
            return done(null, false, {message: 'Wrong username or password!!!'})
        }).catch(err=>{
            console.log(err)
            return done(null, false, {message: 'Something went wrong!!!'})
        })
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user)
        })
    })
}