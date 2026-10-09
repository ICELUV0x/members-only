require('dotenv').config(); // ENV Module, loads .env into process.env
const app = require('./app'); // Path to configured Express app

const PORT = process.env.PORT || 3000; // Port from .env or fallback


app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Listen on PORT
