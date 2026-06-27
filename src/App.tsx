import React, { useState } from 'react';
import { products, Product } from './data/products';
import { Language, languages, translations } from './i18n/translations';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('ru');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[language];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length
      );
    }
  };

  const getCategoryName = (catId: string) => {
    switch (catId) {
      case 'all': return t.allProducts;
      case 'warehouse': return t.warehouse;
      case 'automated': return t.automated;
      case 'home': return t.home;
      default: return catId;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'warehouse': return t.warehouseBadge;
      case 'automated': return t.automatedBadge;
      case 'home': return t.homeBadge;
      default: return category;
    }
  };

  const getProductTranslation = (product: Product) => {
    return product.translations[language];
  };

  const currentLang = languages.find(l => l.code === language)!;

  const categories = [
    { id: 'all' },
    { id: 'warehouse' },
    { id: 'automated' },
    { id: 'home' }
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/logo.png" alt="MATKASYM" className="logo-img" />
          </div>
          <div className="lang-switcher">
            <button
              className="lang-btn"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <span className="lang-flag">{currentLang.flag}</span>
              <span className="lang-name">{currentLang.name}</span>
              <span className="lang-arrow">▼</span>
            </button>
            {langMenuOpen && (
              <div className="lang-menu">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`lang-option ${lang.code === language ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h2>ONOI SAKTA</h2>
          <p>{t.heroSubtitle}</p>
          <p>{t.heroTagline}</p>
        </div>
      </section>

      {/* Categories */}
      <nav className="categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {getCategoryName(cat.id)}
          </button>
        ))}
      </nav>

      {/* Products Grid */}
      <main className="products-grid">
        {filteredProducts.map(product => {
          const pt = getProductTranslation(product);
          return (
            <article key={product.id} className="product-card" onClick={() => openProduct(product)}>
              <div className="product-image">
                <img
                  src={`/images/${product.images[0]}`}
                  alt={pt.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/image1.jpeg';
                  }}
                />
                <span className={`category-badge ${product.category}`}>
                  {getCategoryBadge(product.category)}
                </span>
              </div>
              <div className="product-info">
                <h3>{pt.name}</h3>
                <p className="product-desc">{pt.description.slice(0, 100)}...</p>
                <button className="view-btn">{t.viewMore}</button>
              </div>
            </article>
          );
        })}
      </main>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProduct}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProduct}>×</button>

            <div className="modal-content">
              <div className="modal-gallery">
                <div className="gallery-main">
                  <button className="gallery-nav prev" onClick={prevImage}>‹</button>
                  <img
                    src={`/images/${selectedProduct.images[currentImageIndex]}`}
                    alt={getProductTranslation(selectedProduct).name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/image1.jpeg';
                    }}
                  />
                  <button className="gallery-nav next" onClick={nextImage}>›</button>
                </div>
                <div className="gallery-thumbs">
                  {selectedProduct.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`/images/${img}`}
                      alt=""
                      className={idx === currentImageIndex ? 'active' : ''}
                      onClick={() => setCurrentImageIndex(idx)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/image1.jpeg';
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-details">
                <h2>{getProductTranslation(selectedProduct).name}</h2>

                <p className="modal-desc">{getProductTranslation(selectedProduct).description}</p>

                <div className="modal-section">
                  <h4>{t.features}</h4>
                  <ul className="features-list">
                    {getProductTranslation(selectedProduct).features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>{t.applications}</h4>
                  <div className="applications">
                    {getProductTranslation(selectedProduct).applications.map((a, idx) => (
                      <span key={idx} className="app-tag">{a}</span>
                    ))}
                  </div>
                </div>

                <button className="contact-btn">{t.requestPrice}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ONOI SAKTA</h4>
            <p>{t.footerEquipment}</p>
            <p>{t.footerProject}</p>
          </div>
          <div className="footer-section">
            <h4>{t.ourValues}</h4>
            <p>{t.qualityYears}</p>
            <p>{t.centralAsianDesign}</p>
          </div>
          <div className="footer-section">
            <h4>Kaizen</h4>
            <p>{t.continuousImprovement}</p>
            <p>{t.workEfficiently}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
