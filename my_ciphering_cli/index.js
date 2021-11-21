const handleError = require('./error-handler');
const main = require('./main');

main(process.argv.slice(2)).catch(handleError);
