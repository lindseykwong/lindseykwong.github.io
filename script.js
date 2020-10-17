/* JS */

$(document).ready(function() {

function centerVertical() {
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var imgHeight = $('.projects img').outerHeight();
  
  $('.projects .para').each(function(index) {
    var headlineHeight = 44;
    var textHeight = headlineHeight + $(this).outerHeight();
    var top = (imgHeight - textHeight)/2;
    var numberClass = ".n" + (index+1).toString();
    var finalClass = '.text' + numberClass;
    if (viewportWidth > 990) {
      $(finalClass).css("top", top);
    } else {
      $(finalClass).css("top", 0);
    }
  });
}

function changeWindowSize() {
  let sections = ['.skills', '.portfolio', '.projects', '.honorable_mentions', '.footer'];

  sections.forEach(function(section){
    var pageWidth = parseInt($('section').css('width'));
    var elStr = section + " " + ".wrapper";
    var gridWidth = parseInt($(elStr).css('width'));  

    if (pageWidth > gridWidth) {
      var marginInt = (pageWidth-gridWidth)/2;
      var marginStr = marginInt.toString() + "px";
      $(elStr).css("margin-left", marginStr);
    }  
  })
  centerVertical();
}

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var footsteps = ['.footsteps'];
var skillsElements = ['.div', '.semicolon', '.brain', '.airplane'];
var portfolioElements = ['.arrow', '.portfolio .shadow'];
var zombie = ['.zombie', '.one .shadow'];
var pulseOx = ['.pulseox', '.two .shadow'];
var slideElements = [footsteps, skillsElements, portfolioElements, zombie, pulseOx];
var slidePresent = [false, false, false, false, false];

$(window).on('scroll', function(e) {
  index = 0;

  slideElements.forEach(function(elem){
    var marker = document.querySelector(elem[0]);
    var isPresent = slidePresent[index];
    
      if (isInViewport(marker) && !isPresent) {
        elem.forEach(function(el){ 
          $(el).addClass('active');
        })
        slidePresent[index] = true;
      }
/*
      else if (!isInViewport(marker) && isPresent) {
        elem.forEach(function(el){
          $(el).removeClass('active');
          })
        slidePresent[index] = false;
      }
*/
    index++;
  })
  return false;
});

var chatOpen = false;
function changeFormVis() {
  var marker = document.querySelector('.x');

  if (chatOpen) {
    document.getElementById("contact_form").style.display = "none";
    $(marker).removeClass('active');
    chatOpen = false;
  } else {
    document.getElementById("contact_form").style.display = "block";
    $(marker).addClass('active');
    chatOpen = true;
  }
}

var email = document.getElementById("mail");
email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

changeWindowSize();
window.onload = centerVertical();
window.addEventListener('resize', changeWindowSize);
$('.open_form').on('click', function(){ changeFormVis(); });
$('.footer button').click(function() {
  $("html, body").animate({scrollTop: 0}, "slow");
  return false;
});
});
