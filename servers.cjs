console.log('Hello')
const express = require('express')

const app = express()
app.get('/',function(request,response){
    response.send('welcome')
})
app.listen(9999)
