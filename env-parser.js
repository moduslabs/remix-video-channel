var fs = require('fs');
var path = require('path');
var dotenv = require('dotenv');

dotenv.config();

var pkgJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
);

var refs = pkgJson?.env ?? [];

function createConfig() {
  return `  
const config = {
${refs.map((ref) => `  ${ref}: \`${process.env?.[ref] ?? ''}\``).join(',\n')}
};

export default config;
`;
}

// save config as string to file
fs.writeFileSync(path.join(__dirname, 'env.ts'), createConfig(), {
  encoding: 'utf8',
});
