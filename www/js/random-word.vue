<template>
  <div class="app">      
    <h1>Random Word</h1> 
    <button id="btn-get-random-word" @click="writeDateInfo">Get Random Word</button>
    <p>Start Date: {{startDate}}</p>
    <p>End Date: {{endDate}}</p>
    <p>Number of Days: {{numberOfDays}}</p>
  </div>
</template>

<script>
var Firebase = require('firebase');
var dateFormat = require('dateformat');

var MyDateFormat = "yyyy-mm-dd";

export default {
  data () {
    return {
      numberOfDays: '',
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    getnumberOfDays: function() {
        this.numberOfDays = '...';
        this.$http.get(
            'http://api.wordnik.com:80/v4/words.json/numberOfDays?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        ).then(function (response) {
            this.numberOfDays = response.data.word;
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

      this.numberOfDays = storage;
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
        dummyThis.numberOfDays = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        
      });

      //this.numberOfDays = username;
    },

    writeDateInfo: function ()
    {
      var dummyThis = this;

      var now = dateFormat(new Date(), MyDateFormat);
      
      this.writeSingleDateInfo(now, 1);
      this.writeSingleDateInfo("2018-01-08", 1);
      this.writeSingleDateInfo("2018-01-07", 1);

      //var allDays = this.readAllDayInfoFromDB();
      //var validDays = this.processDays(allDays);

      this.readAllDayInfoFromDB()
        .then(function(allDays) {
          var validDays = dummyThis.processDays(allDays.val())
        });
    },

    writeSingleDateInfo: function (date, val) 
    {
      var now = new Date();
      //var doy = this.dayOfYear();
      now = dateFormat(now, MyDateFormat);

      //write
      Firebase.database().ref('Tracker/' + date).set({
        value: val
      });

      // //read
      // var userId = "myID";
      // var username = "";
      // var dummyThis = this;
      // var bla = Firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
      //   var username = 'Anonymous';
      //   dummyThis.numberOfDays = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        
      // });

      //this.numberOfDays = username;
    },

    readAllDayInfoFromDB: function()
    {
      // Firebase.database().ref('Tracker').once('value').then(function(snapshot) {
      //   return snapshot.val();
      // });
      return Firebase.database().ref('Tracker').once('value');
    },

    processDays: function(allDays)
    {
      var count = 0;
      var lowest = undefined;
      var highest = undefined;

      $.each(allDays, function(i, v) {
        var dateObj = new Date(i);
        
        if (lowest == undefined || lowest > dateObj) {
          lowest = dateObj;
        }
        else if (highest == undefined || highest < dateObj) {
          highest = dateObj;
        }
        
        if (v.value == 1) {
          count++;
        }
      });

      this.startDate = dateFormat(lowest, MyDateFormat);
      this.endDate = dateFormat(highest, MyDateFormat);
      this.numberOfDays = count;
    },

    // dayOfYear: function()
    // {
    //   var now = new Date();
    //   var start = new Date(now.getFullYear(), 0, 0);
    //   var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    //   var oneDay = 1000 * 60 * 60 * 24;
    //   var day = Math.floor(diff / oneDay);
      
    //   return day;
    // }
  }
}
</script>