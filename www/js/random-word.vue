<template>
  <div class="app">      
    <h1>Random Word</h1> 
    <button id="btn-get-random-word" @click="writeUserData">Get Random Word</button>
    <p>{{randomWord}}</p>
  </div>
</template>

<script>
var Firebase = require('firebase')

export default {
  data () {
    return {
      randomWord: ''
    }
  },
  methods: {
    getRandomWord: function() {
        this.randomWord = '...';
        this.$http.get(
            'http://api.wordnik.com:80/v4/words.json/randomWord?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        ).then(function (response) {
            this.randomWord = response.data.word;
        }, function (error) {
            alert(error.data);
        });
    },
    initFirebase: function() {
      // Set the configuration for your app
      // TODO: Replace with your project's config object
 
       // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = Firebase.storage();
            alert("4");

      this.randomWord = storage;
    },  

    writeUserData: function () 
    {
      //write
      Firebase.database().ref('users/' + "myID").set({
        username: "Stef",
        email: "Stef@h.de"
      });

      //read
      var userId = "myID";
      var username = "";
      var dummyThis = this;
      var bla = Firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
        var username = 'Anonymous';
        dummyThis.randomWord = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        
      });

      //this.randomWord = username;
    },
  }
}
</script>