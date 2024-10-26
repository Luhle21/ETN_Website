// Function to add course to cart
function addToCart(courseName, coursePrice, button) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Prevent duplicate entries
    const isCourseInCart = cart.some(item => item.name === courseName);
    if (isCourseInCart) {
        alert(`${courseName} is already in your cart!`);
        return;
    }

    // Add to cart
    cart.push({ name: courseName, price: coursePrice });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update button appearance
    button.disabled = true;
    button.textContent = "Added to Cart";

    alert(`${courseName} added to cart!`);
}

// Function to calculate total and discount
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    // Calculate discount based on cart size
    let discount = 0;
    if (cart.length === 2) discount = 0.05;
    else if (cart.length === 3) discount = 0.10;
    else if (cart.length > 3) discount = 0.15;

    const discountedTotal = total - (total * discount);
    return {
        originalTotal: total,
        discountedTotal: discountedTotal,
        discountPercentage: discount * 100
    };
}

// Function to display cart and total on the checkout page
function displayCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.getElementById("checkoutItems");
    const totalElement = document.getElementById("totalAmount");
    const discountTextElement = document.getElementById("discountText");

    if (checkoutContainer) {
        checkoutContainer.innerHTML = ""; // Clear previous contents

        cart.forEach(item => {
            const courseElement = document.createElement("p");
            courseElement.textContent = `${item.name} - R${item.price}`;
            checkoutContainer.appendChild(courseElement);
        });

        const totalData = calculateTotal();
        totalElement.textContent = `Total: R${totalData.discountedTotal.toFixed(2)}`;
        discountTextElement.textContent = `Discount: ${totalData.discountPercentage}% applied`;
    }
}

function clearCart() {
    localStorage.removeItem("cart"); // Clear the cart from localStorage
    const checkoutItems = document.getElementById("checkoutItems");
    const totalAmount = document.getElementById("totalAmount");
    const discountText = document.getElementById("discountText");
    const purchaseMessage = document.getElementById("purchaseMessage");

    // Clear the displayed cart items and totals
    checkoutItems.innerHTML = '';
    totalAmount.innerHTML = '';
    discountText.innerHTML = '';
    
    // Display thank you message
    alert("Thank you for your purchase!")
}

// Page-specific script execution
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("checkout.html")) {
        displayCheckout();
    }
});
