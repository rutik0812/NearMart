import { Link } from "react-router-dom";

function Home() {

    return (
        <main className="home">

            <section className="hero">

                <div className="hero-content">

                    <p className="hero-label">
                        LOCAL SHOPPING, MADE SIMPLE
                    </p>

                    <h1>
                        Everything you need,
                        <br />
                        right around the corner.
                    </h1>

                    <p className="hero-description">
                        Discover local shops, explore products,
                        and order what you need from stores near you.
                    </p>

                    <Link to="/shops" className="explore-btn">
                        Explore Shops
                    </Link>

                </div>

            </section>

            <section className="categories">

                <h2>
                    Explore Local Shops
                </h2>

                <div className="category-grid">

                    <div className="category-card">
                        <h3>Grocery</h3>
                        <p>Daily essentials and groceries</p>
                    </div>

                    <div className="category-card">
                        <h3>Bakery</h3>
                        <p>Fresh bread and baked goods</p>
                    </div>

                    <div className="category-card">
                        <h3>Pharmacy</h3>
                        <p>Healthcare and personal care</p>
                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;