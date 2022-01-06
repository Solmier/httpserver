const http = require('http');
const url = require('url');
const { parse } = require('querystring');
let array = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница'];
let count = '0';

http.createServer((request, response) => {
  console.log("сервер запущен")
   

    console.log('сервер работает');
    if (request.method == 'GET') {
        // GET -> получить обработать
        console.log(request.method); // !!!!
        let urlRequest = url.parse(request.url, true);
        // console.log(urlRequest);
        console.log(urlRequest.query.test); // ! GET Params
        if (urlRequest.query.test % 2 == 0) {
            response.end('even');
        }
        console.log(JSON.stringify(array))
        response.end(JSON.stringify(array));
    }
    else
    if (request.method == 'POST') 
    {
        let body = '';
        request.on('data', chunk => 
        {
            body += chunk.toString();
        });
        
        request.on('end', () => {
            console.log(body);
            for(let i=(Number(count)); i<(Number(count))+1; i++)
            {
              array[i] = (body);  
            }
            if(count!=4)
            {
              count++;
            }
            else
            count=0;

            console.log(array);  
            response.write("список обновлен");
            response.end();
        });
    }
}).listen(3000);