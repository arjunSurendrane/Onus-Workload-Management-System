/**
 * Connect to Port
 * @param {Function} app - express()
 */
const connecToPort = (app) => {
  // connected to localhost
  app.listen(4000, () => {
    console.log("server connencted to localhost : 4000");
  });
};

export default connecToPort;
