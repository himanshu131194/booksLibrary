const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const app = express();

app.use(express.static(__dirname+'/client/public/'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', './client/views');
hbs.registerPartials(__dirname+'/client/views/partials/');

require('./server/routes/userRoutes')(app);

app.listen(3000, (err)=>{
   if(err)
      throw err;
   console.log(`server is running on 3000`);
})
