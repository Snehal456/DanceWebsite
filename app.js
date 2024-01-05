const express = require('express');
const path = require('path');
const app = express();
// app.use(express.json());
const port = 8000;
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Contact_Info');

// Defined mongoose schema
const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
   address:String,
    desc:String
    
  });

const contact = mongoose.model('info', contactSchema);


//  Express,static specific stuff
app.use('/static', express.static('static'));      // For serving static files


// Pug specific stuff
app.set('view engine','pug')                        // Set the template engine as pug
app.set('views', path.join(__dirname ,'views'))     // Set the views directory


// Endpoints
app.get('/',(req,res)=>{
    const con = "This is the best content" ;
    const params = {};
    res.status(200).render('index.pug',params)
})

app.get('/contact',(req,res)=>{
    const con = "This is the best content" ;
    const params = {};
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    const myData = new contact(req.body);
    myData.save().then(() =>{
        res.send("This item has beem saved to the databse")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the databse")
    })
   
    // res.status(200).render('contact.pug')
})

// Start the server
app.listen(port,()=> {
    console.log(`The application started successfully on ${port} !`);
});


