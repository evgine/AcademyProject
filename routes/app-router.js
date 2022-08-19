const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group-controller");
const RateController = require("../controllers/rate-controller");
const BooksController = require("../controllers/book-controller")

router.get("/groups", GroupController.groupsIndex);
router.post("/groups", GroupController.createGroup);
router.get("/groups/:groupId", GroupController.index);

router.get("/books", BooksController.indexPost);

router.get("/app/users/:userId/rates", RateController.index);
router.post("/app/users/:userId/rates", RateController.indexPost);

module.exports = router;