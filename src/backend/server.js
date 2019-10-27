const http = require('http');
const fs = require('fs');
const path = require('path');

const paths = [
    [/index\.html$/i, '../frontend/index.html', 'text/html'],
    [/app\.js$/i, '../frontend/app.js', 'text/javascript']
];

http.createServer((request, response) => {
    console.log('request.url', request.url);
    //    const item = paths.find(item => item.re.test(request.url));

    paths.find(([re, filepath, type]) => {
        const matches0 = request.url.match(re);
        if(!matches0) {
            return;
        }

        console.log('matches0: ', matches0);

        fs.readFile(path.join(__dirname, '../frontend/', request.url), (err, content) => {
            if (err){
                console.error(err);
                response.writeHead(400, {});
                response.end();
                return;
            }
            response.writeHead(200, {'Content-Type': type});
            response.write(content);
            response.end();
        });
    });
}).listen(7000);
