import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB';
require('dotenv').config();
var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000;


app.use(morgan('combined'))

//Chuyển dữ liệu sang kiểu json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init wen route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
//cai đặt: npm install --save-exact express@4.17.1
//npm install --save-exact body-parser@1.19.0 nodemon@2.0.12 @babel/core@7.15.5 @babel/node@7.15.4 @babel/preset-env@7.15.6
//npm install --save-exact dotenv@10.0.0
//npm install --save-exact morgan@1.10.0