const cartItems = {};

// Función para agregar una fruta al carro de la compra
function addToCart(fruitName, price, quantityInputId) {
    const quantityInput = document.getElementById(quantityInputId);
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity > 0) {
		if (cartItems[fruitName]) {
            cartItems[fruitName].quantity += quantity;
        } else {
            cartItems[fruitName] = { price, quantity };
        }
				
        const productElement = document.createElement('div');
        productElement.className = 'addToCartAnimation';
        productElement.textContent = `${quantity}x ${fruitName}`;
		
		// Add the product element to the cart icon
        const cartIcon = document.getElementById('cart-icon');
        cartIcon.appendChild(productElement);
		
		setTimeout(() => {
            productElement.classList.add('cart-added');
            setTimeout(() => {
                cartIcon.removeChild(productElement);
            }, 2000);
        }, 0);
	
        updateCartDisplay();	
		quantityInput.value = 0;
    }
}

function removeFromCart(productName) {
    if (cartItems[productName]) {
        delete cartItems[productName];
        updateCartDisplay();
    }
}

    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
        const cart = document.getElementById('cart');
        cart.innerHTML = '';
		const uniqueProducts = Object.keys(cartItems).length;
		
		for (const itemName in cartItems) {
			const item = cartItems[itemName];
			const cartItem = document.createElement('div');
			cartItem.className = 'cart-item';

			const quantityInput = document.createElement('input');
			quantityInput.type = 'number';
			quantityInput.value = item.quantity;
			quantityInput.min = '0';

			quantityInput.addEventListener('change', (event) => {
				const newQuantity = parseInt(event.target.value, 10);
				if (newQuantity >= 0) {
					item.quantity = newQuantity;
					cartItem.querySelector('span').textContent = `${itemName} ${newQuantity} $${item.price.toFixed(2)}`;
					updateCartDisplay();
				}
			});

			cartItem.innerHTML = `<span>${itemName} ${item.price.toFixed(2)} €/Kg </span>`;
			cartItem.querySelector('span').appendChild(quantityInput);
			const removeButton = document.createElement('button');
			removeButton.textContent = 'Remove';
			removeButton.addEventListener('click', () => {
            removeFromCart(itemName);
			});
			cartItem.appendChild(removeButton);
			cart.appendChild(cartItem);		
		}

        const total = calculateTotal();
        updateTotal(total);
		document.getElementById('cart-icon').querySelector('span').textContent = uniqueProducts;
    }

// Función para calcular el total
function calculateTotal() {
	let total = 0;
	for (const itemName in cartItems) {
		const item = cartItems[itemName];
		total += item.price * item.quantity;
	}
	return total;
}

// Función para actualizar el total
function updateTotal(total) {
	const totalElement = document.getElementById('totalPrice');
	totalElement.textContent = total.toFixed(2);
}

// Función para abrir el carrito en un popup
function openCart() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = 'block';
}

// Función para cerrar el carrito
function closeCart() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = 'none';
}

// ...

// Function to open the contact popup
function openContactPopup() {
    const contactPopup = document.getElementById('contactPopup');
    contactPopup.style.display = 'block';
}

// Function to close the contact popup
function closeContactPopup() {
    const contactPopup = document.getElementById('contactPopup');
    contactPopup.style.display = 'none';
    document.getElementById('contactForm').reset(); // Clear form
}

// Function to submit the contact form with validations
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('contactTitle').value;
    const email = document.getElementById('contactEmail').value;
    const text = document.getElementById('contactText').value;

    // Add your validation logic here
    if (!title || !email || !text) {
        alert('Please fill in all fields.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Submit the form (you can add your code to send the form data here)

    alert('Form submitted successfully!');
    closeContactPopup();
}

// Function to validate an email address using a regular expression
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

// Function to submit the contact form with validations
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('contactTitle').value;
    const email = document.getElementById('contactEmail').value;
    const text = document.getElementById('contactText').value;

    // Reset error messages
    document.getElementById('contactTitleError').style.display = 'none';
    document.getElementById('contactEmailError').style.display = 'none';
    document.getElementById('contactTextError').style.display = 'none';

    // Add your validation logic here
    let isValid = true;

    if (!title) {
        document.getElementById('contactTitleError').style.display = 'block';
        isValid = false;
    }

    if (!isValidEmail(email)) {
        document.getElementById('contactEmailError').style.display = 'block';
        isValid = false;
    }

    if (!text) {
        document.getElementById('contactTextError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Submit the form (you can add your code to send the form data here)
        alert('Form submitted successfully!');
        closeContactPopup();
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    fruits.forEach((fruit) => {
        const fruitName = fruit.querySelector('h2').textContent.toLowerCase();
        if (fruitName.includes(searchTerm) || searchTerm === '') {
            fruit.style.display = 'block';
        } else {
            fruit.style.display = 'none';
        }
    });

    // If the search term is empty, reset to the first page
    if (searchTerm === '') {
        navigateToPage(1);
    }

    // Update the pagination buttons
    updateButtons();
}

	document.getElementById('product-search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
	});
	
// Pagination staff 
let currentPage = 1;
const itemsPerPage = 12;
const fruits = document.querySelectorAll('.fruit');

function showPage(page) {
    fruits.forEach((fruit, index) => {
        if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
            fruit.style.display = 'block';
        } else {
            fruit.style.display = 'none';
        }
    });
}

// Updated navigateToPage function
function navigateToPage(page) {
  if (page >= 1 && page <= 3) {
    currentPage = page;
  }

  showPage(currentPage);
  updateButtons();
}


// Initial page display
showPage(currentPage);

// Event listeners for page navigation
document.getElementById('prevPage').addEventListener('click', () => {
    navigateToPage(currentPage-1);
});

document.getElementById('page1Button').addEventListener('click', () => {
    navigateToPage(1);
});

document.getElementById('page2Button').addEventListener('click', () => {
    navigateToPage(2);
});

document.getElementById('page3Button').addEventListener('click', () => {
    navigateToPage(3);
});

document.getElementById('nextPage').addEventListener('click', () => {
    navigateToPage(currentPage+1);
});

function updateButtons() {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('page1Button').disabled = currentPage === 1;
    document.getElementById('page2Button').disabled = currentPage === 2;
    document.getElementById('page3Button').disabled = currentPage === 3;
    document.getElementById('nextPage').disabled = currentPage === Math.ceil(fruits.length / itemsPerPage);
	
	for (let i = 1; i <= 3; i++) {
        const button = document.getElementById(`page${i}Button`);
        if (i === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    }
}

// Initial button states
updateButtons();
