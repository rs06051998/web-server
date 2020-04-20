const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geometry = require('./geocode')
const wheather = require('./forcast')

const app = express()

//Setting the Path
const h = path.join( __dirname,'../public')
const view_path = path.join(__dirname,'../template/views')
const partial_path = path.join(__dirname,'../template/partial')

//Using the Path

app.set('view engine', 'hbs')
app.set('views',view_path)
hbs.registerPartials(partial_path)

app.use(express.static(h))

//rensering the page
app.get('',(req,res)=>
{
   
   
    res.render('index',{
        title:'Home',
        name:'Rakesh'

    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({
            Error:'Please provide the address'})
    }
   
        geometry.geometry(req.query.address,(error,{latitude,longitude,location}={})=>
        {
            if(error)
            {
               return  res.send('Error'+error)
              
               
            }
        


            wheather.wheather(latitude,longitude,(error,{forecast})=>
        {
            if(error)
            {
               return  res.send('Error'+error)
            }
            res.send({
                forecast,
                address : location
                
            })

            
        })
    })
})
        

          


app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About me',
        name:'Rakesh'
    })
})



app.get('/about/*',(req,res)=>
{
    res.render('404',{
        title:'Error Occur',
        name:'contact to rakesh',
        error:'About not found'
    })
})

app.get('*',(req,res)=>
{
    res.render('404',{
        title:'Error Occur',
        name:'contact to rakesh',
        error:'website not accessible try again later'
    })
})


app.listen(3003,()=>
{
    console.log('Web server is running')
})
