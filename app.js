require('dotenv').config();
const express = require('express');
const exampleController = require('./controllers/example');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use('/examples', exampleController);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});