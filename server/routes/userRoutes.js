const api = require('../api/api');


module.exports = app =>{
     const createUser = async (req, res)=>{
         if(req.body){
         }
         let sendJson = {
             key : "Himanshu"
         }
         let signup = await api.signup("shivam", "1234343434");
         console.log(signup);
         res.render('index.hbs', sendJson);
     }
     app.route('/')
        .get(createUser)
        .post(createUser);

    app.get('/book-list', (req ,res)=>{
        res.render('book-grid-wrs.hbs');
    })

}
