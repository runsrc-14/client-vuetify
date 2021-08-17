const path = require('path')
module.exports = {
    transpileDependencies: ["vuetify"],
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer:{
        proxy:{
            '/api':{
                // target:'http://localhost:5000'
                target:'https://smf-rmuti-control.herokuapp.com/'
                // target:'http://www.smf-rmuti.lnw.mn/'
            }
        },
        // port:5000
    }
}