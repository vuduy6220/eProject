//Home

$(document).ready(function(){
  $('#cdsearch').click(function(){
    if($('#ffst').hasClass('far fa-search')){
      $('#ffst').removeClass('far fa-search').addClass('far fa-times active-rnavigation');
      $('.search-box').addClass('active-sb');
      return true;
    }else{
    $('#ffst').removeClass('far fa-times active-rnavigation').addClass('far fa-search');
    $('.search-box').removeClass('active-sb');
      return true;
    }
  });
  $('#ffct').click(function(){
    $('#ffst').removeClass('far fa-times').addClass('far fa-search');
    $('.search-box').removeClass('active-sb');
  });
  $('#cdlogin').click(function(){
    if ($('#ffus').hasClass('active-rnavigation')){
      $('#ffus').removeClass('active-rnavigation');
    }else{
      $('#ffus').addClass('active-rnavigation');
    }
      return true;
  });
});




//Register

var activeregister 

function checkRegister() {
  var result = true;
  document.getElementById('messagerfname').innerHTML = '';
  document.getElementById('messagerlname').innerHTML = '';
  document.getElementById('messageremail').innerHTML = '';
  document.getElementById('messagerusername').innerHTML = '';
  document.getElementById('messagerpassword').innerHTML = '';
  document.getElementById('messagercpassword').innerHTML = '';
  var checkc1 = document.getElementById('rfname');
    if (checkc1.value.length < 1) {
      document.getElementById('messagerfname').innerHTML = 'You have not entered information yet!';
      result = false;
    }
  var checkc2 = document.getElementById('rlname');
    if (checkc2.value.length < 1) {
      document.getElementById('messagerlname').innerHTML = 'You have not entered information yet!';
      result = false;
    }
  var checkc3 = document.getElementById('remail');
    if (checkc3.value.length < 1) {
      document.getElementById('messageremail').innerHTML = 'You have not entered information yet!';
      result = false;
    }
  var checkc4 = document.getElementById('rusername');
    if (checkc4.value.length < 1) {
      document.getElementById('messagerusername').innerHTML = 'You have not entered information yet!';
      result = false;
    }
  var checkc5 = document.getElementById('rpassword');
    if (checkc5.value.length < 1) {
      document.getElementById('messagerpassword').innerHTML = 'You have not entered information yet!';
      result = false;
    }
  var checkc6 = document.getElementById('rcpassword');
    if (checkc6.value.length < 1) {
      document.getElementById('messagercpassword').innerHTML = 'You have not entered information yet!';
      result = false;
    }
    if (result == false) {
      return false;
    }
  var checkboxterms = document.getElementById('acceptrregulations');
    if (!checkboxterms.checked) {
      alter("you must accept La_Imperial's Terms, Data Policy and Cookie Policy to be able to register!");
      return false;
    }alter("Thank you for accompany La_Imperial!");
    return true;
};

function goBack() {
  window.history.back();
};


// Store location

function initMap() {
      var location1 = {lat: 21.0281772, lng: 105.7828902};
      var location2 = {lat: 21.0273551, lng: 105.826772};
      var location3 = {lat: 21.0308, lng: 105.8257971};
      var map = new google.maps.Map(
          document.getElementById('map'), {
                          zoom: 15, 
                          center: location1
                          });
      var marker = new google.maps.Marker({
                        position: location1, 
                        map: map,
                        title:"Store 1"
                        });
      $(document).ready(function(){
          $('#ls1').click(function(){
            $('#ls2').removeClass('active-sls');
            $('#ls3').removeClass('active-sls');
            $('#ls1').addClass('active-sls');
            map.setCenter(location1);
            marker.setPosition(location1);
            marker.setTitle("Store 1");
          })
          $('#ls2').click(function(){
            $('#ls1').removeClass('active-sls');
            $('#ls3').removeClass('active-sls');
            $('#ls2').addClass('active-sls');
            map.setCenter(location2);
            marker.setPosition(location2);
            marker.setTitle("Store 2");
          })
          $('#ls3').click(function(){
            $('#ls1').removeClass('active-sls');
            $('#ls2').removeClass('active-sls');
            $('#ls3').addClass('active-sls');
            map.setCenter(location3);
            marker.setPosition(location3);
            marker.setTitle("Store 3");
          })
        });
    }