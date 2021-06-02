const express     = require("express")
const router      = express.Router()
const articleCtrl = require("../controllers/article")
const multer      = require("../middleware/multer-config")


router.get("/",                  articleCtrl.findAllArticles)
router.get("/users/:id",         articleCtrl.findAllArticlesForOne)
router.get("/:id",               articleCtrl.findOneArticle)
router.post("/",         multer, articleCtrl.createArticle)
router.put("/:id",       multer, articleCtrl.modifyArticle)
router.delete("/:id",            articleCtrl.deleteArticle)

module.exports = router