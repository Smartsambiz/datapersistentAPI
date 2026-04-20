const express = require("express");
const router = express.Router();

const profileController = require("../controllers/ProfileController");

router.get('/profiles/search', profileController.searchProfiles);
router.post('/profiles', profileController.getProfiles);
router.get('/profiles/:id', profileController.getSingleProfiles);
router.get('/profiles', profileController.getAllProfilesplusFilter);
router.delete('/profiles/:id', profileController.deleteProfile);

module.exports = router;