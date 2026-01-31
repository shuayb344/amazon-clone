import { renderCheckoutPage } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/payment.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductFetch } from "../data/products.js";

loadProductFetch()
.then(()=>{
  renderCheckoutPage()
  renderPaymentSummary()
  renderCheckoutHeader()
})
  




