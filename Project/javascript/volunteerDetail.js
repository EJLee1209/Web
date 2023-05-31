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

// 페이지 로드 시 쿼리 파라미터 값을 가져와서 처리하는 예제
window.onload = function () {
  var queryParams = getQueryParams();
  var selectedIdx = queryParams['selectedIdx'];
  var title1 = document.getElementById('slide-title-1');
  var description1 = document.getElementById('slide-description-1');
  var title2 = document.getElementById('slide-title-2');
  var description2 = document.getElementById('slide-description-2');
  var title3 = document.getElementById('slide-title-3');
  var description3 = document.getElementById('slide-description-3');
  var slide1 = document.getElementById('slide-1');
  var slide2 = document.getElementById('slide-2');
  var slide3 = document.getElementById('slide-3');
  var detailImages = document.getElementsByClassName('detail-image');
  var btnDonate = document.getElementById('btn-donate');
  var btnParticipate = document.getElementById('btn-participate');

  // 가져온 값으로 필요한 작업 수행
  // 예: 화면에 출력
  console.log(`아이템 : ${selectedIdx}`);
  title1.innerHTML = all[selectedIdx].contentTitle1;
  description1.innerHTML = all[selectedIdx].content1;

  title2.innerHTML = all[selectedIdx].contentTitle2;
  description2.innerHTML = all[selectedIdx].content2;

  title3.innerHTML = all[selectedIdx].contentTitle3;
  description3.innerHTML = all[selectedIdx].content3;

  slide1.style.backgroundImage = `url(${all[selectedIdx].image1})`;
  slide2.style.backgroundImage = `url(${all[selectedIdx].image2})`;
  slide3.style.backgroundImage = `url(${all[selectedIdx].image3})`;

  btnDonate.href = all[selectedIdx].link;
  btnParticipate.href = all[selectedIdx].link;

  var images = [
    all[selectedIdx].image1,
    all[selectedIdx].image2,
    all[selectedIdx].image3,
  ];
  for (var i = 0; i < detailImages.length - 1; i++) {
    detailImages[i].src = images[i];
  }
};
