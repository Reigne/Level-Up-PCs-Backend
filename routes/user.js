const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { register, login, profile } = require("../controllers/userController");

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/profile", isAuthenticatedUser, profile);

module.exports = router;
