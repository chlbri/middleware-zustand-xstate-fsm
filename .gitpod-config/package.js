const edit = require('edit-json-file');
const shell = require('shelljs');
const fs = require('fs');

const package = edit(`${process.cwd()}/package.json`);

const repository = shell
  .exec('git config --get remote.origin.url', {silent: true})
  .replace(/\r?\n|\r/g, '');

package.set('repository', repository);

package.set('description', repository);

package.save();

fs.writeFileSync(`${process.cwd()}/README.md`, `# ${repository}`);
