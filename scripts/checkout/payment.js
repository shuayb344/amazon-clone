import {cart,calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';
import { formatMoney } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary(){
  let ProductPriceCents = 0;
  let shippingPricecents = 0; 
  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId)
    ProductPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPricecents += deliveryOption.priceCents;
   
  })
   const totalBeforetax = ProductPriceCents + shippingPricecents;
    const taxcents = totalBeforetax * 0.1;
    const totalCents = totalBeforetax + taxcents;
    

    const paymentSummaryHtml = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatMoney(ProductPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatMoney(shippingPricecents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatMoney(totalBeforetax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatMoney(taxcents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatMoney(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-orders">
            Place your order
          </button>  `;
          document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
         document.querySelector('.js-place-orders').addEventListener('click',async ()=>{
           const response = await fetch('https://supersimplebackend.dev/orders',{
            method : 'POST',
            headers : {
              'Content-Type':'application/json'
            },
            body :JSON.stringify({
              cart : cart
            })
           }
           );
           const orders = await response.json();
           addOrder(orders);
           window.location.href= 'orders.html'
           
         })
  
}
