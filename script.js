
const url = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

 function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false); 
    try {
      xhr.send();
      if (xhr.status === 200) {
        let cartData  = JSON.parse(xhr.responseText);
        console.log("Fetched Data:", cartData);
        return cartData;
      } else {
        console.error(`HTTP error! Status: ${xhr.status}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }

}








function loadCart() {

    let cartData = fetchData();
    if (cartData) {

        const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    cartData.items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}" width="80">
                <a href="${item.url}">${item.title}</a>
            </td>
            
            <td>Rs. ${(item.price / 100).toLocaleString()}</td>
            <td><input type="number" value="${item.quantity}" min="1"></td>
            <td>Rs. ${(item.line_price / 100).toLocaleString()} </td>
               <td> <span class="cart-remove" onclick="removeItem()">&#128465;</span>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    subtotalElement.textContent = `Rs. ${(cartData.items_subtotal_price / 100).toLocaleString()}`;
    totalElement.textContent = `Rs. ${(cartData.items_subtotal_price / 100).toLocaleString()}`;


      } else {
        console.log("Failed to fetch data.");
      }

    
}

function removeItem() {
    alert("Item removed from cart!");
}

window.onload = loadCart;