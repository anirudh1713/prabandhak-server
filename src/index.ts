const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3001 🚀');
});
