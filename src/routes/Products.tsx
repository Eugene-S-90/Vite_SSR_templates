import { useState } from "react";

interface ProductsProps {
    products: {
        id: number;
        name: string;
        price: number;
    }[];
}

export default function Products({ products }: ProductsProps) {
    const [counter, setCounter] = useState(0);
    console.log('products', products);
    return (
        <div className="products-page">
            <h1>Products</h1>
            <p onClick={() => setCounter(counter + 1)}>Counter: {counter}</p>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 