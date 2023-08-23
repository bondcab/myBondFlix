

// adds the http module which listens to server ports and responds to the client
//transfers data using http
const http = require('http'),
    fs = require('fs'),
    url = require('url');
    //above also adds the file system and url modules




//code to create the server. Function called when request parameter is made
http.createServer((request, response) => {
    let addr = request.url,
        //user generated url gets added to the variables addr then parsed
        q = url.parse(addr, true),
        filePath = '';

        //below adds information like url, time and date it was accessed to the log.txt file. 
        //If theres an error will console.log it otherwise will console.log that the information was successfully added
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimesStamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    //if the parsed url has the word documentation in, the file path gets updated to include the documentation file. 
    //if not inluded will open the homepage(index.html)
    if (q.pathname.includes('documentation')){
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
    
        response.writeHead(200, { 'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });

}).listen(8080); //listens for requests via this port which will trigger the function
console.log('My test server is running on Port 8080.');



