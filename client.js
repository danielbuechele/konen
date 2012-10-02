var exec = require('child_process').exec;
var vlc;
var http = require('http');




http.createServer(function (req, res) {

    if(req.headers.fadeOut!="") {fadeOut();}
    

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('ack\n');

}).listen(1337, '127.0.0.1');


console.log('Server running at http://127.0.0.1:1337/');


vlc = exec('/Applications/VLC.app/Contents/MacOS/VLC /Volumes/User/Desktop/mysong.mp3 --intf macosx --extraintf http',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

vlc.on('exit',function (code) {
    console.log('VLC quit');
});



function fadeOut() {

    setTimeout(stepDown,500);
    setTimeout(stepDown,1000);
    setTimeout(stepDown,1500);
    setTimeout(stepDown,2000);
    setTimeout(stepDown,2500);

    
}

var i = 255;
function stepDown(code) {
    console.log(i);
    var req = http.get({host: 'localhost',port: 8080,path: '/requests/status.xml?command=volume&val='+i});
    i = i-50;
}


//vlc.kill();