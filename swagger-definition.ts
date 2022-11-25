export default {
  openapi: '3.0.0',
  info: {
    title: 'Express API for wensite name',
    version: '1.0.0',
    description:
        `This is a REST API application made with Express. 
        It retrieves data from website name.`,
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'website',
      url: 'https://company.com',
    },
  },
  tags: [
    {
      name: 'Users',
      description: 'Users api',
    },
    {
      name: 'Todo',
      description: 'Todo api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{
    bearerAuth: [],
  }],
//   servers: [
//     {
//       url: '/api-docs',
//       description: 'Development server',
//     },
//   ],
};
