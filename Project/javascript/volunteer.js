
$(document).ready(function () {
  all.forEach(function (obj) {
    $('#volunteer-content').append(createNewElement(obj));
  });

  $('#volunteer_navbar li').each(function (index) {
    $(this).click(function () {
      $('.volunteer-content-item').remove();
      switch (index) {
        case 0:
          all.forEach(function (obj) {
            $('#volunteer-content').append(createNewElement(obj));
          });
          break;
        case 1:
          all.forEach(function(obj) {
            if(obj.category == 'sea') {
              $('#volunteer-content').append(createNewElement(obj));
            }
          })
          break;
        case 2:
          all.forEach(function(obj) {
            if(obj.category == 'weather') {
              $('#volunteer-content').append(createNewElement(obj));
            }
          })
          break;
      }
    });
  });
});

function createNewElement(obj) {
  return `<div class="volunteer-content-item"><a href="./volunteerDetail.html?selectedIdx=${all.indexOf(obj)}"><div class="volunteer-content-item-box"><img class="volunteer-content-item-thumbnail" src="${obj.thumbnail}" alt="" width="100%"><div class="volunteer-content-item-title">${obj.title}</div><div class="volunteer-content-item-content">${obj.description}</div></div></a></div>`;
}
