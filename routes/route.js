const express = require("express");
const router = express.Router();

//Middleware
const { authenticated } = require("../middleware/auth");

//IMAGE
const { uploadImage } = require("../controller/uploadImage");

//USER
const {
  registerUser,
  loginUser,
  getUserId,
  getAllUser,
  deleteUser,
  updateUser,
} = require("../controller/user");

//Trip
const {
  getAllJourney,
  addJourney,
  getJourneyUser,
  getJourneyById,
  getJourneyByTitle,
} = require("../controller/journey");

//Bookmarks
const {
  getBookmarkUser,
  addBookmarkUser,
  getBookmarkJourney,
  deleteBookmarkUser,
} = require("../controller/bookmark");

//ENDPOINT USER
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", authenticated, getUserId);
router.get("/user", getAllUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);

//ENDPOINT TRIP
router.get("/journey", getAllJourney);
router.get("/search/:title", getJourneyByTitle);
router.get("/journey/:id", getJourneyUser);
router.get("/detail/:id", getJourneyById);
router.post("/journey", addJourney);

//ENDPOINT BOOKMARK
router.get("/bookmark/:id", getBookmarkUser);
router.post("/bookmark", addBookmarkUser);
router.get("/journey-bookmark/:id", getBookmarkJourney);
router.delete("/delete/:journeyId/:userId", deleteBookmarkUser);

//ENDPOINT IMAGE
router.post("/image", uploadImage);

//EXPORTS MODULE
module.exports = router;
