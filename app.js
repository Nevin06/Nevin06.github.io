import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';

const app = express();

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});


app.post('/submit-form', (req, res) => {
  const name = req.body.contactName;
  const email = req.body.contactEmail;
  const message = req.body.contactMessage;
  const subject = req.body.contactSubject;
  const form = req.body;

  fetch('https://formspree.io/f/xknaevnn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  })
    .then(() => {
      res.send('Message sent successfully.');
    })
    .catch((err) => {
      console.error(err);
      res.send('Error sending message.');
    });
});

// Serve static files from the 'Nevin06.github.io' directory
app.use(express.static('Nevin06.github.io'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
