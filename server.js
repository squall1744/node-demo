const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const server = http.createServer((request, response) => {
  let parsedUrl = url.parse(request.url, true)
  let path = request.url 
  let query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  let pathNoQuery = parsedUrl.pathname
  let queryObject = parsedUrl.query
  let method = request.method

  /******** 从这里开始看，上面不要看 ************/
  
  if(path === '/style.css') {
    response.setHeader('Content-Type', 'text/css; charset=UTF-8')
    response.end(`h1 {
      color: #3d45f2;
    }
    
    p {
      font-size: 12px;
      color: #12416a;
    }`)
  }else if(path === '/') {
    response.setHeader('Content-Type', 'text/html; charset=UTF-8')
    response.end(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>欢迎界面</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>Hello world</h1>
      <p>邵帅</p>
      <script src="/main.js"></script>
    </body>
    </html>`)
  }else if(path === '/main.js'){
    response.setHeader('Content-Type', 'text/javascript; charset=UTF-8')
    response.end(`alert('this is javascript')`)
  }else {
    response.statusCode = 404
    response.end('NOT_FOUND')
  }
  

  /******** 代码结束，下面不要看 ************/
  
})

server.listen(port)
console.log(`监听 ${port} 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:${port}`)


