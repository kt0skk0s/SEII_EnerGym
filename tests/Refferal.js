const test = require('ava').default;
const listen = require('test-listen');
const got = require('test-got');
const http = require('http');

const app = require('../index.js');


test.before( async (t) => {  //async kai await panta mazi simeni asixroni
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.entend({http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
}); 


test.after( (t) => {  
    t.context.server.close();
  }); 



 /* 
   test('Test Val' ,async  (t) => {
    const a=1;
    t.is(a+1,2);
  });
    t.is(statusCode,200);
    t.assert(body.success);
    console.log(body);
    t.is(body.sources ,1) ;
  });
*/