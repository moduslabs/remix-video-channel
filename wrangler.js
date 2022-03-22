const { exec } = require('child_process');

const wrangler = exec(
  'npm run dev-wrangler -- --binding YT_API_KEY=' + process.env.YT_API_KEY
);

wrangler.stdout.on('data', function (data) {
  console.log(data);
});

// wrangler.stdout.on('data', function (data) {
//   console.log(data.toString());
// });

// wrangler.stderr.on('data', function (data) {
//   console.log(data.toString());
// });

// wrangler.on('exit', function (code) {
//   console.log('child process exited with code ' + code.toString());
// });

// exec(
//   'npm run dev-wrangler --binding YT_API_KEY="' + process.env.YT_API_KEY + '"'
// );
