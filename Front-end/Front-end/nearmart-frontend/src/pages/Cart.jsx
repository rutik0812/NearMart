<<<<<<< HEAD

=======
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Cart() {
<<<<<<< HEAD

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(false);


    // ==========================================
    // LOAD CART FROM LOCAL STORAGE
    // ==========================================

    useEffect(() => {

        loadCart();

    }, []);


    const loadCart = () => {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(savedCart);

    };


    // ==========================================
    // UPDATE QUANTITY
    // ==========================================

    const updateQuantity = (
        productId,
        newQuantity
    ) => {

        if (newQuantity < 1) {
            return;
        }


        const updatedCart =
            cart.map(item => {

                if (
                    Number(item.productId) ===
                    Number(productId)
                ) {

                    if (
                        newQuantity >
                        item.stockQuantity
                    ) {

                        alert(
                            `Only ${item.stockQuantity} units available.`
                        );

                        return item;

                    }


                    return {

                        ...item,

                        quantity:
                            newQuantity

                    };

                }

                return item;

            });


        setCart(updatedCart);


        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

    };


    // ==========================================
    // REMOVE PRODUCT
    // ==========================================

    const removeFromCart = (
        productId
    ) => {

        const updatedCart =
            cart.filter(
                item =>
                    Number(item.productId) !==
                    Number(productId)
            );


        setCart(updatedCart);


        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

    };


    // ==========================================
    // CLEAR CART
    // ==========================================

    const clearCart = () => {

        const confirmClear =
            window.confirm(
                "Are you sure you want to clear your cart?"
            );


        if (!confirmClear) {
            return;
        }


        localStorage.removeItem(
            "cart"
        );


        setCart([]);

    };


    // ==========================================
    // CALCULATE SUBTOTAL
    // ==========================================

    const calculateSubtotal = (
        item
    ) => {

        return (
            Number(item.price) *
            Number(item.quantity)
        );

    };


    // ==========================================
    // CALCULATE TOTAL
    // ==========================================

    const totalAmount =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    calculateSubtotal(item)
                );

            },
            0
        );


    // ==========================================
    // PLACE ORDER
    // ==========================================

    const handleCheckout = async () => {

        console.log(
            "PLACE ORDER BUTTON CLICKED"
        );


        // ======================================
        // CHECK CART
        // ======================================

        if (
            cart.length === 0
        ) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        // ======================================
        // TEMPORARY USER ID
        // ======================================

        // We are NOT checking login.
        // Change 1 to an existing User ID
        // from your database.

        const userId = 1;


        // ======================================
        // GET SHOP ID
        // ======================================

        const shopId =
            cart[0].shopId;


        console.log(
            "User ID:",
            userId
        );


        console.log(
            "Shop ID:",
            shopId
        );


        // ======================================
        // CHECK SHOP ID
        // ======================================

        if (!shopId) {

            alert(
                "Shop ID is missing from cart."
            );

            console.error(
                "Cart Data:",
                cart
            );

            return;

        }


        // ======================================
        // CREATE ORDER REQUEST
        // ======================================

        const orderRequest = {

            userId:
                Number(userId),

            shopId:
                Number(shopId),

            items:

                cart.map(item => ({

                    productId:
                        Number(
                            item.productId
                        ),

                    quantity:
                        Number(
                            item.quantity
                        )

                }))

        };


        // ======================================
        // PRINT REQUEST
        // ======================================

        console.log(
            "Order Request:",
            JSON.stringify(
                orderRequest,
                null,
                2
            )
        );


        try {

            setLoading(true);


            // ==================================
            // SEND ORDER TO BACKEND
            // ==================================

            const response =
                await api.post(
                    "/orders",
                    orderRequest
                );


            console.log(
                "Order Created Successfully:",
                response.data
            );


            // ==================================
            // GET ORDER ID
            // ==================================

            const order =
                response.data;


            const orderId =
                order.orderId;


            console.log(
                "Order ID:",
                orderId
            );


            // ==================================
            // CHECK ORDER ID
            // ==================================

            if (!orderId) {

                alert(
                    "Order created but Order ID was not received."
                );

                return;

            }


            // ==================================
            // CLEAR CART
            // ==================================

            localStorage.removeItem(
                "cart"
            );


            setCart([]);


            // ==================================
            // NAVIGATE TO BILL
            // ==================================

            navigate(
                `/bill/order/${orderId}`
            );


        } catch (error) {

            console.error(
                "ORDER FAILED"
            );


            console.error(
                "Full Error:",
                error
            );


            console.error(
                "Status:",
                error.response?.status
            );


            console.error(
                "Backend Response:",
                error.response?.data
            );


            const backendMessage =
                error.response?.data?.message;


            if (
                backendMessage
            ) {

                alert(
                    backendMessage
                );

            } else if (
                typeof error.response?.data ===
                "string"
            ) {

                alert(
                    error.response.data
                );

            } else {

                alert(
                    "Unable to place order. Check browser console."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (
        cart.length === 0
    ) {

        return (

            <main className="cart-page">

                <div className="empty-cart">

                    <h1>
                        Your Cart
                    </h1>


                    <p>
                        Your cart is currently empty.
                    </p>


                    <button
                        onClick={() =>
                            navigate("/shops")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </main>

        );

    }


    // ==========================================
    // CART PAGE
    // ==========================================

    return (

        <main className="cart-page">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="cart-header">

                <button
                    onClick={() =>
                        navigate("/shops")
                    }
                >
                    ← Continue Shopping
                </button>


                <h1>
                    Your Cart
                </h1>


                <button
                    onClick={
                        clearCart
                    }
                >
                    Clear Cart
                </button>

            </div>


            {/* ==================================
                CART ITEMS
            ================================== */}

            <section className="cart-items">

                {cart.map(item => (

                    <div
                        className="cart-item"
                        key={
                            item.productId
                        }
                    >


                        {/* PRODUCT */}

                        <div className="cart-item-info">

                            <h2>
                                {
                                    item.productName
                                }
                            </h2>


                            <p>
                                Category:{" "}
                                {
                                    item.category
                                }
                            </p>


                            <p>
                                Price: ₹
                                {
                                    Number(
                                        item.price
                                    ).toFixed(2)
                                }
                            </p>

                        </div>


                        {/* QUANTITY */}

                        <div className="quantity-section">

                            <p>
                                Quantity
                            </p>


                            <div className="quantity-controls">

                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.productId,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>


                                <span>
                                    {
                                        item.quantity
                                    }
                                </span>


                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.productId,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>


                            <small>
                                Available:{" "}
                                {
                                    item.stockQuantity
                                }
                            </small>

                        </div>


                        {/* SUBTOTAL */}

                        <div className="cart-item-total">

                            <p>
                                Subtotal
                            </p>


                            <h3>
                                ₹
                                {
                                    calculateSubtotal(
                                        item
                                    ).toFixed(2)
                                }
                            </h3>

                        </div>


                        {/* REMOVE */}

                        <button
                            className="remove-btn"
                            onClick={() =>
                                removeFromCart(
                                    item.productId
                                )
                            }
                        >
                            Remove
                        </button>


                    </div>

                ))}

            </section>


            {/* ==================================
                ORDER SUMMARY
            ================================== */}

            <section className="cart-summary">

                <h2>
                    Order Summary
                </h2>


                <div className="summary-row">

                    <span>
                        Items
                    </span>


                    <span>

                        {
                            cart.reduce(
                                (
                                    total,
                                    item
                                ) =>
                                    total +
                                    Number(
                                        item.quantity
                                    ),
                                0
                            )
                        }

                    </span>

                </div>


                <div className="summary-row">

                    <span>
                        Total Amount
                    </span>


                    <strong>
                        ₹
                        {
                            totalAmount.toFixed(2)
                        }
                    </strong>

                </div>


                {/* PLACE ORDER */}

                <button
                    className="checkout-btn"
                    onClick={
                        handleCheckout
                    }
                    disabled={loading}
                >

                    {
                        loading
                            ? "Placing Order..."
                            : "Place Order"
                    }

                </button>


            </section>


        </main>

    );

}

export default Cart;

=======
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOAD CART FROM LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const updatedCart = cart.map((item) => {
      if (Number(item.productId) === Number(productId)) {
        if (newQuantity > item.stockQuantity) {
          alert(`Only ${item.stockQuantity} units available.`);

          return item;
        }

        return {
          ...item,

          quantity: newQuantity,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (item) => Number(item.productId) !== Number(productId),
    );

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (!confirmClear) {
      return;
    }

    localStorage.removeItem("cart");

    setCart([]);
  };

  // ==========================================
  // CALCULATE SUBTOTAL
  // ==========================================

  const calculateSubtotal = (item) => {
    return Number(item.price) * Number(item.quantity);
  };

  // ==========================================
  // CALCULATE TOTAL
  // ==========================================

  const totalAmount = cart.reduce((total, item) => {
    return total + calculateSubtotal(item);
  }, 0);

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleCheckout = async () => {
    console.log("PLACE ORDER BUTTON CLICKED");

    // ======================================
    // CHECK CART
    // ======================================

    if (cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    // ======================================
    // TEMPORARY USER ID
    // ======================================

    // We are NOT checking login.
    // Change 1 to an existing User ID
    // from your database.

    // const userId = 1;
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    // ======================================
    // GET SHOP ID
    // ======================================

    const shopId = cart[0].shopId;

    console.log("User ID:", userId);

    console.log("Shop ID:", shopId);

    // ======================================
    // CHECK SHOP ID
    // ======================================

    if (!shopId) {
      alert("Shop ID is missing from cart.");

      console.error("Cart Data:", cart);

      return;
    }

    // ======================================
    // CREATE ORDER REQUEST
    // ======================================

    const orderRequest = {
      userId: Number(userId),

      shopId: Number(shopId),

      items: cart.map((item) => ({
        productId: Number(item.productId),

        quantity: Number(item.quantity),
      })),
    };

    // ======================================
    // PRINT REQUEST
    // ======================================

    console.log("Order Request:", JSON.stringify(orderRequest, null, 2));

    try {
      setLoading(true);

      // ==================================
      // SEND ORDER TO BACKEND
      // ==================================

      const response = await api.post("/orders", orderRequest);

      console.log("Order Created Successfully:", response.data);

      // ==================================
      // GET ORDER ID
      // ==================================

      const order = response.data;

      const orderId = order.orderId;

      console.log("Order ID:", orderId);

      // ==================================
      // CHECK ORDER ID
      // ==================================

      if (!orderId) {
        alert("Order created but Order ID was not received.");

        return;
      }

      // ==================================
      // CLEAR CART
      // ==================================

      localStorage.removeItem("cart");

      setCart([]);

      // ==================================
      // NAVIGATE TO BILL
      // ==================================

      navigate(`/bill/order/${orderId}`);
    } catch (error) {
      console.error("ORDER FAILED");

      console.error("Full Error:", error);

      console.error("Status:", error.response?.status);

      console.error("Backend Response:", error.response?.data);

      const backendMessage = error.response?.data?.message;

      if (backendMessage) {
        alert(backendMessage);
      } else if (typeof error.response?.data === "string") {
        alert(error.response.data);
      } else {
        alert("Unable to place order. Check browser console.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart</h1>

          <p>Your cart is currently empty.</p>

          <button onClick={() => navigate("/shops")}>Continue Shopping</button>
        </div>
      </main>
    );
  }

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <main className="cart-page">
      {/* ==================================
                HEADER
            ================================== */}

      <div className="cart-header">
        <button onClick={() => navigate("/shops")}>← Continue Shopping</button>

        <h1>Your Cart</h1>

        <button onClick={clearCart}>Clear Cart</button>
      </div>

      {/* ==================================
                CART ITEMS
            ================================== */}

      <section className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.productId}>
            {/* PRODUCT */}

            <div className="cart-item-info">
              <h2>{item.productName}</h2>

              <p>Category: {item.category}</p>

              <p>Price: ₹{Number(item.price).toFixed(2)}</p>
            </div>

            {/* QUANTITY */}

            <div className="quantity-section">
              <p>Quantity</p>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <small>Available: {item.stockQuantity}</small>
            </div>

            {/* SUBTOTAL */}

            <div className="cart-item-total">
              <p>Subtotal</p>

              <h3>₹{calculateSubtotal(item).toFixed(2)}</h3>
            </div>

            {/* REMOVE */}

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* ==================================
                ORDER SUMMARY
            ================================== */}

      <section className="cart-summary">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Items</span>

          <span>
            {cart.reduce((total, item) => total + Number(item.quantity), 0)}
          </span>
        </div>

        <div className="summary-row">
          <span>Total Amount</span>

          <strong>₹{totalAmount.toFixed(2)}</strong>
        </div>

        {/* PLACE ORDER */}

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </section>
    </main>
  );
}

export default Cart;
>>>>>>> eae9d6c (Add Razorpay payment service and frontend integration)
