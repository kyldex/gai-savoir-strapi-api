export default {
  routes: [
    {
      method: 'GET',
      path: '/migrations',
      handler: 'migration.find',
      config: {
        auth: false,
      },
    },
  ],
};
