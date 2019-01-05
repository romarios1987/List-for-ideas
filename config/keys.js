if (process.env.NODE_ENV === 'production') {
    module.exports = {MongoURI: 'mongodb://Remi:remi222@ds149744.mlab.com:49744/idea-heruku'}
} else {
    module.exports = {MongoURI: 'mongodb://Remi:remi111@ds153763.mlab.com:53763/list_ideas'}
}