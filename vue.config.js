module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Licent";
                return args;
            });
        config
            .module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .options({
                transformAssetUrls: {
                    video: ['src', 'poster'],
                    source: 'src',
                    img: 'src',
                    image: 'xlink:href',
                    'b-img': 'src',
                    'b-img-lazy': ['src', 'blank-src'],
                    'b-card': 'img-src',
                    'b-card-img': 'img-src',
                    'b-carousel-slide': 'img-src',
                    'b-embed': 'src'
                }
            });
    }
}