window.addEventListener('DOMContentLoaded', () => {
  if (typeof QRCode === 'undefined' || !QRCode.CorrectLevel) {
    console.error('QRCode library belum siap!');
    return;
  }

  const loadingSpinner = document.getElementById("loading");

  const showLoading = () => {
    if (loadingSpinner) loadingSpinner.classList.remove("hidden");
  };

  const hideLoading = () => {
    if (loadingSpinner) loadingSpinner.classList.add("hidden");
  };

  window.generateQRCode = () => {
    const textInput = document.getElementById("text");
    const colorInput = document.getElementById("qrColor");
    

    if (!textInput || !colorInput ) return;

    const text = textInput.value;
    const color = colorInput.value;
    const logoURL = "https://github.com/nazrilacil/nazrilacil.github.io/blob/main/src/png/main-favicon.png?raw=true";
    if (!text) return;

    const qrcodeContainer = document.getElementById("qrcode");
    if (!qrcodeContainer) return;
    qrcodeContainer.innerHTML = '';

    showLoading();

    setTimeout(() => {
      new QRCode(qrcodeContainer, {
        text,
        width: 200,
        height: 200,
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });

      const logo = document.getElementById("qr-logo");
      if (logo) {
        if (logoURL) {
          logo.src = logoURL;
          logo.style.display = "block";
        } else {
          logo.style.display = "none";
        }
      }

      hideLoading();
    }, 500);
  };

  window.downloadQR = () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    const date = new Date();
    link.download = `QRcode_AcilCode${date}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  window.shareQR = () => {
    const textInput = document.getElementById("text");
    if (!textInput) return;
    const text = textInput.value;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent("Coba lihat QR ini: " + text)}`;
    window.open(url, "_blank");
  };

  window.generateBatch = () => {
  const batchInput = document.getElementById("batchInput");
  const container = document.getElementById("batchResult");
  if (!batchInput || !container) return;

  const lines = batchInput.value.trim().split("\n").filter(Boolean);
  container.innerHTML = '';

  lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative w-fit mx-auto';

    const qrDiv = document.createElement('div');
    new QRCode(qrDiv, {
      text: line,
      width: 150,
      height: 150,
    });

    const logo = document.createElement('img');
    logo.src = "https://github.com/nazrilacil/nazrilacil.github.io/blob/main/src/png/main-favicon.png?raw=true";
    logo.className = "w-8 h-8 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none";

    wrapper.appendChild(qrDiv);
    wrapper.appendChild(logo);
    container.appendChild(wrapper);
  });
};


  if (window.lucide) {
    window.lucide.createIcons();
  }
});
const toggle = document.getElementById('mobileMenuToggle');
const menu = document.getElementById('mobileMenu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
AOS.init({
  once: true, 
  duration: 800, 
  offset: 100, 
});
