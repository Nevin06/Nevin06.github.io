// const express = require('express');
import express from 'express';
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';
import path from 'path';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.post('/submit', (req, res) => {
  const name = req.body.contactName;
  const email = req.body.contactEmail;
  const message = req.body.contactMessage;
  const subject = req.body.contactSubject;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
