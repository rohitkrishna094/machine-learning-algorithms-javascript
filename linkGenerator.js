let fs = require('fs');
let path = require('path');

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

// Change these
let currentDir = 'machine-learning-algorithms-javascript';
let heading = 'machine-learning-algorithms-javascript';

let readmeFile = __dirname + '/README.md';

let dirs = getDirectories('./');
let links = [];
for (let i = 1; i < dirs.length; i++) {
  links.push(`https://rohitkrishna094.github.io/${currentDir}/${dirs[i]}/`);
}

let content = `# [${heading}](https://rohitkrishna094.github.io/${currentDir}/)\n\n`;
content += 'Click the links below for their demonstration\n\n';
for (let i = 0; i < links.length; i++) {
  content += `* [${dirs[i + 1]}](${links[i]})\n`;
}
fs.writeFileSync(readmeFile, content);
