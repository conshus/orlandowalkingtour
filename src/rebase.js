var Rebase = require('re-base');
var config = {
  apiKey: "AIzaSyBs6d9RlcvwZc1RfezhN4XO2rx8EbGzEfU",
  authDomain: "orlando-walking-tour.firebaseapp.com",
  databaseURL: "https://orlando-walking-tour.firebaseio.com",
  projectId: "orlando-walking-tour",
  storageBucket: "orlando-walking-tour.appspot.com",
  messagingSenderId: "507448216914"
};
var base = Rebase.createClass(config);
export default base;
