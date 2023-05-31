// JavaScript로 쿼리 파라미터 값을 가져오는 함수
function getQueryParams() {
  var params = {};
  var url = window.location.href;
  var queryString = url.split('?')[1];

  if (queryString) {
    var keyValuePairs = queryString.split('&');
    for (var i = 0; i < keyValuePairs.length; i++) {
      var keyValue = keyValuePairs[i].split('=');
      var key = decodeURIComponent(keyValue[0]);
      var value = decodeURIComponent(keyValue[1]);
      params[key] = value;
    }
  }

  return params;
}

$(document).ready(() => {
  // 가져온 데이터로 페이지 로드
  var queryParams = getQueryParams();
  var selectedIdx = queryParams['selectedIdx'];

  // images
  organizations[selectedIdx].images.forEach((element) => {
    $(`<img src="${element}"/>`).appendTo('#imageContainer');
  });

  // introduce
  $(
    `<div id=description-box>${organizations[selectedIdx].introduce}</div>`
  ).replaceAll('#description-box');
  // link
  $('#donateBtn').attr('href', organizations[selectedIdx].link);
  // donate description
  $(
    `<div id=donateDescription>${organizations[selectedIdx].donateDescription}</div>`
  ).replaceAll('#donateDescription');

  // 슬라이드 이미지 설정
  const carousel = document.querySelector('.carousel'),
    firstImg = carousel.querySelectorAll('img')[0],
    arrowIcons = document.querySelectorAll('.wrapper i');

  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
    arrowIcons[1].style.display =
      carousel.scrollLeft == scrollWidth ? 'none' : 'block';
  };

  arrowIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
      // if clicked icon is left, reduce width value from the carousel scroll left else add to it
      carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
  });

  const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (
      carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
        -1 ||
      carousel.scrollLeft <= 0
    )
      return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
      // if user is scrolling to the right
      return (carousel.scrollLeft +=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
    }
    // if user is scrolling to the left
    carousel.scrollLeft -=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  };

  const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add('dragging');
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  };

  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('touchstart', dragStart);

  document.addEventListener('mousemove', dragging);
  carousel.addEventListener('touchmove', dragging);

  document.addEventListener('mouseup', dragStop);
  carousel.addEventListener('touchend', dragStop);
});
