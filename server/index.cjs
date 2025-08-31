const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 300);
    });
    next();
});

server.post('/pay', (req, res) => {
    try {
      if (Math.random() > 0.5) throw new Error('payment was not successful')
      return res.status(200);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
