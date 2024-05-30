document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');
    const purchaseBtn = document.querySelector('.purchase-btn');

    // Function to update the cart display
    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            itemCount += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>R${item.price}</span>
                <span>Qty:${item.quantity}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
                <button class="increase-qty" data-index="${index}">+</button>
                <button class="decrease-qty" data-index="${index}">-</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = itemCount;
    };

    // Function to add items to the cart
    const addToCart = (name, price) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartDisplay();
    };

    // Function to remove items from the cart
    const removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    // Function to increase item quantity
    const increaseQty = (index) => {
        cart[index].quantity++;
        updateCartDisplay();
    };

    // Function to decrease item quantity
    const decreaseQty = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            removeFromCart(index);
        }
        updateCartDisplay();
    };

    // Event listeners for adding items to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    // Event listeners for removing items from the cart
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }

        if (e.target.classList.contains('increase-qty')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            increaseQty(index);
        }

        if (e.target.classList.contains('decrease-qty')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            decreaseQty(index);
        }
    });

    // Event listener for purchase button
    purchaseBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Purchased!');
            cart.length = 0; // Clear the cart
            updateCartDisplay();
        } else {
            alert('Your cart is empty.');
        }
    });
});
