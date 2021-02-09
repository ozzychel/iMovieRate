const express = require('express');
const app = express();
const port = 9000;
const morgan = require('morgan');
const parser = require('body-parser');
const Controllers = require('./controllers.js');

app.use(morgan('dev'));
app.use(parser.json());

app.post('/users/:userId', (req, res) => {
  Controllers.postMovieToUserList(req, res);
});

app.get('/users/:userId', (req, res) => {
  Controllers.getUserList(req, res);
});

app.patch('/users/:userId', (req, res) => {
  Controllers.patchDataInUserList(req, res);
});

app.get('/genre/movie/list', (req, res) => {
  Controllers.getGenresList(req, res);
});

app.get('/trending/movie', (req, res) => {
  Controllers.getTrending(req, res);
});

app.get('/movie/now_playing', (req, res) => {
  Controllers.getNowPlaying(req, res);
});

app.get(`/movie`, (req, res) => {
  Controllers.getMovieDataById(req, res);
});

app.get('/movie/:movieId/credits', (req, res) => {
  Controllers.getCastListFromServer(req, res);
});

app.get('/movie/:movieId/recommendations', (req, res) => {
  Controllers.getRecommendedList(req, res);
});

app.get('/movie/:movieId/videos', (req, res) => {
  Controllers.getMovieTrailer(req, res);
});

app.get('/ombd', (req, res) => {
  Controllers.getDataFromOMDB(req, res);
});

app.get('/search/movie', (req, res) => {
  Controllers.getMovieList(req, res);
});

app.get('/movie/images', (req, res) => {
  Controllers.getMovieImages(req, res);
});

app.get('/person', (req, res) => {
  Controllers.getPersonDataById(req, res);
});

app.get('/person/images', (req, res) => {
  Controllers.getPersonImages(req, res);
});

app.listen(port, () => {
  console.log(`[PROD_SERVER] App listening at http://localhost:${port}`);
});