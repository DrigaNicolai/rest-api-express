const Router = require('express');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const router = new Router();

const routes = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .map(route => route.replace(".js", ""));

routes.forEach(route => {
  router.use(`/${route}`, require(`./${route}`));
});

module.exports = router;
