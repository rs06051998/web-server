
const request = require('request')
const wheather = (latitude , longitude , callback)=>
{
    const url ='http://api.weatherstack.com/current?access_key=a688ebe813fb640f3a20a9b4602209d4&query='+latitude+','+longitude+''
    request({url , json:true},(error,{body})=>{
        if(error)
        {
            callback('Not able to connect to weather API',undefined)
        }
        else if(body.error)
        {
            callback('Not found',undefined)
        }
        else
        {
            callback(undefined,{
                forecast :  body.current.weather_descriptions[0]+' It is currently '+
                body.current.temperature +' degrees out. It feels like '+
                body.current.feelslike
            }
                

            )
                
        }   
    })
}

module.exports = {
    wheather 
    }