const express = require('express');
const jphRoutes = require('./jph-routes');

const PORT = process.env.PORT || 3001;

const app = express();

/** registering routes */
app.use('/jph', jphRoutes);
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));