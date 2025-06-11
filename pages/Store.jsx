import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faHeart, 
  faSearch, 
  faTimes, 
  faTrash, 
  faChevronDown,
  faChevronUp,
  faStar,
  faStarHalfAlt,
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../styles/Store.css';

// Dados dos produtos
const productsData = [
  {
    id: 1,
    name: 'Kit Iniciante para Tatuador',
    price: 299.90,
    category: 'Equipamentos',
    image: 'https://tattooland.com.br/wp-content/uploads/2023/01/kitiniciante.jpg',
    featured: true,
    description: 'Kit completo para quem está começando na arte da tatuagem, incluindo máquina, fontes, agulhas e acessórios.',
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    name: 'Pomada Cicatrizante BlackTiger',
    price: 39.90,
    category: 'Cuidados',
    image: 'https://images.tcdn.com.br/img/img_prod/797153/pomada_tatuagem_474_1_20201013144028.jpg',
    discount: 15,
    description: 'Pomada de alta qualidade para cicatrização de tatuagens, com fórmula especial que hidrata e protege a pele.',
    rating: 4.8,
    stock: 32
  },
  {
    id: 3,
    name: 'Máquina Rotativa Pro Line',
    price: 899.00,
    category: 'Equipamentos',
    image: 'https://cdn.awsli.com.br/600x700/817/817341/produto/155800914/maquina-de-tatuagem-rotativa-hurricane-ii-2020-evolution-brushless-motor-nszy5z7v5c.jpg',
    featured: true,
    description: 'Máquina rotativa profissional com motor brushless, design ergonômico e baixo nível de ruído.',
    rating: 4.9,
    stock: 8
  },
  {
    id: 4,
    name: 'Stencil Transfer BlackTiger',
    price: 24.90,
    category: 'Acessórios',
    image: 'https://cdn.awsli.com.br/600x700/2440/2440651/produto/155527456/transfer-paper-papel-tatuagem-pronto-para-uso-tatuadores-3049a938.jpg',
    description: 'Papel stencil de alta transferência para tatuagem, permite cópia fiel do desenho para a pele.',
    rating: 4.2,
    stock: 45
  },
  {
    id: 5,
    name: 'Luvas Nitrílicas Pretas (100un)',
    price: 49.90,
    category: 'Higiene',
    image: 'https://www.dentalcremer.com.br/blog/wp-content/uploads/2021/06/luvas-nitrilicas.jpg',
    description: 'Luvas nitrílicas descartáveis, resistentes e hipoalergênicas, essenciais para procedimentos seguros.',
    rating: 4.3,
    stock: 20
  },
  {
    id: 6,
    name: 'Tinta Preta Premium BlackTiger',
    price: 89.90,
    category: 'Materiais',
    image: 'https://cdn.awsli.com.br/600x700/2440/2440651/produto/155527456/transfer-paper-papel-tatuagem-pronto-para-uso-tatuadores-3049a938.jpg',
    description: 'Tinta preta de alta pigmentação, especialmente formulada para durabilidade e vivacidade.',
    rating: 4.7,
    stock: 12
  },
  {
    id: 7,
    name: 'Suporte para Agulhas Ajustável',
    price: 34.90,
    category: 'Acessórios',
    image: 'https://cdn.awsli.com.br/600x700/2440/2440651/produto/155527456/transfer-paper-papel-tatuagem-pronto-para-uso-tatuadores-3049a938.jpg',
    description: 'Suporte ajustável para organizar agulhas de tatuagem, mantendo seu espaço de trabalho limpo.',
    rating: 3.9,
    stock: 18
  },
  {
    id: 8,
    name: 'Creme Anestésico TattooNumb',
    price: 59.90,
    category: 'Cuidados',
    image: 'https://cdn.awsli.com.br/600x700/2440/2440651/produto/155527456/transfer-paper-papel-tatuagem-pronto-para-uso-tatuadores-3049a938.jpg',
    description: 'Creme anestésico de uso tópico para reduzir o desconforto durante sessões de tatuagem.',
    rating: 4.1,
    stock: 25
  }
];

// Componente de Rating
const Rating = ({ value }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star full" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star half" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star empty" />);
    }
  }
  
  return <div className="product-rating">{stars}</div>;
};

// Componente principal da loja
const Store = () => {
  // Estados
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: shipping, 2: payment, 3: confirmation
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Carregar dados do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [cart, favorites]);

  // Filtrar produtos
  const filteredProducts = selectedCategory === 'Todos'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  const searchedProducts = searchTerm
    ? filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredProducts;

  const categories = ['Todos', ...new Set(productsData.map(p => p.category))];
  const featuredProducts = productsData.filter(p => p.featured);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Funções do carrinho
  const addToCart = (product) => {
    const productInStock = productsData.find(p => p.id === product.id && p.stock > 0);
    
    if (!productInStock) {
      alert('Este produto está fora de estoque!');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Verificar se há estoque suficiente
        const productStock = productsData.find(p => p.id === product.id).stock;
        if (existingItem.quantity >= productStock) {
          alert(`Só temos ${productStock} unidades deste produto em estoque!`);
          return prevCart;
        }
        
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Verificar estoque
    const productStock = productsData.find(p => p.id === productId).stock;
    if (newQuantity > productStock) {
      alert(`Só temos ${productStock} unidades deste produto em estoque!`);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Funções de favoritos
  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Funções do modal de produto
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  // Funções do checkout
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2); // Ir para pagamento
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Simular processamento do pagamento
    setTimeout(() => {
      // Gerar número de pedido aleatório
      const newOrderNumber = `BT-${Math.floor(Math.random() * 1000000)}`;
      setOrderNumber(newOrderNumber);
      
      // Atualizar estoque (simulação)
      const updatedProducts = productsData.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, stock: product.stock - cartItem.quantity };
        }
        return product;
      });
      
      // Limpar carrinho
      setCart([]);
      setCheckoutStep(3); // Ir para confirmação
      setOrderConfirmed(true);
    }, 1500);
  };

  const startNewOrder = () => {
    setCheckoutStep(0);
    setOrderConfirmed(false);
    setShowCart(false);
  };

  return (
    
    <div className="store-page">
      <br></br>
       <br></br> <br></br> <br></br> <br></br>
      {/* Cabeçalho */}
      <header className="store-header">
        <div className="header-content">
          <div className="logo">
            <h1>BlackTiger Tattoo</h1>
            <p>Equipamentos profissionais para tatuadores</p>
          </div>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          
          <div className="header-icons">
            <button 
              className="favorites-button"
              onClick={() => setSelectedCategory('Favoritos')}
              title="Favoritos"
            >
              <FontAwesomeIcon icon={faHeart} />
              {favorites.length > 0 && <span>{favorites.length}</span>}
            </button>
            
            <button 
              className="cart-button"
              onClick={() => {
                setShowCart(true);
                setCheckoutStep(0);
              }}
              title="Carrinho"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && <span>{cartItemCount}</span>}
            </button>
          </div>
        </div>
        
       
      </header>

      {/* Conteúdo principal */}
      <div className="store-content">
        {/* Produtos em destaque */}
        {featuredProducts.length > 0 && (
          <section className="featured-products">
            <h2>Destaques</h2>
            <div className="featured-grid">
              {featuredProducts.map(product => (
                <div key={product.id} className="featured-card">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onClick={() => openProductModal(product)}
                  />
                  <div className="featured-info">
                    <h3>{product.name}</h3>
                    <div className="price-container">
                      <span className="price">R$ {product.price.toFixed(2)}</span>
                    </div>
                    <Rating value={product.rating} />
                    <button 
                      className="view-button"
                      onClick={() => openProductModal(product)}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lista de produtos */}
        <section className="products-section">
          <div className="section-header">
            <h2>Nossos Produtos</h2>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {searchedProducts.length > 0 ? (
              searchedProducts.map(product => (
                <div key={product.id} className="product-card">
                  {product.discount && (
                    <span className="discount-badge">-{product.discount}%</span>
                  )}
                  <button 
                    className={`favorite-icon ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                    title={favorites.includes(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onClick={() => openProductModal(product)}
                  />
                  <div className="product-info">
                    <h3 onClick={() => openProductModal(product)}>{product.name}</h3>
                    <Rating value={product.rating} />
                    <div className="price-container">
                      {product.discount ? (
                        <>
                          <span className="old-price">R$ {product.price.toFixed(2)}</span>
                          <span className="price">
                            R$ {(product.price * (1 - product.discount/100)).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="price">R$ {product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <p className="stock-status">
                      {product.stock > 0 
                        ? `${product.stock} em estoque` 
                        : 'Esgotado'}
                    </p>
                    <button 
                      className="buy-button"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>Nenhum produto encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Carrinho de compras */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-header">
              <h3>
                {checkoutStep === 0 && 'Seu Carrinho'}
                {checkoutStep === 1 && 'Informações de Entrega'}
                {checkoutStep === 2 && 'Pagamento'}
                {checkoutStep === 3 && 'Pedido Confirmado'}
              </h3>
              <button 
                className="close-cart"
                onClick={() => {
                  if (checkoutStep === 3) {
                    startNewOrder();
                  } else {
                    setShowCart(false);
                  }
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
           {checkoutStep === 0 && (
  <>
    {cart.length === 0 ? (
      <div className="empty-cart">
        <FontAwesomeIcon icon={faShoppingCart} size="3x" />
        <p>Seu carrinho está vazio</p>
        <button 
          className="continue-shopping"
          onClick={() => setShowCart(false)}
        >
          Continuar Comprando
        </button>
      </div>
    ) : (
      <>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} onClick={() => openProductModal(item)} />
              </div>
              <div className="cart-item-details">
                <h4 onClick={() => openProductModal(item)}>{item.name}</h4>
                <div className="cart-item-category">{item.category}</div>
                
                {item.discount ? (
                  <div className="cart-item-price">
                    <span className="original-price">R$ {item.price.toFixed(2)}</span>
                    <span className="discounted-price">
                      R$ {(item.price * (1 - item.discount/100)).toFixed(2)}
                    </span>
                    <span className="discount-badge">-{item.discount}%</span>
                  </div>
                ) : (
                  <div className="cart-item-price">R$ {item.price.toFixed(2)}</div>
                )}
                
                <div className="cart-item-quantity">
                  <label>Quantidade:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= productsData.find(p => p.id === item.id).stock}
                    >
                      <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-subtotal">
                  Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
                title="Remover item"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} itens):</span>
            <span>R$ {cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Frete:</span>
            <span>Grátis</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>R$ {cartTotal.toFixed(2)}</span>
          </div>
          <button 
            className="checkout-button"
            onClick={() => setCheckoutStep(1)}
          >
            Finalizar Compra
          </button>
        </div>
      </>
    )}
  </>
)}

            {checkoutStep === 1 && (
              <form className="shipping-form" onSubmit={handleShippingSubmit}>
                <h4>Informações de Entrega</h4>
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Endereço</label>
                  <input 
                    type="text" 
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cidade</label>
                    <input 
                      type="text" 
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <input 
                      type="text" 
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CEP</label>
                    <input 
                      type="text" 
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Telefone</label>
                    <input 
                      type="tel" 
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="continue-button">
                  Continuar para Pagamento
                </button>
              </form>
            )}

            {checkoutStep === 2 && (
              <form className="payment-form" onSubmit={handlePaymentSubmit}>
                <h4>Informações de Pagamento</h4>
                <div className="form-group">
                  <label>Número do Cartão</label>
                  <input 
                    type="text" 
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nome no Cartão</label>
                  <input 
                    type="text" 
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Validade</label>
                    <input 
                      type="text" 
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input 
                      type="text" 
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <div className="order-summary">
                  <h5>Resumo do Pedido</h5>
                  {cart.map(item => (
                    <div key={item.id} className="order-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="order-total">
                    <span>Total</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button type="submit" className="pay-button">
                  Finalizar Pagamento
                </button>
              </form>
            )}

            {checkoutStep === 3 && (
              <div className="confirmation">
                <div className="confirmation-icon">
                  <FontAwesomeIcon icon={faStar} size="3x" />
                </div>
                <h4>Pedido Confirmado!</h4>
                <p>Obrigado por sua compra na BlackTiger Tattoo.</p>
                <p>Seu número de pedido é: <strong>{orderNumber}</strong></p>
                <p>Enviamos os detalhes do seu pedido para <strong>{shippingInfo.email}</strong>.</p>
                <button 
                  className="back-to-store"
                  onClick={startNewOrder}
                >
                  Voltar para a Loja
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de produto */}
      {showProductModal && selectedProduct && (
        <div className="product-modal-overlay">
          <div className="product-modal">
            <button 
              className="close-modal"
              onClick={closeProductModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <div className="modal-content">
              <div className="modal-images">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <Rating value={selectedProduct.rating} />
                
                <div className="price-container">
                  {selectedProduct.discount ? (
                    <>
                      <span className="old-price">R$ {selectedProduct.price.toFixed(2)}</span>
                      <span className="price">
                        R$ {(selectedProduct.price * (1 - selectedProduct.discount/100)).toFixed(2)}
                      </span>
                      <span className="discount-badge">-{selectedProduct.discount}%</span>
                    </>
                  ) : (
                    <span className="price">R$ {selectedProduct.price.toFixed(2)}</span>
                  )}
                </div>
                
                <p className="stock-status">
                  {selectedProduct.stock > 0 
                    ? `${selectedProduct.stock} unidades disponíveis` 
                    : 'Produto esgotado'}
                </p>
                
                <div className="product-actions">
                  <button 
                    className={`favorite-button ${favorites.includes(selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(selectedProduct.id)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    {favorites.includes(selectedProduct.id) 
                      ? 'Remover dos Favoritos' 
                      : 'Adicionar aos Favoritos'}
                  </button>
                  
                  <button 
                    className="add-to-cart-button"
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeProductModal();
                      setShowCart(true);
                    }}
                    disabled={selectedProduct.stock <= 0}
                  >
                    {selectedProduct.stock > 0 
                      ? 'Adicionar ao Carrinho' 
                      : 'Esgotado'}
                  </button>
                </div>
                
                <div className="product-description">
                  <h3>Descrição do Produto</h3>
                  <p>{selectedProduct.description}</p>
                </div>
                
                <div className="product-details">
                  <h3>Detalhes</h3>
                  <ul>
                    <li><strong>Categoria:</strong> {selectedProduct.category}</li>
                    <li><strong>Disponibilidade:</strong> {selectedProduct.stock > 0 ? 'Em estoque' : 'Esgotado'}</li>
                    <li><strong>Entrega:</strong> 2-5 dias úteis</li>
                    <li><strong>Avaliação:</strong> {selectedProduct.rating} estrelas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
     
    </div>
  );
};

export default Store;