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
         }
         res.render('index.hbs');
     }
    app.route('/')
        .get(createUser)
        .post(createUser);

    app.get('/book-list/:paginationcount?', async (req ,res)=>{
        //PAGINATION LOGIC
        let paginationCount = req.params.paginationcount || 1, prev=0, next=0;
        let columnCounts = 6; //pageCountStart = 1, pageCountEnd = 6;
            if(paginationCount>1)
               prev = parseInt(paginationCount)-1;
            next = parseInt(paginationCount)+1;
            let columnCountsJSON = {};
            //if(paginationCount>6){
               let pageCountStart = paginationCount;
               let pageCountEnd = parseInt(paginationCount)+columnCounts;
            //}
            for(let i= pageCountStart; i<=pageCountEnd; i++) {
                 columnCountsJSON[i] = { count: i,  url: '/book-list/'+i }
            }
            limit = 12;
        //PAGINATION END

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
            'next': next,
            columnCountsJSON
        }
        res.render('book-grid-wrs.hbs', { data : renderData, pagination });
    })

}
