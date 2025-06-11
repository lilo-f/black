import AftercareGuide from '../components/AftercareGuide';
import ProductRecommendations from '../components/aftercare/ProductRecommendations';
import FAQ from '../components/aftercare/FAQ';
import '../styles/Aftercare.css'; // Importe o CSS da página

const Aftercare = () => {
  return (
    <div className="aftercare-page">
      <div className="page-header">
        <h1>Cuidados Pós-Tatuagem</h1>
        <p>Tudo o que você precisa saber para cuidar da sua nova tatuagem</p>
      </div>
      
      <AftercareGuide />
      
      <section className="product-recommendations">
        <h2>Produtos Recomendados</h2>
        <ProductRecommendations />
      </section>
      
      <section className="aftercare-faq">
        <h2>Perguntas Frequentes</h2>
        <FAQ />
      </section>
    </div>
  );
};

export default Aftercare;