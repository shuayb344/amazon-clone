export let cart = [];
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
    quantity : value
  }
);
  }
}