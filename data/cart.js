export let cart = JSON.parse(localStorage.getItem('cart')) ||
[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'

}];

function saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addProductToCart(productId, value=1){
  let matchingItem = null;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })
  if(matchingItem){
    matchingItem.quantity+=value;
  }else{
    cart.push({
    productId,
    quantity : value,
    deliveryOptionId: '1'
  }); }
  saveCart();
}
export function removeProductFromCart(productId){
  let newcart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  saveCart();
}
export function calculateCartQuantity(){
   let cartQuantity = 0;
  cart.forEach((cartItem)=>{
     cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}
export function updateCartItemQuantity(productId, quantity){
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      cartItem.quantity = quantity;
    }
  });
  document.querySelector(`.js-quantity-label`).innerHTML = `${quantity}`;
  saveCart();
}
export function UpdateDeliveryOption(productId,deliveryOptionId){
   let matchingItem = null;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveCart();
}