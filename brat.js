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

    // 1. Mengunjungi halaman bratgenerator.com
    await page.goto('https://www.bratgenerator.com/');

    // 2. Mengklik tombol untuk mengubah tema (toggleButtonWhite)
    await page.click('#toggleButtonWhite');

    // 3. Mengubah nilai input text
    await page.fill('#textInput', inputText);

    // Tunggu jika ada perubahan UI (misalnya, animasi atau render elemen baru)
    await page.waitForTimeout(500);

    // 4. Mengambil screenshot dari memeContainer
    const memeContainer = await page.locator('#memeContainer');
    const screenshotBuffer = await memeContainer.screenshot();

    // 5. Menutup browser
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
