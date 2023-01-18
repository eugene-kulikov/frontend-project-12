const prefix = 'api/v1/';
const composePath = (paths) => prefix + paths.join('/');

const routes = {
  loginPath: () => composePath(['login']),
  registerPath: () => composePath(['signup']),
  chatPath: () => composePath(['data']),
};

export default routes;
