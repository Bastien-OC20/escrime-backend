const models  = require("../models")
const Article = models.articles
const User    = models.users

// Tous les articles
exports.findAllArticles = ('unhandledRejection' ,(req, res, next) => {
    Article.findAll({
        include: {
            model: User,
            required: true,
            attributes: ["isAdmin", "avatar", "isActive"]
        },
        order: [["id", "DESC"]]
    })
    .then(articles => {
        const ListeArticles = articles.map(article => {
            return Object.assign({},
                {
                    id: article.id,
                    createdAt: article.createdAt,
                    article: article.article,
                    articleTitle: article.articleTitle,
                    articleChapo: article.articleChapo,
                    articleUrl: article.articleUrl,
                    UserId: article.UserId,
                    isAdmin:article.User.isAdmin,
                    avatar: article.User.avatar,
                    isActive: article.User.isActive
                }
            )
        })
        res.status(200).json({ ListeArticles })
        console.log(ListeArticles)
    })
    .catch(error => res.status(400).json({ error }))
})

// Tous les articles d'un utilisateur
exports.findAllArticlesForOne = ('unhandledRejection' , (req, res, next) => {
    Article.findAll({
        where: { UserId: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["isAdmin", "avatar", "isActive"]
        },
        order: [["id", "DESC"]]
    })
    .then(articles => {
        const ListeArticles = articles.map(article => {
            return Object.assign({},
                {
                    id: article.id,
                    createdAt: article.createdAt,
                    article: article.article,
                    articleUrl: article.articleUrl,
                    articleChapo: article.articleChapo,
                    articleTitle: article.articleTitle,
                    UserId: article.UserId,
                    isAdmin:article.User.isAdmin,
                    avatar: article.User.avatar,
                    isActive: article.User.isActive
                }
            )
        })
        res.status(200).json({ ListeArticles })
    })
    .catch(error => res.status(400).json({ error }))
})

// Un seul article
exports.findOneArticle = (req, res, next) => {
    const oneArticle = {}
    Article.findOne({ 
        where: { id: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["isAdmin", "avatar", "isActive"] 
        }
    })
    .then(article => {
        oneArticle.id = article.id
        oneArticle.userId = article.UserId
        oneArticle.avatar = article.User.avatar
        oneArticle.isAdmin = article.User.isAdmin,
        oneArticle.isActive = article.User.isActive
        oneArticle.createdAt = article.createdAt
        oneArticle.article = article.article
        oneArticle.articleChapo = article.articleChapo
        oneArticle.articleTitle = article.articleTitle
    })
    .catch(error => res.status(404).json({ error }))
}

// Créer un article
exports.createArticle = (req, res, next) => {
    let varImage =""
    if (req.file) { varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
    const article = new Article(
        {
            isAdmin: req.body.isAdmin,
            articleTitle: req.body.articleTitle,
            articleChapo: req.body.articleChapo,
            article: req.body.article,
            articleUrl: varImage,

        }
    )
    article.save()
        .then((retour) => res.status(201).json({ message: "Article créé !" }))
        .catch(error => res.status(400).json({ error }))
}

// Modifier un article
exports.modifyArticle = (req, res, next) => {
    const articleObject = req.file ?
      {
        ...req.body.article,
        articleUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      } : { ... req.body}

    Article.update({ ...articleObject, id:  req.params.id}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Article modifié !" }))
    .catch(error => res.status(400).json({ error }))
}

// Supprimer un article
exports.deleteArticle = (req, res, next) => {
  Article.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Article supprimé !" }))
        .catch(error => res.status(400).json({ error }))
}