import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Shops() {

    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {

        fetchShops();

    }, []);


    const fetchShops = async () => {

        try {

            const response =
                await api.get("/shops");

            setShops(response.data);

        } catch (error) {

            console.error(
                "Error fetching shops:",
                error
            );

            setError(
                "Unable to load shops."
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="shops-page">

                <h2>
                    Loading shops...
                </h2>

            </div>

        );

    }


    if (error) {

        return (

            <div className="shops-page">

                <h2>
                    {error}
                </h2>

            </div>

        );

    }


    return (

        <main className="shops-page">


            <div className="shops-header">

                <h1>
                    Explore Shops
                </h1>

                <p>
                    Find local shops and explore
                    products available near you.
                </p>

            </div>


            {shops.length === 0 ? (

                <div className="no-shops">

                    <p>
                        No shops available at the moment.
                    </p>

                </div>

            ) : (

                <div className="shops-container">

                    {shops.map(shop => (

                        <div
                            className="shop-card"
                            key={shop.shopId}
                        >

                            <h2>
                                {shop.shopName}
                            </h2>

                            <p>
                                <strong>
                                    Owner:
                                </strong>{" "}
                                {shop.ownerName}
                            </p>

                            <p>
                                <strong>
                                    Address:
                                </strong>{" "}
                                {shop.shopAddress}
                            </p>

                            <p>
                                <strong>
                                    Status:
                                </strong>{" "}
                                {shop.status}
                            </p>


                            <button
                                className="view-shop-btn"
                                onClick={() =>
                                    navigate(
                                        `/shops/${shop.shopId}`
                                    )
                                }
                            >
                                View Shop
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </main>

    );

}

export default Shops;