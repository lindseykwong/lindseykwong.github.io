$(document).ready(function() {
/**********************************FUNCTIONS**********************************/
  // Center portfolio descriptions vertically relative to photo on window load
  window.onload = function centerVertical() {
    // Get photo height
    var imgHeight = $('.projects img').outerHeight();
    // Get viewport width, will later check if in wide screen or mobile formatting
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // For each project, calculate + assign text's "top" value
    $('.projects .para').each(function(index) {
      var headlineHeight = 44; // height of headline + subheadline
      var textHeight = headlineHeight + $(this).outerHeight();
      var top = (imgHeight - textHeight)/2;
      var numberClass = ".n" + (index+1).toString();
      var finalClass = '.text' + numberClass;

      if (viewportWidth > 990) { // only applicable for wide screen format (not mobile)
        $(finalClass).css("top", top);
      } else {
        $(finalClass).css("top", 0);
      }
    });
  };
  
  // Keep all grids centered on page when window is resized
  function changeWindowSize() {
    let sections = ['.skills', '.portfolio', '.projects', '.honorable_mentions', '.footer'];
  
    // For each section with a grid, calculate + assign grid's "margin-left" value to center on page
    sections.forEach(function(section){
      var pageWidth = parseInt($('section').css('width'));
      var elStr = section + " " + ".wrapper";
      var gridWidth = parseInt($(elStr).css('width'));  
  
      if (pageWidth > gridWidth) { // only center if the grid is smaller than the page
        var marginInt = (pageWidth-gridWidth)/2;
        var marginStr = marginInt.toString() + "px";
        $(elStr).css("margin-left", marginStr);
      }  
    })

    // Run centerVertical() function, copied & pasted due to bug that forces centerVertical to be directly assigned to window onload
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
  
  // Check if an element is in the viewport by comparing its boundaries' positions to the window or document
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // All elements that are animated in main.css
  var footsteps = ['.footsteps'];
  var skillsElements = ['.div', '.semicolon', '.brain', '.airplane'];
  var portfolioElements = ['.arrow', '.portfolio .shadow'];
  var zombie = ['.zombie', '.one .shadow'];
  var pulseOx = ['.pulseox', '.two .shadow'];
  var slideElements = [footsteps, skillsElements, portfolioElements, zombie, pulseOx];
  var slidePresent = [false, false, false, false, false];
  
  // Animate entry of elements as they come into view
  $(window).on('scroll', function(e) {
    index = 0;
  
    // If the element comes into view, "activate" class and trigger CSS entry animation
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
  
  // Make contact form visible
  var chatOpen = false;
  var secretOpen = false;
  function openForm() {
    var marker = document.querySelector('.x');
  
    if (!chatOpen) {
      document.getElementById("contact_form").style.display = "block";
      $(marker).addClass('active');
      chatOpen = true;
    }
  }
  
  // Make hidden page visible
  function openHidden() {
    var marker = document.querySelector('.x');
  
    if (!secretOpen) {
      document.getElementById("hidden_page").style.display = "block";
      $(marker).addClass('active');
      secretOpen = true;
    }
  }

  // Hide contact form or hidden page if visible
  function closeAll() {
    var marker = document.querySelector('.x');
    
    if (!chatOpen && !secretOpen) {
      openForm();
    } else if (chatOpen) {
      document.getElementById("contact_form").style.display = "none";
      $(marker).removeClass('active');
      chatOpen = false;
    } else if (secretOpen) {
      document.getElementById("hidden_page").style.display = "none";
      $(marker).removeClass('active');
      secretOpen = false;
    }
  }
  
  // Set custom error message if user inputs an invalid email address
  var email = document.getElementById("mail");
  email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("I am expecting an e-mail address!");
    } else {
      email.setCustomValidity("");
    }
  });
  
/********************************FUNCTION CALLS********************************/
  changeWindowSize();
  window.addEventListener('resize', changeWindowSize);
  $('.open_form').on('click', function(){ openForm(); });
  $('.open_secret').on('click', function(){ openHidden(); });
  $('.x').on('click', function(){ closeAll(); });
  $('.footer button.scroll_up').click(function() {
    $("html, body").animate({scrollTop: 0}, "slow");
    return false;
  });
});
  