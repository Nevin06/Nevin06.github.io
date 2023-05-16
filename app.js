// const express = require('express');
import express from 'express';
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';
// const path = require('path');
import path from 'path';
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});


app.post('/submit-form', async (req, res) => {
  // const name = req.body.contactName;
  // const email = req.body.contactEmail;
  // const message = req.body.contactMessage;
  // const subject = req.body.contactSubject;

  // fetch('https://formspree.io/f/xknaevnn', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name, email, subject, message }),
  // })
  //   .then(() => {
  //     res.send('Message sent successfully.');
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.send('Error sending message.');
  //   });
  try {
    const form = req.body;
    const response = await fetch('https://formspree.io/nevinthomas6767@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      res.send('Form submitted successfully!');
    } else {
      throw new Error('Form submission failed!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Serve static files from the 'Nevin06.github.io' directory
app.use(express.static('Nevin06.github.io'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
