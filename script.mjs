$(document).ready(function() {

function changeWindowSize() {
  let sections = ['.skills', '.portfolio', '.projects', '.honorable_mentions', '.footer'];

  sections.forEach((section) => {
    var pageWidth = parseInt($('section').css('width'));
    var elStr = section + " " + ".wrapper";
    var gridWidth = parseInt($(elStr).css('width'));  

    if (pageWidth > gridWidth) {
      var marginInt = (pageWidth-gridWidth)/2;
      var marginStr = marginInt.toString() + "px";
      $(elStr).css("margin-left", marginStr);
    }  
  })
}

function centerVertical() {
  var imgHeight = $('.projects img').outerHeight();

  $('.projects .para').each(function(index) {
    var headlineHeight = 44;
    var textHeight = headlineHeight + $(this).outerHeight();
    var top = (imgHeight - textHeight)/2;
    var numberClass = ".n" + (index+1).toString();
    var finalClass = '.text' + numberClass;
    $(finalClass).css("top", top);
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const footsteps = ['.footsteps'];
const skillsElements = ['.div', '.semicolon', '.brain', '.airplane'];
const portfolioElements = ['.arrow', '.portfolio .shadow'];
const zombie = ['.zombie', '.one .shadow'];
const pulseOx = ['.pulseox', '.two .shadow'];
const slideElements = [footsteps, skillsElements, portfolioElements, zombie, pulseOx];
const slidePresent = [false, false, false, false, false];

$(window).on('scroll', function(e) {
  index = 0;
  slideElements.forEach ( elem => {
    var marker = document.querySelector(elem[0]);
    var isPresent = slidePresent[index];
    
      if (isInViewport(marker) && !isPresent) {
        elem.forEach ( el => { 
          $(el).addClass('active');
        })
        slidePresent[index] = true;
      }
/*
      else if (!isInViewport(marker) && isPresent) {
        elem.forEach ( el => {
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

const email = document.getElementById("mail");
email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

changeWindowSize();
window.addEventListener('resize', changeWindowSize);
centerVertical();
$('.open_form').on('click', () => changeFormVis() );
$('.footer button').click(function() {
  $("html, body").animate({scrollTop: 0}, "slow");
  return false;
});

});