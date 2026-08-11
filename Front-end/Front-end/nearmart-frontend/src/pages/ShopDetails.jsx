import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ShopDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchShop();
        fetchProducts();

    }, [id]);


    const fetchShop = async () => {

        try {

            const response =
                await api.get(
                    `/shops/get/${id}`
                );

            setShop(response.data);

        } catch (error) {

            console.error(
                "Error fetching shop:",
                error
            );

        }

    };


    const fetchProducts = async () => {

        try {

            const response =
                await api.get(
                    `/products/shop/${id}`
                );

            setProducts(response.data);

        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const addToCart = (product) => {

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        const existingProduct =
            cart.find(
                item =>
                    Number(item.productId) ===
                    Number(product.productId)
            );


        if (existingProduct) {

            if (
                existingProduct.quantity >=
                product.stockQuantity
            ) {

                alert(
                    "Maximum available stock reached."
                );

                return;

            }

            existingProduct.quantity += 1;

        } else {

            cart.push({

                productId:
                    product.productId,

                productName:
                    product.productName,

                category:
                    product.category,

                price:
                    product.price,

                stockQuantity:
                    product.stockQuantity,

                quantity:
                    1,

                shopId:
                    product.shopId

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        alert(
            "Product added to cart."
        );

    };


    if (loading) {

        return (

            <div className="loading">
                Loading...
            </div>

        );

    }


    return (

        <main className="shop-details-page">


            {/* SHOP HEADER */}

            {shop && (

                <div className="shop-header">

                    <h1>
                        {shop.shopName}
                    </h1>

                    <p>
                        {shop.shopAddress}
                    </p>

                    <p>
                        Owner: {shop.ownerName}
                    </p>

                </div>

            )}


            {/* BACK BUTTON */}

            <div className="shop-actions">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/shops")
                    }
                >
                    ← Back to Shops
                </button>

            </div>


            {/* PRODUCTS */}

            <div className="products-grid">

                {products.length === 0 ? (

                    <h2>
                        No Products Found
                    </h2>

                ) : (

                    products.map(product => (

                        <div
                            className="product-card"
                            key={product.productId}
                        >

                            <h2>
                                {product.productName}
                            </h2>

                            <p>
                                Category:{" "}
                                {product.category}
                            </p>

                            <p>
                                ₹
                                {Number(
                                    product.price
                                ).toFixed(2)}
                            </p>

                            <p>
                                Stock:{" "}
                                {product.stockQuantity}
                            </p>


                            <button
                                className="cart-btn"
                                onClick={() =>
                                    addToCart(product)
                                }
                            >
                                Add To Cart
                            </button>

                        </div>

                    ))

                )}

            </div>

        </main>

    );

}

export default ShopDetails;