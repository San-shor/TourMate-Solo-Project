const usercontroller = require("./controller/userController");
const adminController = require("./controller/adminController");
const bookingController = require("./controller/bookingController");
const requestController = require("./controller/request");
const router = require("express").Router();
const authMiddleware = require("./middleware/auth");

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/profile", authMiddleware, usercontroller.profile);
router.post("/logout", authMiddleware, usercontroller.logout);

//admin site
router.get("/trip", adminController.allTripget);
router.post("/trip", adminController.postTrip);
router.post("/trip/:id", adminController.updateTrip);
router.post("/trip/:id", adminController.deleteTrip);

//Booking
router.get("/booking", bookingController.getBookingInfo);
router.post("/booking", bookingController.postBooking);

//Request
router.get("/request", requestController.getRequest);
router.post("/request", requestController.postRequest);

module.exports = router;
