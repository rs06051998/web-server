const request = require('request')
const geometry = (address,callback)=>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicnIxczI2IiwiYSI6ImNrOHk4anNudTB1ZnIzbm1pZmRvYTBweXcifQ.m9OETQQ6a60d1sZ3TaHhQw&limit=1'
    request({url , json:true} , (error,{body})=>{
        if(error)
        {
           callback('Not able to connect to GEO API',undefined)
        }
        else if(body.features.length==0)
        {
            callback('No search found',undefined);    
        }
        else
        {
            callback(undefined,
                {
                    latitude    :   body.features[0].center[1],
                    longitude   :   body.features[0].center[0],
                    location  :   body.features[0].place_name
                })
        }
    })
}




module.exports = {
                geometry
                }