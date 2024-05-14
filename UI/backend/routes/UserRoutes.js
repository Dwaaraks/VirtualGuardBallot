const express = require("express");
const {
  getAllusers,
  registerController,
  loginController,
  getSingleUser,
  adhar,
  voter,
  showAdhar,
  showVoterID,
} = require("../controller/UserController.js");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/get-Users", getAllusers);

router.post("/singleuser", getSingleUser);

router.post("/adhar", adhar);

router.post("/voter", voter);

router.post("/showAdhar", showAdhar);

router.post("/showVoter", showVoterID);

module.exports = router;
