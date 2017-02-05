var fs = require('fs');
var request = require('request');


const download = (uri, filename, callback) =>{
  request.head(uri, (err, res, body) => {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    let goToPath = 'public/' + filename;
    request(uri).pipe(fs.createWriteStream(goToPath)).on('close', callback);
  });
};


module.exports = (imageURL, res) => {

    let imageName = 'images/' + new Date().getTime() +'.jpg';
    let toBeSent = { newImgSrc: imageName, fromUrl: imageURL, imageID: imageName.split('.jpg')[0]  };
    download(imageURL , imageName, () => {
            res.send(JSON.stringify(toBeSent));
            res.end();
    });

}
