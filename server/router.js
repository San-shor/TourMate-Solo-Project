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
router.put("/trip/:id", adminController.updateTrip);
router.delete("/trip/:id", adminController.deleteTrip);
router.get("/get-overal-data", adminController.getBoardData);

//Booking
router.get("/booking", bookingController.getBookingInfo);
router.get("/booking/:username", bookingController.getBookingInfo);
router.post("/booking", bookingController.postBooking);
router.put("/booking/:id", bookingController.updateBooking);

//Request
router.get("/request", requestController.getRequest);
router.post("/request", requestController.postRequest);
router.put("/request/:id", requestController.updateRequest);

module.exports = router;
