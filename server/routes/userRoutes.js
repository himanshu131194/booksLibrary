const api = require('../api/api');


module.exports = app =>{
     const createUser = async (req, res)=>{
         if(req.body){
           let accountDetails = {
               name : req.body.name,
               username: req.body.username,
               email  : req.body.email,
               password : req.body.password
           }
           let signup = await api.post('signup', accountDetails);
           console.log(signup);
         }
         res.render('index.hbs');
     }
    app.route('/')
        .get(createUser)
        .post(createUser);

    app.get('/book-list', async (req ,res)=>{
        let getAllBooks = await api.get('books',{
            limit : 1
        });
        console.log(getAllBooks.data);
        res.render('book-grid-wrs.hbs');
    })

}
