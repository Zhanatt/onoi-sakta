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
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', countryCode: '+996' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const countryCodes = [
    { code: '+996', country: '🇰🇬 KG', name: 'Кыргызстан' },
    { code: '+7', country: '🇰🇿 KZ', name: 'Казахстан' },
    { code: '+7', country: '🇷🇺 RU', name: 'Россия' },
    { code: '+998', country: '🇺🇿 UZ', name: 'Узбекистан' },
    { code: '+992', country: '🇹🇯 TJ', name: 'Таджикистан' },
    { code: '+993', country: '🇹🇲 TM', name: 'Туркменистан' },
    { code: '+86', country: '🇨🇳 CN', name: 'Китай' },
  ];

  const BITRIX_WEBHOOK = 'https://matkasymov.bitrix24.kz/rest/153247/f6im0fosfryl5qn3/';

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setFormStatus('sending');

    const productName = getProductTranslation(selectedProduct).name;
    const fullPhone = `${formData.countryCode}${formData.phone}`;

    try {
      // 1. Создаём контакт с телефоном
      const contactRes = await fetch(`${BITRIX_WEBHOOK}crm.contact.add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            NAME: formData.name,
            PHONE: [{ VALUE: fullPhone, VALUE_TYPE: 'MOBILE' }],
            ADDRESS_CITY: formData.city,
            SOURCE_ID: 'WEB',
            SOURCE_DESCRIPTION: 'Сайт ONOI SAKTA',
            ASSIGNED_BY_ID: 120059,
          }
        })
      });
      const contactData = await contactRes.json();
      const contactId = contactData.result;

      // 2. Создаём сделку и привязываем контакт
      const dealRes = await fetch(`${BITRIX_WEBHOOK}crm.deal.add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            TITLE: `ONOI SAKTA: ${formData.name} - ${productName}`,
            CATEGORY_ID: 43,
            STAGE_ID: 'C43:NEW',
            ASSIGNED_BY_ID: 120059,
            SOURCE_ID: 'WEB',
            SOURCE_DESCRIPTION: 'Сайт ONOI SAKTA',
            COMMENTS: `📦 Интерес: ${productName}\n📍 Город: ${formData.city}\n📱 WhatsApp: ${fullPhone}`,
            CONTACT_ID: contactId,
          }
        })
      });

      const dealData = await dealRes.json();

      if (dealData.result) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', city: '', countryCode: '+996' });
        setTimeout(() => {
          setShowContactForm(false);
          setFormStatus('idle');
        }, 2000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Bitrix24 error:', error);
      setFormStatus('error');
    }
  };

  const openContactForm = () => {
    setShowContactForm(true);
    setFormStatus('idle');
  };

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

                <button className="contact-btn" onClick={openContactForm}>{t.requestPrice}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
          <div className="contact-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContactForm(false)}>×</button>

            <h3>{t.requestPrice}</h3>
            <p className="contact-product-name">{getProductTranslation(selectedProduct).name}</p>

            {formStatus === 'success' ? (
              <div className="form-success">
                <span className="success-icon">✓</span>
                <p>{t.formSuccess || 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="contact-form">
                <div className="form-group">
                  <label>{t.formName || 'Ваше имя'}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.formNamePlaceholder || 'Введите имя'}
                  />
                </div>

                <div className="form-group">
                  <label>{t.formPhone || 'Телефон'}</label>
                  <div className="phone-input-group">
                    <select
                      value={formData.countryCode}
                      onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
                      className="country-select"
                    >
                      {countryCodes.map((c, idx) => (
                        <option key={idx} value={c.code}>{c.country} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="XXX XXX XXX"
                      className="phone-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.formCity || 'Город'}</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder={t.formCityPlaceholder || 'Откуда вы?'}
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (t.formSending || 'Отправка...') : (t.formSubmit || 'Отправить заявку')}
                </button>

                {formStatus === 'error' && (
                  <p className="form-error">{t.formError || 'Ошибка отправки. Попробуйте позже.'}</p>
                )}
              </form>
            )}
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
