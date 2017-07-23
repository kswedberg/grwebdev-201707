const path = require('path');
const rsync = require('rsyncwrapper');
const chalk = require('chalk');

require('dotenv').config();

const {REMOTE_USER, REMOTE_HOST, REMOTE_PATH} = process.env;

rsync({
  src: path.join(process.cwd(), 'public/'),
  dest: `${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}`,
  ssh: true,
  args: ['-avzP'],
  onStdout: (data) => {
    console.log(data.toString());
  },
}, (err, stdout, stderr, cmd) => {
  if (err) {
    console.error(err);
    console.log(chalk.keyword('orange')(cmd));

    return console.log(stderr);
  }

  console.log(chalk.green('Finished deploying using rsync with the following command:'));
  console.log(chalk.keyword('orange')(cmd));
});
