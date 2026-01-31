export function getProduct(productId){

  let matchingItem;
  products.forEach((product)=>{
    if(product.id === productId){
      matchingItem = product;
    }});
  return matchingItem;

}

export let products = [];
export function loadProductFetch(){
  const promise = fetch('https://supersimplebackend.dev/products').then((response)=>{
    return response.json();
  }).then((productsData)=>{
      products = productsData;
  })

  return promise;
}
