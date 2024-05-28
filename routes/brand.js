const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  createBrand,
  allBrands,
  singleBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

router.post("/brand/create", upload.single("image"), createBrand);

router.route("/brands").get(allBrands);
router
  .route("/brand/:id")
  .get(singleBrand)
  .put(upload.single("image"), updateBrand)
  .delete(deleteBrand);

module.exports = router;
