let autoRun = setInterval(changeSlide, 5000);

function changeSlide() {
  const radioButtons = [...document.querySelectorAll('.slide-radio')];
  const currentIndex = radioButtons.findIndex((rb) => rb.checked);
  console.log(currentIndex);
  radioButtons[(currentIndex + 1)%radioButtons.length].checked = true;
}

const paginationController = document.getElementsByClassName('pagination')
paginationController[0].addEventListener('mouseenter', ()=>clearInterval(autoRun));
paginationController[0].addEventListener('mouseleave', ()=>autoRun = setInterval(changeSlide, 5000));

