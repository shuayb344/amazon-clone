import { products, loadProducts } from '../data/products.js';
import { cart, addProductToCart,calculateCartQuantity } from '../data/cart.js';
import { formatMoney } from './utils/money.js';
loadProducts(renderProductGrid);
function renderProductGrid(){
  let productsHtml = '';
  products.forEach((product)=>{
  productsHtml += `
        <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars *10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${formatMoney(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantityselector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-addedto-cart${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary  js-addtocart"  data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>

  `
  })
  document.getElementById('products-grid').innerHTML = productsHtml;

  function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
  document.querySelectorAll('.js-addtocart').forEach((button)=>{
  button.addEventListener('click',()=>{
  const { productId } = button.dataset;

  const selector = document.querySelector(`.js-quantityselector-${productId}`);
  let value = Number(selector.value)
  const added = document.querySelector(`.js-addedto-cart${productId}`);
  added.classList.add('addedto-cart');

  const timeId = setTimeout(()=>{
  if(added.classList.contains('addedto-cart')){
    added.classList.remove('addedto-cart');
  }},2000)

  addProductToCart(productId, value);
  updateCartQuantity();
  })
  updateCartQuantity();
  })
  }