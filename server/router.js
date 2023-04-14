const usercontroller = require("./controller/userController");
const adminController = require("./controller/adminController");
const router = require("express").Router();
const authMiddleware = require("./middleware/auth");

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/profile", authMiddleware, usercontroller.profile);

//admin site
router.get("/trip", adminController.allTripget);
router.post("/trip", adminController.postTrip);
router.post("/trip/:id", adminController.updateTrip);

module.exports = router;
