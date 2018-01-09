var Vue = require('vue')
var VueResource = require('vue-resource');
var RandomWord = require('./random-word.vue')
var Firebase = require('firebase')

Vue.use(VueResource);

var config = {
  apiKey: "AIzaSyD_qFJpbFMcr7JfQOasjmKMs0f1qpAzULw",
  authDomain: "fitnesstracker-aac74.firebaseapp.com",
  databaseURL: "https://fitnesstracker-aac74.firebaseio.com",
  projectId: "fitnesstracker-aac74",
  storageBucket: "fitnesstracker-aac74.appspot.com",
  messagingSenderId: "121877792052"
};

Firebase.initializeApp(config);
try {
  var storage = Firebase.storage();
}
catch (err)
{
  alert(err);
}
//            alert("S4");
//            alert(storage);

var vm = new Vue({
  el: 'body',
  components: {
    'random-word': RandomWord
  }
});