/* eslint-disable */

const shadowCss = [
  '3px 3px 0 #1cb799',
  '6px 6px 0 #fd6a33',
  '12px 12px 0 rgb(5,148,68)',
  '15px 15px 0 #fd6a33',
  '18px 18px 0 rgb(4,77,145)',
  '21px 21px 0 #ebebeb',
].join(', ')

const fancyCss = [
  'font-weight: bold',
  'font-size: 60px',
  'padding: 0px 15px',
  'color: #eba142',
  `text-shadow: ${shadowCss}`,
].join('; ');

console.log(
  '%c < XTENDOPS DEV TEAM />' + `%c \n \n \n http://dev-wiki.xtendops.com/ \n`,
  fancyCss,
  'font-size: 15px;',
  '\n JOIN WITH US TODAY! \n'
);
