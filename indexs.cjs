const http=require('http')
http.createServer((request,response)=>{
    console.log(request)
    console.log(response)
    response.writeHead(200,{'content-type':'text/html'})
    response.write('HELLO')
    response.end()
}).listen(9999)

console.log("HELLO")