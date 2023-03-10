
// 🍀코딩용... 자동으로 가장 밑으로 스크롤시키기

// setTimeout(function(){
//   window.scrollTo(0, document.body.scrollHeight);
//   // window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
// }, 500);


// const
const boxContainer = document.querySelector('.products .box-container');
const cartItemsEl = document.querySelector('.cart-items');
console.log(cartItemsEl)
const subtotalEl = document.querySelector('.subtotal')

console.log(productsData)


// js12. menu-bar. navbar c lick. hide active
// font awesome 
// active toggle



const menu = document.querySelector('#menu-bar');
const navbar = document.querySelector('.navbar');


menu.addEventListener('click',()=>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

});

// 🍀js22. slide show

/* 
%operator

1%3 =1
2%3 =2
3%3=0

1%5 =1

lide rmove, slide active

slide.lenth =3 

index = index +1 % slide.fa-down-left-and-up-right-to-center
1%3 =1

*/

const slides = document.querySelectorAll('.slide-container');
let index =0;

console.log( 'slides'+slides[1])
console.log( 'slides'+slides.length)


function next() {
  slides[index].classList.remove('active')

  // js22-40
  index = (index+1) % slides.length
  console.log(index)
  slides[index].classList.add('active')
  
}


function prev() {
  slides[index].classList.remove('active');
   //🍉js22-50
  index = (index -1 + slides.length) % slides.length; //2 1 0 
  console.log(index)
  slides[index].classList.add('active');    
}

// 🍀js39 featured image
/* 
class src
document.querySelector ~~< className="src">
~.getAttribvute(src)

*/

/* foreach
getAttribute
 */



/* 🍄
10 class이름으로 src찾아서 가져오기
~.getAttribute('src');

20. querySelectorAll, forEach : class "featured-image-1" 태그 모두 가져옴

30. class이름으로 src찾아내기
document.querySelector('.~').src

40. 클릭한해서 가져온 src 를 👉 big-image img태그의 src에 넣기
 */

let featuredImage1 = document.querySelectorAll('.featured-image-1')



featuredImage1.forEach((p_image_1)=> {
  p_image_1.addEventListener('click',()=>{
    let getSrc = p_image_1.getAttribute('src');
    document.querySelector('.big-image-1').src=getSrc;
  });

});



//🍀 js100. rendering latest products

console.log(productsData)


renderProducts();
function renderProducts() {
  productsData.forEach((p_product)=>{
    boxContainer.innerHTML +=`
      <div class="box">
          <div class="icons">
              <button href="#" class="fas fa-heart"></button>             
              <button href="#" class="fas fa-shopping-cart"  onclick="addToCart(${p_product.id})"></button>
          </div>
          <img src="${p_product.imgSrc}" alt="">
          <div class="content">
              <h3>${p_product.name}</h3>
              <div class="price">$${p_product.price} <span>$60</span></div>
              <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
              </div>
              <div class="price">inventory: ${p_product.instock}</div>
              <a class="btn" onclick="addToCart(${p_product.id})">add to cart</a>
          </div>
      </div>
    `
  });
  
}



// 🍀js13. addToCart, 새로운 항목 numberOfUnit...object에 추가하기

let cart = JSON.parse(localStorage.getItem("CART")) || [];

function addToCart(p_id) {
      
  // js13

  if (cart.some((pp_item)=>{pp_item.id ===p_id})) {

    changeNumberOfUnits('plus',p_id)
    
  } else {
    
    const item = productsData.find((pp_product)=>{pp_product.id ===p_id});

    // cart.push(item);
    cart.push(
      {
        ...item,
        numberOfUnits:1,
      }
    );


    console.log(cart)
    updateCart();

  }




  showToast('added to cart','blue');
  // showToast('added to cart','red');
}





function changeNumberOfUnits(action,id) {
  cart = cart.map((item)=>{
    let numberOfUnit = item.numberOfUnit;

    if (item.id ===id) {
      if (action ==='minus'&& numberOfUnit >1 ) {
        numberOfUnit --;
        
      } else if (action === 'plus' && numberOfUnit < item.instock) {
        
        numberOfUnit++;
      } else if (action === 'plus') {
        
      }
      
    }

    return{
      ...item,
      numberOfUnit:numberOfUnit,
    }

  });
  
}

// js13. update cart
// localStorage
function updateCart(params) {
  renderCartItems();
  renderSubtotal();
  
  localStorage.setItem('CART',JSON.stringify(cart));
}
updateCart();


function renderCartItems(params) {

  cartItemsEl.innerHTML=""; 

  cart.forEach(pp_item =>{
    console.log(pp)
    cartItemsEl.innerHTML += `
    <div class="cart-item">
    <div class="item-info" onclick="removeItemFromCart(${pp_item.id})">
        <img src="${pp_item.imgSrc}" alt="${pp_item.name}">
        <h4>${pp_item.name}</h4>
    </div>
    <div class="unit-price">
        <small>$</small>${pp_item.price}
        <img src="./images/icons8-delete-128.png" alt="" class="delete"  onclick="removeItemFromCart(${pp_item.id})">
    </div>
    <div class="units">
        <div class="mybtn plus" onclick="changeNumberOfUnits('plus', ${pp_item.id})"><i class="fa-solid fa-plus"></i></div>           
        <div class="number">${pp_item.numberOfUnits}</div>
        <div class="mybtn minus" onclick="changeNumberOfUnits('minus', ${pp_item.id})"><i class="fa-solid fa-minus"></i></div>
    </div>
</div>
`

  });
}
  

// js35 calculate, render subtotal

function renderSubtotal(params) {
  let totalPrice=0;
  let totalItems=0;

  cart.forEach((item)=>{
    totalPrice += item.price *item.numberOfUnit
    totalItems += item.numberOfUnit;
    
    subtotalEl.innerHTML = `${totalItems} : $`
  });
  
}


// js 41. remove item from cart
function removeItemFromCart(params) {
  cart = cart.filter(pp_item => pp_item.id !== params);

  updateCart();
  
}



// localstorage.clear(); / location.reload();


const deleteAllBtn = document.querySelector('.delete-all-btn');
const checkoutBtn = document.querySelector('.checkoutBtn');


deleteAllBtn.addEventListener('click',()=>{
  localStorage.clear();
  location.reload();
});


checkoutBtn.addEventListener('click',()=>{
  localStorage.clear();
  location.reload();
  alert('thankyou');
});

// 🍀 js110 toast-

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


