var express = require('express');
var fetch = require('node-fetch');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.get('/api/get_trips', (req, res) => {
    const config = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    };
    fetch(`https://api.resrobot.se/v2/trip?key=${process.env.TRAFIKLAB_APIKEY}&originId=740021685&destId=740098556&products=32&format=json`, config)
      .then( response => {
        response.json().then( data => {
          const trips = data['Trip'].map( trip => {
            return trip['LegList']['Leg'][0];
          });
          res.send(JSON.stringify(data));
        });
      })
      .catch(err => {
        res.send(JSON.stringify(err));
    });
});

var server = app.listen(app.get('port'), () => {
  console.log('Serve me some trips, man!');
});
