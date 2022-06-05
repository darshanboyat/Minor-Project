const Problems = require('../db/model/problems')

module.exports = () =>{
    return {
        support(req, res){
            res.render('Support')
        },
        PostSupport(req, res){
            const {Name, Number, subject, detail} = req.body

            // Validate request 
             
            if(!Name || !Number || !detail){
                    req.flash('error', 'The required fields can not be empty!!!.')
                    req.flash('name', Name)
                    req.flash('number', Number)
                    req.flash('subject', subject)
                    req.flash('detail', detail)
                    console.log(req.body)
                    return res.redirect('/support')
            }            
            const problem = new Problems({
                name: Name,
                number: Number,
                subject: subject,
                discription: detail 
            })
            problem.save().then((problem)=>{
                req.flash('success', 'Your response has been recorded successfully.....')
                return res.redirect('/support')
            }).catch(err=>{
                console.log(err);
                req.flash('error', 'Something went wrong!!!')
                return res.redirect('/support')
            })
        }
    }
}