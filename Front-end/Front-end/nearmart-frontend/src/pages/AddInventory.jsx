import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddInventory() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        price: "",
        stockQuantity: "",
        shopId: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await api.post(
                "/products",
                {
                    ...formData,
                    price: Number(formData.price),
                    stockQuantity: Number(formData.stockQuantity),
                    shopId: Number(formData.shopId)
                }
            );

            console.log(response.data);

            setMessage("Product added successfully.");

            setTimeout(() => {
                navigate("/shops");
            }, 1500);

        } catch (err) {

            console.error(err);

            if (err.response) {

                setError(
                    err.response.data.message ||
                    "Unable to add product."
                );

            } else {

                setError("Server not responding.");

            }

        }

    };

    return (

        <div className="inventory-page">

            <div className="inventory-card">

                <h1>Add Inventory</h1>

                <p>
                    Add a new product to your shop.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Shop ID</label>

                        <input
                            type="number"
                            name="shopId"
                            value={formData.shopId}
                            onChange={handleChange}
                            placeholder="Enter Shop ID"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Product Name</label>

                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Enter Product Name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Category</label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Vegetables / Fruits / Dairy..."
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Price</label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter Price"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Stock Quantity</label>

                        <input
                            type="number"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            placeholder="Available Stock"
                            required
                        />

                    </div>

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        className="inventory-btn"
                        type="submit"
                    >
                        Add Product
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddInventory;