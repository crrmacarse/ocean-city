import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import axios from 'axios';

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.configure(express.rest());
app.use(express.errorHandler());

app.use('/authorize', {
  async find(params) {
    try {
      return await axios.get('https://slack.com/api/oauth.access', {
        params: {
          code: params?.query?.code,
          client_id: '723178304679.1104307770342',
          client_secret: 'd3aa828f7bd0f9f6bb12df78fc565098',
        },
      });
    } catch (error) {
      return {
        status: 'err',
        error,
      };
    }
  },
});

app.listen(3030).on('listening', () => {
  console.log('Feathers server listening on localhost:3030');
});
