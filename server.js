// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const qs = require('qs');

// const app = express();

// app.use(cors());

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// app.post('/revoke-token', async (req, res) => {
//   const accessToken = req.query.access_token;
//   const clientId = req.query.client_id;

//   try {
//     const data = qs.stringify({
//       token: accessToken,
//       client_id: clientId,
//     });

//     await axios.post('https://accounts.spotify.com/api/token/revoke', data, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error revoking access:', error);
//     res.status(500).send('Error revoking access');
//   }
// });

// const PORT = 4000;

// app.listen(PORT, () => console.log('Server is running on port ' + PORT + '.'));