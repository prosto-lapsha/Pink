window.onload = function() {
  var menuTop = document.querySelector(".main-header__top");
  var menuBtn = document.querySelector(".main-header__menu-btn");
  var menuBar = document.querySelector(".main-header__menu");

  menuTop.classList.remove("main-header__top--show");
  menuBtn.classList.remove("main-header__menu-btn--show");
  menuBar.classList.remove("main-header__menu--show");

  menuBtn.addEventListener("click", function() {
    menuTop.classList.toggle("main-header__top--show");
    menuBtn.classList.toggle("main-header__menu-btn--show");
    menuBar.classList.toggle("main-header__menu--show");
  });
};

function initMap() {
  var mapDiv = document.getElementById("map");

  if (!mapDiv) {
    return;
  }

  var address = {lat: 59.938805, lng: 30.323099};
  var map = new google.maps.Map(mapDiv, {
    center: address,
    zoom: 17,
    disableDefaultUI: true,
    zoomControl: true
  });

  var marker = new google.maps.Marker({
    position: address,
    map: map
  });
}
