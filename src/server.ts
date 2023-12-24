import { createServer } from 'http';
import { parse } from 'url';
import next from'next';
import ServerData from './server-data';
import Test from './singleton-test';
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000;

const findSingletonInCache = () => {
  const c = require.cache || [];
  Object.entries(c).find(([key, value]) => {
    if(key.includes('singleton')) {
      console.log(key);
      console.log(value);
    }
  });
};

(async function init () {
  // when using middleware `hostname` and `port` must be provided below
  const app = next({ dev, hostname, port, conf: {
    experimental: {
      serverComponentsExternalPackages: ['./singleton-test'],
    }
  } })
  const handle = app.getRequestHandler()

  const data = await ServerData.getData();
  console.log("Process ID (Custom server)", process.pid);
  // console.log(require.cache)
  Test.setup();
  console.log("BEFORE NEXT STARTS");
  findSingletonInCache();
  console.log(data);

  setTimeout(() => {
    console.log("AFTER NEXT STARTS");
    findSingletonInCache();
  }, 20000);

  app.prepare().then(async () => {
  
    createServer(async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url!, true)
        const { pathname, query } = parsedUrl
   
        if (pathname === '/a') {
          await app.render(req, res, '/a', query)
        } else if (pathname === '/b') {
          await app.render(req, res, '/b', query)
        } else {
          await handle(req, res, parsedUrl)
        }
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('internal server error')
      }
    })
      .once('error', (err) => {
        console.error(err)
        process.exit(1)
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`)
      })
  })
})();