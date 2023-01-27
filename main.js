
// 🍀코딩용... 자동으로 가장 밑으로 스크롤시키기

setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight);
  // window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}, 500);




function addToCart(params) {
    
    showToast('added to cart','blue');
    // showToast('added to cart','red');
}


// // js110

  // get the buttons
const toastBox = document.getElementById("toast-box");


  // create the toast element
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toastBox.appendChild(toast);



  function showToast(message,color) {
    
    toast.innerHTML = message;
    toast.style.backgroundColor = color;
    toast.classList.add("show");
    setTimeout(function(){ toast.classList.remove("show"); }, 3000);
  }