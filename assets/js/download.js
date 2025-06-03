/**
* Author: Qingfeng Zhang
* Version: 1.0
*/
// Define functions
// var validated = false;
// var passTime = false;

/*----- Check submit form -----*/
function check_email_form() {
  if($('#dataset').val()=='')
  {
    alert('Please select the dataset you want to download, thanks.');
    return false;
  }
  if($('#title').val()=='')
  {
    alert('Please select your title, thanks.');
    return false;
  }
  if($('#firstname').val()=='')
  {
    alert('Please input your first name, thanks.');
    return false;
  }
  if($('#lastname').val()=='')
  {
    alert('Please input your last name, thanks.');
    return false;
  }
  if($('#affiliation').val()=='')
  {
    alert('Please input your affiliation, thanks.');
    return false;
  }
  if($('#country').val()=='')
  {
    alert('Please select your country, thanks.');
    return false;
  }
  if($('#email').val()=='')
  {
    alert('Please input your email address, thanks.');
    return false;
  }
  apos=$('#email').val().indexOf("@");
  //alert($('#email').val());
  dotpos=$('#email').val().lastIndexOf(".");
    if (apos<1||dotpos-apos<1)
  {
    alert('Please input correct email address, thanks.');
    return false;
  }
  if(validated==false){
    alert('Please pass the verification, thanks.');
    return false;
  }
  else{
    addcookie('valid',passTime,5);
  }
}


function addcookie(cname, cvalue, mint) {
  var d = new Date();
  d.setTime(d.getTime() + (mint*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function cleanMsg() {
  document.getElementById('msg').value = '';
}

// $(document).ready(function(){
  var validated = false;
  var passTime = false;
  /*----- 图片验证 -----*/
  jigsaw.init({
    el: document.getElementById('captcha'),
    onSuccess: function() {
      var d = new Date();
      passTime = d.getTime();
      document.getElementById('msg').value = passTime;
      validated = true;
    },
    onFail: cleanMsg,
    onRefresh: function() {
      cleanMsg();
      validated = false;
    }
  })
// })
