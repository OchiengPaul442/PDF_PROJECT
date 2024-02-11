const express = require("express");
const router = express.Router();
const Pdf = require("../models/pdf.model");
const upload = require("../cloudinaryConfig");
const cloudinary = require('cloudinary').v2;

// get all pdfs
router.get("/view", async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add a pdf
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const { title, description } = req.body;
  const fileURL = req.file.path;

  try {
    const newPdf = new Pdf({
      title,
      description,
      fileURL,
    });

    await newPdf.save();
    res.json({ message: "Pdf uploaded!" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
});

// delete a pdf
router.delete("/delete/:id", (req, res) => {
  Pdf.findById(req.params.id)
    .then((pdf) => {
      cloudinary.uploader.destroy(pdf.cloudinary_id, (error, result) => {
        if (error) return res.json({ error });

        Pdf.findByIdAndDelete(req.params.id)
          .then(() => res.json("Pdf and associated image deleted."))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
