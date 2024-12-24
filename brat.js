const express = require('express');
const { chromium } = require('playwright');

const app = express();
const port = 3000; // Port server

// Middleware untuk parsing JSON body
app.use(express.json());

// Endpoint untuk mengambil screenshot
app.post('/screenshot', async (req, res) => {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).send('inputText harus disertakan');
    }

    // Memulai browser dan halaman
    const browser = await chromium.launch();
  const page = await browser.newPage();

  // 2. Buka halaman web
  await page.goto('URL_HALAMAN'); // Ganti dengan URL halaman Anda

  // 3. Tunggu dan tutup pop-up persetujuan cookie jika ada
  await page.locator('#onetrust-accept-btn-handler').click(); // Ganti dengan selector tombol jika berbeda

  // 4. Tunggu elemen toggleButtonWhite muncul dan klik
  await page.locator('#toggleButtonWhite').waitFor({ state: 'visible' });
  await page.click('#toggleButtonWhite');

  // 5. Ubah nilai input dengan ID textInput
  await page.fill('#textInput', 'KONTOLL'); // Ganti 'KONTOLL' dengan teks yang diinginkan

  // 6. Tunggu beberapa saat jika diperlukan, pastikan elemen termodifikasi dengan baik
  await page.waitForTimeout(500); // Menunggu 500ms jika perlu untuk perubahan UI atau animasi

  // 7. Temukan elemen memeContainer dan ambil screenshot
  const memeContainer = page.locator('#memeContainer');
  await memeContainer.screenshot({ path: 'meme-container.png' });

  // 8. Tutup browser
  await browser.close();

    // Mengirimkan screenshot sebagai respon
    res.set('Content-Type', 'image/png');
    res.send(screenshotBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan dalam pengambilan screenshot');
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
