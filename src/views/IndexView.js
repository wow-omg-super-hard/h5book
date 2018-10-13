define([
    'backbone',
    'underscore',
    'text!indexTmpl.html',
    'BookStoreView',
    'SearchView',
    'ReaderView'
], function (
    Bb,
    _,
    tmpl,
    BookStoreView,
    SearchView,
    ReaderView
) {
    return Bb.View.extend({
        className: 'page__swipe',

        templateFunc: _.template(tmpl),

        initialize: function (options) {
            options || (options = {});
            
            this.parent = options.parent || document.body;
            this.router = options.router;
            this.render();
        },

        render: function () {
            this.$el.html(this.templateFunc()).appendTo(this.parent);
        },

        renderBookStorePage: function () {
            this.bookStoreView = new BookStoreView({ 
                parent: this.$('#pageone')[ 0 ],
                onSkipSearchPage: _.bind(this.skipSearchPage, this)
            }); 
        },

        skipBookStorePage: function () {
            var transform = this.el.style.transform.replace(/translate(3d)?\(([^()]+)\)/i, function () { return 'translate3d(0, 0, 0)'; });

            this.router.navigate('');
            this.$el.css('transform', transform);
        },

        renderSearchPage: function () {
            this.searchView = new SearchView({ parent: this.$('#pageone')[ 0 ] }); 
        },

        skipSearchPage: function () {
            var transform, replaceTranslate;

            this.router.navigate('search');

            if (!this.searchView) {        
                this.searchView = new SearchView({ 
                    parent: this.$('#pagetwo')[ 0 ],
                    onSkipBookStorePage: _.bind(this.skipBookStorePage, this)
                });
            }

            // 针对点击需要进入搜索页的，初始化没有设置transition
            if (this.$el.css('transition').indexOf('transform') < 0) {
                this.$el.css('transition', 'transform .2s ease-out');
            }

            replaceTranslate = 'translate3d('+ (-this.$el.width()) +'px, 0, 0)';

            transform = this.el.style.transform === '' ? replaceTranslate : this.el.style.transform.replace(
                    /translate(3d)?\(([^()]+)\)/i, 
                    _.bind(function () {
                        return replaceTranslate;    
                    }, this)
                );
            
            this.$el.css('transform', transform);
        },

        renderReaderPage: function (noverId) {
            this.readerView = new ReaderView({ parent: this.$('#pageone')[ 0 ] });    
        }
    });
});