window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("qr-canvas");
  const ctx = canvas.getContext("2d");
  const logoURL = "https://github.com/nazrilacil/nazrilacil.github.io/blob/main/src/png/main-favicon.png?raw=true";

  const loadingSpinner = document.getElementById("loading");
  const showLoading = () => loadingSpinner?.classList.remove("hidden");
  const hideLoading = () => loadingSpinner?.classList.add("hidden");

  window.generateQRCode = () => {
    const text = document.getElementById("text")?.value;
    const color = document.getElementById("qrColor")?.value || "#000000";
    if (!text) return;

    showLoading();

    setTimeout(() => {
      const tempDiv = document.createElement("div");
      new QRCode(tempDiv, {
        text,
        width: 200,
        height: 200,
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });

      const qrCanvas = tempDiv.querySelector("canvas");
      if (!qrCanvas) return;

      ctx.clearRect(0, 0, 200, 200);
      ctx.drawImage(qrCanvas, 0, 0);

      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = logoURL;
      logoImg.onload = () => {
        const size = 40;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg, x, y, size, size);
        ctx.restore();
        hideLoading();
      };
    }, 300);
  };

  window.downloadQR = () => {
    const link = document.createElement('a');
    link.download = `QRcode_AcilCode_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  window.shareQR = () => {
    const text = document.getElementById("text")?.value;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent("Coba lihat QR ini: " + text)}`;
    window.open(url, "_blank");
  };

  window.generateBatch = () => {
    const lines = document.getElementById("batchInput")?.value.trim().split("\n").filter(Boolean);
    const container = document.getElementById("batchResult");
    if (!lines || !container) return;
    container.innerHTML = '';

    lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.className = 'relative w-[150px] h-[150px] mx-auto';

      const tempDiv = document.createElement("div");
      new QRCode(tempDiv, {
        text: line,
        width: 150,
        height: 150,
        correctLevel: QRCode.CorrectLevel.H
      });

      const qrCanvas = tempDiv.querySelector("canvas");

      const canvasBatch = document.createElement("canvas");
      canvasBatch.width = 150;
      canvasBatch.height = 150;
      const ctxBatch = canvasBatch.getContext("2d");
      ctxBatch.drawImage(qrCanvas, 0, 0);

      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = logoURL;
      logoImg.onload = () => {
        const size = 30;
        const x = (canvasBatch.width - size) / 2;
        const y = (canvasBatch.height - size) / 2;
        ctxBatch.save();
        ctxBatch.beginPath();
        ctxBatch.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
        ctxBatch.clip();
        ctxBatch.drawImage(logoImg, x, y, size, size);
        ctxBatch.restore();

        const img = new Image();
        img.src = canvasBatch.toDataURL("image/png");
        wrapper.appendChild(img);
        container.appendChild(wrapper);
      };
    });
  };

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
const toggle = document.getElementById('mobileMenuToggle');
const menu = document.getElementById('mobileMenu');
toggle?.addEventListener('click', () => {
  menu?.classList.toggle('hidden');
});
AOS?.init({ once: true, duration: 800, offset: 100 });
