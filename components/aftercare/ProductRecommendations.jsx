import '../../styles/ProductRecommendations.css'
const ProductRecommendations = () => {
    const products = [
      {
        id: 1,
        name: "Creme Cicatrizante Tattoo Care",
        price: "R$ 49,90",
        features: [
          "Fórmula especial para tatuagens",
          "Acelera a cicatrização",
          "Hidratação intensiva"
        ],
        image: "/images/products/cream.jpg"
      },
      // +3 produtos...
    ];
  
    return (
      <div className="product-recommendations">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <ul className="features">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="buy-button">Onde Comprar</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductRecommendations;