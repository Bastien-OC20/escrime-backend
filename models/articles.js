const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Article extends Model {}
    Article.init({
        articleTitle: {
            type: DataTypes.TEXT
        },
        articleChapo:{
            type: DataTypes.TEXT
        },
        article:{
            type: DataTypes.TEXT
        },
        articleUrl: {
            type: DataTypes.STRING
        },
        articleFile: {
            type: DataTypes.STRING
        },
    }, 
    {
        sequelize,
        modelName: "Article"
    })
    return Article
}