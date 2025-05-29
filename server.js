import express from 'express';
import db from './utils/database.js';
import cors from 'cors';
import router from './routes/api.js';
import bodyParser from 'body-parser';

async function init() {
  try {
    const app = express();
    const port = 3001;

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api', router);

    // database connection
    const result = db;
    console.log(`database status`, result);

    app.listen(port, () => {
      console.log(`server is runnng on http://localhost:${port}`);
    });
  } catch (error) {
    console.log('error');
  }
}

init();
