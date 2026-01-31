import { renderCheckoutPage } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/payment.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";

new Promise((resolve)=>{
  loadProducts(()=>{
     resolve()
  });
}).then(()=>{
  renderCheckoutPage()
  renderPaymentSummary()
  renderCheckoutHeader()
})
  




