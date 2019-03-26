import * as shell from 'shelljs';

shell.cp(
  '-R',
  //   ['src/public', '.ebextensions', 'package.json', '.npmrc'],
  ['src/public'],
  'dist'
);
