



function addToCart(params) {
    
    showToast('added to cart');
}


// js110
function showToast(message) {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // Update the message text
    x.innerHTML = message;
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  