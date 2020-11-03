const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const routers = require('./src/routes/routers');
app.use('/api/v1', routers);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
