const express = require('express');
const router = express.Router();
const axios=require('axios');
const apiKey = '609ce6f4';
/* GET users listing. */
router.get('/search', function (req, res, next) {
    /*
    req, res and nest are the call-back functions.
    req ->request (input)
    res ->response (output)
    next -> middleware part. It is just like continue 
    statement in C++, it will jump to another function 
    having the same endpoint- '/search' in this case. 
    If it doesn't finds it, it will return Not Found
    Use of next- It can be used fo rupdating the database,
    For example- Suppose your site stores cookies of a user
    his email,name,etc. NOw say he wants to change his
    name, so this next function helps in that
    */
    //console.log('User is trying to search somehing');
    // Query Parameters
    /* 
       express provides query parameters in req.query
       /search/<title> here you can write as 
       /search/title=ABCD these stuffs which will
       return out put as ABCD(simple html)
       when you will buid the site, your UI will cal like
       /search/title=James%20 - This will be called by our UI
       and processed by the backend. Now we will install AXIOS
       for calling. USe the API KEY NOW for OMDB. And go to users.js
       %20- Space in your search
    */
    //the following code has been copied from AXIOS Documentation
    //for making a request to another APIs Backend
    const search = req.query.title;
    const url = 'http://www.omdbapi.com/?apikey='+apiKey+'&s='+search;
    console.log('Trying to get data from ' + url);
    axios.get(url)
        .then(function (response) {
            // handle success
            console.log(response);
            res.send(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.send(error);
        });
})

// 3 different Libraries used: AXIOS- For doing a REST Call
// You could have used Curl any library you wish, Exposure: AXIOS LIBRARY.

router.get('/result/:imdbId', function (req, res, next) {
    // Route Parameters
    const imdbId=req.params.imdbId;
    const url = 'http://www.omdbapi.com/?apikey=' + apiKey + '&i=' + imdbId;
    console.log('Trying to get data from ' + url);
    axios.get(url)
        .then(function (response) {
            // handle success
            console.log(response);
            res.send(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.send(error);
        });
});

module.exports = router;
