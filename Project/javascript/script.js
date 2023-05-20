// Get all the page divs
var pages = document.getElementsByClassName('page');

// Show the home page initially
document.getElementById('home').style.display = 'block';

// Add event listeners to navigation links
var navLinks = document.getElementsByTagName('a');
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', navigate);
}

function navigate(event) {
  event.preventDefault();
  var target = event.target.getAttribute('href').substring(1);
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  document.getElementById(target).style.display = 'block';
}
