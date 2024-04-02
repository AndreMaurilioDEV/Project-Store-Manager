const express = require('express');
const productsRoutes = require('./Routes/productsRoute');
const salesRoutes = require('./Routes/salesRoute');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(express.json());
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use(errorMiddleware);

module.exports = app;
