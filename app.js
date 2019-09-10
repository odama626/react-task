const gatsyExpress = require('gatsby-plugin-express');
const express =  require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const randomNumber = require('./randomNumber');

app.use(cors());
app.use(express.static(__dirname + '/public/')); 
app.use(gatsyExpress('./gatsby-express.json', {
  publicDir: `${__dirname}/public`,
  template: `${__dirname}/public/404/index.html`,

  redirectSlashes: true,
}));

io.on('connection', function (socket) {
  console.log('connect');

  var unsubscribe = randomNumber.subscribe(function (number) {
    console.log(number);

    var data = {
      value: number,
      timestamp: Number(new Date()),
    };

    socket.emit('data', data);
  });

  socket.on('disconnect', function () {
    console.log('disconnect')
    unsubscribe();
  });
});

const port = process.env.port || 3000;

http.listen(port, () => console.log(`listening on port ${port}`));
