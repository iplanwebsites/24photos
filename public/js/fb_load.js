window.fbAsyncInit = function() {
  
  var dataFB = {
     appId      : '306188538557', // App ID LIVE
     channelUrl : '//http://photos24.heroku.com/channel.html', // Channel File
     status     : true, // check login status
     cookie     : true, // enable cookies to allow the server to access the session
     xfbml      : true  // parse XFBML
   }
   if(window.location.host == "127.0.0.1:9393"){
     window.dev = 1; 
     dataFB['appId'] = '163285813778579';
     dataFB['channelUrl'] = '//127.0.0.1:9393/channel.html';
   }
  
   FB.init(dataFB);


   console.log('fb here!');
   
   // Additional initialization code here
   FB.getLoginStatus(function(response) {
     showMe(response);
     FB.Event.subscribe('auth.sessionChange', showMe);
   });
   
   
 };

 // Load the SDK Asynchronously
 (function(d){
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));
  
  
  

  

    var div    = document.getElementById('me');
    showMe = function(response) {
       console.log('fb statused!!');
      if (response.status !== 'connected') {
        div.innerHTML = '<em>Not Connected</em>';
      } else {
        FB.api('/me?fields=id,name,languages,link,username,timezone,verified,bio, birthday,education,email,hometown,interested_in,location,religion,significant_other,website,user_work_history', 
        function(response) {
          //http://developers.facebook.com/docs/reference/api/user/
          //You can choose the fields you want returned using the fields query parameter https://graph.facebook.com/me?fields=id,name
          
         // var html = '<table>';
        // updateFields(response);
     
          
          
         //console.log(html) ;
          //div.innerHTML = html;
        });
      }
    };



  
