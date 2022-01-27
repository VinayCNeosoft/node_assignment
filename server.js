const http = require('http')
const fs = require('fs')
const qs= require('querystring')

http.createServer((req,res)=>{
    if(req.method === "GET" && req.url==="/")
    {

            const data = JSON.parse(fs.readFileSync('empdetails.txt').toString())
            const empshow=fs.readFileSync('empshow.txt').toString()
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(empshow)
            res.write('<table class="table"><thead class="thead-dark"><tr><th>#</th><th>Name</th><th>Age</th><th>City</th><th>Salary</th></tr><thead><tbody class="thead-light>')
            data.map((item,index)=>{
                return(
                res.write(`<tr class="table"><td>${index+1}</td><td>${item.name}</td><td>${item.age}</td><td>${item.city}</td><td>${item.salary}</td></tr>`))
            })
            res.write('</tbody></table> <br/>')
            res.end(' </div></body></html>')
    }


    else if(req.method == "GET" && req.url == '/addemployee'){
        const data = fs.readFileSync('index.html').toString()
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        res.end()

    }
    else if(req.method === "POST" && req.url==="/addemployee"){
        var body = "";
        req.on('data', function (chunk) {
            
          body += chunk;
        });
        console.log(body)
        req.on('end', function () {
          console.log('POSTed: ' + body);
          const data=body.split("&")
          console.log(data)
          const dataset=[]
          data.map(item=>{
              const itemdata=item.split('=')
              dataset.push(itemdata)
              
         }) 
         console.log(dataset)
         console.log(dataset[0][1])
         const datapush=(JSON.parse('{'+'"'+dataset[0][0]+'"'+':'+'"'+dataset[0][1]+'"'+','+'"'+dataset[1][0]+'"'+':'+'"'+dataset[1][1]+'"'+','+'"'+dataset[2][0]+'"'+':'+'"'+dataset[2][1]+'"'+','+'"'+dataset[3][0]+'"'+':'+'"'+dataset[3][1]+'"'+'}'))
         console.log(datapush)
         const empdata = JSON.parse(fs.readFileSync('empdetails.txt').toString())
         empdata.push(datapush)
         fs.writeFileSync('empdetails.txt',JSON.stringify(empdata)) 

        })
        res.end('<h1 style="margin:20px">Employee Registerd</h1>  <a  class="btn btn-primary" href="/">Go Home</a>')

    }
}).listen(6677)