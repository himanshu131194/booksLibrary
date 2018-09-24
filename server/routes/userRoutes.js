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

    app.get('/book-list/:paginationcount?', async (req ,res)=>{
        let paginationCount = req.params.paginationcount || 0, prev=0, next=0;
            if(paginationCount>1){
               prev = parseInt(paginationCount)-1;
            }
            next = parseInt(paginationCount)+1;
            limit = 12;
        let getAllBooks = await api.get('books',{
            limit : limit,
            offset : parseInt(paginationCount)*limit
        });
        let renderData = "";
        if(getAllBooks.status==200){
           renderData = getAllBooks.data.books
        }else{
           renderData = getAllBooks.message
        }
        console.log(getAllBooks);
        let pagination = {
            'prev': prev,
            'next': next
        }
        res.render('book-grid-wrs.hbs', { data : renderData, pagination });
    })

}
