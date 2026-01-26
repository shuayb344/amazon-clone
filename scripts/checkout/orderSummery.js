import {cart,removeProductFromCart,calculateCartQuantity,updateCartItemQuantity,UpdateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './payment.js';

export function renderCheckoutPage(){
let cartItemsHtml = '';
cart.forEach((cartItem)=>{
  let productId = cartItem.productId;
  const matchingItem = getProduct(productId);
 
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'day').format('dddd, MMMM D');

  cartItemsHtml += ` <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery Date: ${deliveryDate}
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
              Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
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
          ${deliveryOptionHtml(matchingItem,cartItem)}
        </div>
      </div>
    </div>
`});
  

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
        // show edit controls and prefill input with current quantity
        container.classList.add('js-edit-quantity','js-edit');
        const quantityLabel = container.querySelector(`.js-quantity-label-${productId}`);
        const input = container.querySelector('.js-quantity-input');
        if(input && quantityLabel) input.value = quantityLabel.innerText.trim();

    });});
    document.querySelectorAll('.js-save').forEach((button)=>{
      button.addEventListener('click',()=>{
      const {productId}= button.dataset;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('js-edit-quantity','js-edit');
        // scope input lookup to this container so multiple items work
        const input = container.querySelector('.js-quantity-input');
        const value = input ? input.value : '';
        let numberValue = Number(value);
        if (!Number.isFinite(numberValue) || numberValue < 1) numberValue = 1;
        updateCartItemQuantity(productId,numberValue);
        const quantityLabel = container.querySelector(`.js-quantity-label-${productId}`);
        if (quantityLabel) quantityLabel.innerHTML = numberValue;
        updateCartQuantity();
          
      });
   }); 
    
    
   function deliveryOptionHtml(matchingItem,cartItem){
      let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
     const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'day').format('dddd, MMMM D');
    const deliveryPrice = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${formatMoney(deliveryOption.priceCents)}-`;
    let checked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';
        html += `
      
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingItem.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${checked}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${deliveryPrice}Shipping
          </div>
        </div>
      </div>`
   });
   return html;
   }
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
     const {productId,deliveryOptionId} = element.dataset;
     UpdateDeliveryOption(productId,deliveryOptionId);
     renderCheckoutPage();
     renderPaymentSummary();
    })
  })
}
