/* Author: FELIX M  

*/
// explicit url: /me?fields=id,name,languages,link,username,timezone,verified,bio, birthday,education,email,hometown,interested_in,location,religion,significant_other,website,user_work_history'


$(function(){
  
function updateFields(response){
    //Populate all fields matching to the received response! according to these values!
    window.user = response;
    for (var key in response) {
      console.log(key + '::' +response[key]);
      console.log(response[key]);
      if(key =='location' || key =='hometown'){
        var s = response[key]['name'];
        
      }else if(key =='birthday'){
       var today=new Date();
        var birth = new Date(response[key])
        var one_day=1000*60*60*24; //in ms
        var s = Math.floor((today.getTime() - birth.getTime())/(one_day/365));
      }else{
        var s = response[key];
      }
      $('section#form input[name="'+key+'"]').val(s);
      // Stuff to disable (array)
     // ar_disable = split('name email location', ' ')
      
      // add To Fb Object as well...
      
    }
}

function lockFields(){
  
}  


function showForm(){
  //scroll to top
  $('window').scrollTop(0);
  $('section#home').hide();
  $('section#end').hide();
  $('section#form').show();
  $('section#merci').hide();
}

function showMerci(){
  //scroll to top
  $('window').scrollTop(0);
  $('section#home').hide();
  $('section#end').hide();
  $('section#form').hide();
  $('section#merci').show();
}

function showHome(){
  //scroll to top
  $('window').scrollTop(0);
  $('section#home').show();
  $('section#end').show();
  $('section#form').hide();
  $('section#merci').hide();
}

/////////////////////////////
//   WIRE FB Connect BT
/////////////////////////////
$('a.connect').click(function(){
  showForm();
});
$('button.connect').click(function(){ //same deal, but fetch FB data first...
    console.log('connect FB');
     FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       updateFields(response);
       
       lockFields(); //lock the field
       showForm();
    
      /* FB.logout(function(response) {
         console.log('Logged out.');
       });*/
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 }, {scope: 'email user_about_me user_birthday user_education_history email user_hometown user_location user_relationships user_website'});
});

$('section#form button.submit').click(function(){
  $('form#apply').submit();
})

/////////////////////////////
//   SUBMIT Application
/////////////////////////////
$("form#apply").submit(function(e){
    e.preventDefault();
    var $inputs = $('#apply :input');
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    /*
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    values['fb'] = window.user;
    console.log(values);*/
    
    var values2 = {};
    $.each($('#apply').serializeArray(), function(i, field) {
    values2[field.name] = field.value;
    });
    values2['fb'] = window.user;
    console.log(values2);
    $.post("/apply", values2, function(json){
      if(json == true) {
        showMerci();
       // $("form p#email_p").html("Thanks! We'll be in touch");
      }else{
				alert('something went wrong with the server... please try again...')
}
    }, "json");
    
    /*
    $.post("/apply", {
				"email" : $("#email").val(),
				"date"	: new Date()
				}, function(json){
      if(json == true) {
        showMerci();
       // $("form p#email_p").html("Thanks! We'll be in touch");
      }else{
				alert('something went wrong with the server... please try again...')
}
    }, "json");*/
    
    return false;
  });
  
  

  
$('#logo img').click(function(){
  showHome();
});
  
$('a.more').click(function(e){
  e.preventDefault();
  $(this).hide();
  $('.moreinfo').slideDown(200);
});

}); //eo doc ready























