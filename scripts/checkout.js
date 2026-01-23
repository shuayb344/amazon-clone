import {cart,removeProductFromCart,calculateCartQuantity,updateCartItemQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatMoney } from './utils/money.js';

let cartItemsHtml = '';
cart.forEach((cartItem)=>{
  let productId = cartItem.productId;
  let matchingItem;
  products.forEach((product)=>{
    if(product.id === productId){
      matchingItem = product;
    }});
  cartItemsHtml += ` <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatMoney(matchingItem.priceCents)}
          </div>
          <div class="product-quantity  ">
            <span>
              Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingItem.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span class="save-quantity link-primary js-save " data-product-id="${matchingItem.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
});
  

  document.querySelector('.js-order-summery').innerHTML = cartItemsHtml;
  document.querySelectorAll('.js-delete-quantity').forEach((button)=>{
    button.addEventListener('click',()=>{
      const  {productId } = button.dataset;
     removeProductFromCart(productId);
     const container = document.querySelector(`.js-cart-item-container-${productId}`);
     container.remove();
      updateCartQuantity();
    });});
    function updateCartQuantity(){
      const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-quantity').innerHTML = `${cartQuantity} items`;
    }
    updateCartQuantity();
    document.querySelectorAll('.js-update-quantity').forEach((button)=>{
      button.addEventListener('click',()=>{
        const {productId}= button.dataset;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('js-edit-quantity','js-edit');

    });});
    document.querySelectorAll('.js-save').forEach((button)=>{
      button.addEventListener('click',()=>{
        const {productId}= button.dataset;
         const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('js-edit-quantity','js-edit');
         const value = document.querySelector(`.js-quantity-input`).value;
          const numberValue = Number(value);
          updateCartItemQuantity(productId,numberValue);
          updateCartQuantity();
          
      });
    }); 
