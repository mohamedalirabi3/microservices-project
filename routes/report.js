const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/', (req, res) => {
  const { date, sales, new_users, revenue } = req.body;

  if (!date || !sales || !new_users || !revenue) {
    return res.status(400).json({ error: 'Missing required fields: date, sales, new_users, revenue' });
  }

  try {
    const doc = new PDFDocument();
    const filename = `report_${Date.now()}.pdf`;
    const filePath = `./${filename}`;

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(25).text('Daily Report', { align: 'center' });
    doc.moveDown(1.5);
    doc.fontSize(14).text(`Date: ${date}`, { align: 'left' });
    doc.moveDown(0.5);
    doc.text(`Sales: ${sales}`, { align: 'left' });
    doc.moveDown(0.5);
    doc.text(`New Users: ${new_users}`, { align: 'left' });
    doc.moveDown(0.5);
    doc.text(`Revenue: ${revenue} EGP`, { align: 'left' });

    doc.end();

    doc.on('finish', () => {
      res.download(filePath, filename, (err) => {
        if (err) {
          res.status(500).json({ error: 'Error downloading the file' });
        }
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF: ' + error.message });
  }
});

module.exports = router;