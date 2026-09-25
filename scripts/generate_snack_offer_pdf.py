import os
import base64
import io
import subprocess
import qrcode
from PIL import Image

def get_base64_image(image_path):
    if not os.path.exists(image_path):
        print(f"Warning: File not found: {image_path}")
        return ""
    ext = os.path.splitext(image_path)[1].lower().replace('.', '')
    mime = f"image/{ext}"
    if ext == "jpg":
        mime = "image/jpeg"
    elif ext == "webp":
        mime = "image/webp"
    with open(image_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")
    return f"data:{mime};base64,{encoded}"

def generate_qr_base64(url):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=1,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0f172a", back_color="#ffffff")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{encoded}"

def create_html(output_html_path):
    workspace_dir = os.path.abspath("d:/Projects/osz-foodistribution/osz-next")
    
    logo_b64 = get_base64_image(os.path.join(workspace_dir, "public/assets/logo.png"))
    burger_b64 = get_base64_image(os.path.join(workspace_dir, "public/assets/burger-boeuf.webp"))
    poulet_b64 = get_base64_image(os.path.join(workspace_dir, "public/assets/filet-poulet.webp"))
    shawarma_b64 = get_base64_image(os.path.join(workspace_dir, "public/assets/shawarm-2a.webp"))
    
    wa_url = "https://wa.me/212670594545?text=Bonjour%20OSZ%20Food%20Distribution%2C%20je%20souhaite%20recevoir%20votre%20grille%20tarifaire%20grossiste%20et%20demander%20un%20%C3%A9chantillon%20test%20pour%20mon%20restaurant."
    qr_b64 = generate_qr_base64(wa_url)
    
    html_content = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OSZ Food Distribution — Offre B2B Snacks & Restaurants Marrakech</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }}

  @page {{
    size: A4 portrait;
    margin: 0;
  }}

  html, body {{
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #0f172a;
    font-size: 11px;
    line-height: 1.35;
    overflow: hidden;
  }}

  a {{
    color: inherit;
    text-decoration: none;
  }}

  /* STRICT SINGLE PAGE A4 CONTAINER */
  .page {{
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    position: relative;
    background: #ffffff;
    overflow: hidden;
    page-break-inside: avoid;
    page-break-before: avoid;
    page-break-after: avoid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }}

  /* HEADER */
  .header-banner {{
    background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 55%, #450a0a 100%);
    color: #ffffff;
    padding: 16px 24px 14px 24px;
    position: relative;
    border-bottom: 4px solid #f59e0b;
    flex-shrink: 0;
  }}

  .header-top {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }}

  .logo-container {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}

  .logo-img {{
    height: 38px;
    filter: brightness(0) invert(1);
  }}

  .brand-badge {{
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #fef08a;
  }}

  .header-contact-pill {{
    background: #ffffff;
    color: #0f172a;
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 10.5px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }}

  .dot-green {{
    width: 7px;
    height: 7px;
    background: #10b981;
    border-radius: 50%;
    display: inline-block;
  }}

  .header-main-title {{
    font-family: 'Playfair Display', serif;
    font-size: 21px;
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 4px;
    color: #ffffff;
  }}

  .header-subtitle {{
    font-size: 11px;
    font-weight: 500;
    color: #fed7aa;
    line-height: 1.3;
  }}

  .target-pills {{
    display: flex;
    gap: 6px;
    margin-top: 8px;
  }}

  .target-pill {{
    background: rgba(254, 243, 199, 0.18);
    border: 1px solid rgba(254, 243, 199, 0.32);
    color: #fef3c7;
    font-size: 9px;
    font-weight: 700;
    padding: 2.5px 8px;
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }}

  /* CONTENT AREA */
  .main-content {{
    padding: 12px 22px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }}

  /* GUARANTEES STRIP */
  .guarantees-bar {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }}

  .guarantee-card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 3.5px solid #d97706;
    padding: 7px 9px;
    border-radius: 8px;
  }}

  .guarantee-title {{
    font-size: 10px;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 2px;
  }}

  .guarantee-desc {{
    font-size: 8.5px;
    color: #64748b;
    line-height: 1.2;
  }}

  /* SECTION HEADER */
  .section-intro {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
  }}

  .section-badge {{
    display: inline-block;
    background: #fee2e2;
    color: #991b1b;
    font-size: 9px;
    font-weight: 800;
    padding: 2.5px 9px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 2px;
  }}

  .section-title {{
    font-family: 'Playfair Display', serif;
    font-size: 15.5px;
    font-weight: 800;
    color: #0f172a;
  }}

  .section-sublink {{
    font-size: 9.5px;
    font-weight: 700;
    color: #b45309;
  }}

  /* 3 PRODUCTS GRID */
  .products-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }}

  .product-card {{
    background: #ffffff;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 8px rgba(0,0,0,0.04);
  }}

  .product-image-box {{
    position: relative;
    width: 100%;
    height: 110px;
    background: #f1f5f9;
  }}

  .product-image {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }}

  .product-tag {{
    position: absolute;
    top: 6px;
    left: 6px;
    background: rgba(15, 23, 42, 0.88);
    color: #ffffff;
    font-size: 8px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }}

  .stock-tag {{
    position: absolute;
    top: 6px;
    right: 6px;
    background: #059669;
    color: #ffffff;
    font-size: 8px;
    font-weight: 800;
    padding: 1.5px 5.5px;
    border-radius: 999px;
  }}

  .product-body {{
    padding: 8px 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .product-name {{
    font-size: 11.5px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
    margin-bottom: 2px;
  }}

  .product-cat {{
    font-size: 8.5px;
    font-weight: 700;
    color: #b45309;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }}

  .product-desc {{
    font-size: 9px;
    color: #475569;
    line-height: 1.25;
    margin-bottom: 6px;
  }}

  .specs-list {{
    list-style: none;
    border-top: 1px dashed #e2e8f0;
    padding-top: 4px;
    margin-bottom: 6px;
  }}

  .specs-item {{
    font-size: 8.5px;
    color: #334155;
    display: flex;
    align-items: flex-start;
    gap: 3.5px;
    margin-bottom: 2px;
    line-height: 1.2;
  }}

  .spec-check {{
    color: #059669;
    font-weight: 900;
    font-size: 9px;
    line-height: 1;
  }}

  .price-strip {{
    background: #fffbeb;
    border: 1px solid #fef3c7;
    color: #92400e;
    text-align: center;
    font-size: 9px;
    font-weight: 800;
    padding: 4px 6px;
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    display: block;
  }}

  /* B2B ADVANTAGES STRIP */
  .b2b-advantages-box {{
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 8px 12px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }}

  .adv-item {{
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }}

  .adv-icon {{
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: #fee2e2;
    color: #991b1b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }}

  .adv-icon.amber {{
    background: #fef3c7;
    color: #92400e;
  }}

  .adv-icon.green {{
    background: #d1fae5;
    color: #065f46;
  }}

  .adv-text h4 {{
    font-size: 9.5px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1px;
  }}

  .adv-text p {{
    font-size: 8.2px;
    color: #475569;
    line-height: 1.2;
  }}

  /* MASTER CTA CARD WITH QR CODE */
  .whatsapp-master-card {{
    background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 60%, #450a0a 100%);
    border: 1.5px solid #f59e0b;
    border-radius: 12px;
    padding: 10px 14px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 14px rgba(127, 29, 29, 0.2);
  }}

  .action-info {{
    flex: 1;
    padding-right: 12px;
  }}

  .action-tag {{
    background: #f59e0b;
    color: #000000;
    font-size: 8.5px;
    font-weight: 900;
    padding: 2px 8px;
    border-radius: 999px;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 4px;
  }}

  .action-heading {{
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 3px;
    color: #ffffff;
  }}

  .action-desc {{
    font-size: 9.2px;
    color: #fef08a;
    line-height: 1.25;
    margin-bottom: 6px;
  }}

  .contact-details-row {{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 9px;
  }}

  .contact-pill-item {{
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(255,255,255,0.14);
    padding: 3px 8px;
    border-radius: 5px;
    border: 1px solid rgba(255,255,255,0.22);
    color: #ffffff;
    font-weight: 700;
  }}

  .qr-box {{
    background: #ffffff;
    border-radius: 9px;
    padding: 6px;
    text-align: center;
    flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
  }}

  .qr-img {{
    width: 72px;
    height: 72px;
    display: block;
    margin-bottom: 2px;
  }}

  .qr-caption {{
    font-size: 7.5px;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }}

  /* FOOTER STRIP */
  .footer-strip {{
    background: #0f172a;
    color: #94a3b8;
    padding: 6px 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8.5px;
    border-top: 1px solid #1e293b;
    flex-shrink: 0;
  }}

  .footer-strip strong {{
    color: #ffffff;
  }}
</style>
</head>
<body>

  <!-- ==================== SINGLE PAGE A4 OFFER ==================== -->
  <div class="page">
    
    <!-- HEADER -->
    <div class="header-banner">
      <div class="header-top">
        <div class="logo-container">
          <img src="{logo_b64}" alt="OSZ Food Distribution" class="logo-img">
          <div class="brand-badge">Approvisionnement Direct Grossiste • CHR Marrakech</div>
        </div>
        <a href="{wa_url}" class="header-contact-pill" target="_blank">
          <span class="dot-green"></span>
          <span>WhatsApp Direct : 06 70 59 45 45</span>
        </a>
      </div>

      <h1 class="header-main-title">Offre Grossiste Snacks, Fast-Foods & Restaurants</h1>
      <p class="header-subtitle">
        Fourniture quotidienne des cuisines professionnelles en viandes et volailles fraîches, calibrées et certifiées ONSSA. Prix grossistes dégressifs et livraison garantie le lendemain matin.
      </p>

      <div class="target-pills">
        <span class="target-pill">🍔 Smash & Burger</span>
        <span class="target-pill">🍗 Tacos, Tenders & Fast Food</span>
        <span class="target-pill">🥙 Chawarma & Broches</span>
        <span class="target-pill">🚚 Marrakech & Région</span>
      </div>
    </div>

    <!-- MAIN BODY -->
    <div class="main-content">

      <!-- 4 GUARANTEES BAR -->
      <div class="guarantees-bar">
        <div class="guarantee-card">
          <div class="guarantee-title">🛡️ Agrément ONSSA</div>
          <div class="guarantee-desc">Conformité sanitaire officielle Loi 28-07 & traçabilité par lot.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-title">❄️ Camions Frigorifiques</div>
          <div class="guarantee-desc">Chaîne du froid 100% maîtrisée jusqu'à votre chambre froide.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-title">⏰ Commande jusqu'à 17h</div>
          <div class="guarantee-desc">Gestion souple et réactive de vos volumes et coups de feu.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-title">🚚 Livré Avant 12h</div>
          <div class="guarantee-desc">Livraison gratuite le lendemain matin directement en cuisine.</div>
        </div>
      </div>

      <!-- PRODUCTS INTRO -->
      <div class="section-intro">
        <div>
          <span class="section-badge">Le Trio Indispensable pour votre Brigade</span>
          <h2 class="section-title">Matières Premières Fraîches & Calibrées</h2>
        </div>
        <span class="section-sublink">Découpes sur-mesure &bull; Autres pièces disponibles</span>
      </div>

      <!-- 3 HERO PRODUCTS -->
      <div class="products-grid">
        
        <!-- PRODUCT 1 -->
        <div class="product-card">
          <div class="product-image-box">
            <img src="{burger_b64}" alt="Steak Viande Hachée Pur Bœuf" class="product-image">
            <span class="product-tag">Pur Bœuf 100% (Cru)</span>
            <span class="stock-tag">En Stock</span>
          </div>
          <div class="product-body">
            <div>
              <h3 class="product-name">Steak Haché Pur Bœuf</h3>
              <p class="product-cat">Spécial Burgers & Smash Burgers</p>
              <p class="product-desc">Pur bœuf sélectionné pour une texture tendre et un taux de matière grasse optimisé.</p>
              <ul class="specs-list">
                <li class="specs-item"><span class="spec-check">✓</span> <span>Calibrage sur-mesure (80g à 180g)</span></li>
                <li class="specs-item"><span class="spec-check">✓</span> <span>Smash parfait & jutosité maximale</span></li>
                <li class="specs-item"><span class="spec-check">✓</span> <span>Zéro réduction excessive à la cuisson</span></li>
              </ul>
            </div>
            <a href="{wa_url}" class="price-strip" target="_blank">Demander Tarif Grossiste &rarr;</a>
          </div>
        </div>

        <!-- PRODUCT 2 -->
        <div class="product-card">
          <div class="product-image-box">
            <img src="{poulet_b64}" alt="Filet de Blanc de Poulet Extra" class="product-image">
            <span class="product-tag">Volaille Extra (Crue)</span>
            <span class="stock-tag">Frais du Jour</span>
          </div>
          <div class="product-body">
            <div>
              <h3 class="product-name">Filet Blanc de Poulet</h3>
              <p class="product-cat">Spécial Tacos, Tenders & Émincés</p>
              <p class="product-desc">Blancs de poulet soigneusement parés manuellement, sans peau, sans gras ni cartilage.</p>
              <ul class="specs-list">
                <li class="specs-item"><span class="spec-check">✓</span> <span>Parage 100% net = 0% Déchet</span></li>
                <li class="specs-item"><span class="spec-check">✓</span> <span>Rendement au kilo optimal</span></li>
                <li class="specs-item"><span class="spec-check">✓</span> <span>Arrivage frais quotidien garanti</span></li>
              </ul>
            </div>
            <a href="{wa_url}" class="price-strip" target="_blank">Demander Tarif Grossiste &rarr;</a>
          </div>
        </div>

        <!-- PRODUCT 3 -->
        <div class="product-card">
          <div class="product-image-box">
            <img src="{shawarma_b64}" alt="Viande Poulet Chawarma" class="product-image">
            <span class="product-tag">Rôtisserie & Grill (Crue)</span>
            <span class="stock-tag">Haute Précision</span>
          </div>
          <div class="product-body">
            <div>
              <h3 class="product-name">Viande Poulet Chawarma</h3>
              <p class="product-cat">Spécial Montage de Broche Snack</p>
              <p class="product-desc">Découpe artisanale en lamelles régulières pour un empilage homogène, dense et rapide.</p>
              <ul class="specs-list">
                <li class="specs-item"><span class="spec-check">✓</span> <span>Montage de broche droit et stable</span></li>
                <li class="specs-item"><span class="spec-check">✓</span> <span>Dorure croustillante & cœur fondant</span></li>
                <li class="specs-item"><span class="spec-check">✓</span> <span>Découpe machine ou couteau fluide</span></li>
              </ul>
            </div>
            <a href="{wa_url}" class="price-strip" target="_blank">Demander Tarif Grossiste &rarr;</a>
          </div>
        </div>

      </div>

      <!-- B2B COMMERCIAL ADVANTAGES -->
      <div class="b2b-advantages-box">
        <div class="adv-item">
          <div class="adv-icon">💰</div>
          <div class="adv-text">
            <h4>Prix Grossiste Direct</h4>
            <p>Tarifs dégressifs au volume sans intermédiaire pour maximiser votre marge nette par portion servie.</p>
          </div>
        </div>

        <div class="adv-item">
          <div class="adv-icon amber">🧪</div>
          <div class="adv-text">
            <h4>Pack Échantillon & Test</h4>
            <p>Testez nos produits et validez le rendement en cuisine avec votre chef cuisinier sans aucun engagement.</p>
          </div>
        </div>

        <div class="adv-item">
          <div class="adv-icon green">🧾</div>
          <div class="adv-text">
            <h4>Factures & Conformité</h4>
            <p>Factures professionnelles avec TVA en règle pour une gestion comptable et fiscale sereine.</p>
          </div>
        </div>
      </div>

      <!-- MASTER WHATSAPP & QR CARD -->
      <div class="whatsapp-master-card">
        <div class="action-info">
          <span class="action-tag">Offre Spéciale Bienvenue CHR</span>
          <h3 class="action-heading">Passez à l'Approvisionnement Supérieur</h3>
          <p class="action-desc">
            Scannez le QR Code ou envoyez vos volumes estimés pour recevoir votre <strong>grille tarifaire personnalisée sous 30 min</strong>.
          </p>
          <div class="contact-details-row">
            <a href="{wa_url}" target="_blank" class="contact-pill-item">
              <span>📱 <strong>06 70 59 45 45</strong></span>
            </a>
            <div class="contact-pill-item">
              <span>📍 <strong>Marrakech (Livraison Gratuite)</strong></span>
            </div>
            <div class="contact-pill-item">
              <span>⚡ <strong>Guéliz, Médina, Hivernage, Targa, Agdal</strong></span>
            </div>
          </div>
        </div>

        <a href="{wa_url}" target="_blank" class="qr-box">
          <img src="{qr_b64}" alt="QR Code WhatsApp" class="qr-img">
          <div class="qr-caption">Scanner WhatsApp</div>
        </a>
      </div>

    </div>

    <!-- FOOTER STRIP -->
    <div class="footer-strip">
      <div><strong>OSZ Food Distribution</strong> — Grossiste Spécialiste Viandes & Volailles CHR Marrakech</div>
      <div>📞 WhatsApp : <a href="{wa_url}" target="_blank"><strong>06 70 59 45 45</strong></a></div>
      <div>✉️ commande@osz-foodistribution.ma</div>
      <div>Certifié ONSSA</div>
    </div>
  </div>

</body>
</html>
"""
    with open(output_html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"HTML generated at: {output_html_path}")

def convert_html_to_pdf(html_path, pdf_path):
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]
    print("Running conversion:", " ".join(cmd))
    subprocess.run(cmd, check=True)
    print(f"PDF successfully generated at: {pdf_path}")

if __name__ == "__main__":
    html_file = os.path.abspath("d:/Projects/osz-foodistribution/osz-next/public/offre-snack-restaurant-osz.html")
    pdf_file = os.path.abspath("d:/Projects/osz-foodistribution/osz-next/public/offre-snack-restaurant-osz.pdf")
    create_html(html_file)
    convert_html_to_pdf(html_file, pdf_file)
