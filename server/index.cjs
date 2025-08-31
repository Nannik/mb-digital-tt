const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// https://www.videoplaceholder.com/
const vidLinks = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
]

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
    if (Math.random() > 0.7) throw new Error("Bad luck with payment :( Try again")
    return res.status(200).json(vidLinks[req.body.id - 1])
  } catch (e) {
    console.log('pay error');
    return res.status(500).json({ message: e.message });
  }
});

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});

server.use(router);
