import { renderCheckoutPage } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/payment.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductFetch } from "../data/products.js";
async function loadPage(){
  try{
    await loadProductFetch()
  }catch(error){
    console.log(error);
    
  }
  
  renderCheckoutPage()
  renderPaymentSummary()
  renderCheckoutHeader()
}
loadPage()

  




