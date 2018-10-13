/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-06 17:36:50
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([
    'backbone',
    'underscore',
    'text!searchTmpl.html',
    'BookSearchSubView',
    'BookTagListSubView',
    'bookAction',
    'searchBooksStore',
    'TapClick'
], function (
    Bb, 
    _, 
    tmpl,
    BookSearchSubView,
    BookTagListSubView,
    bookAction,
    searchBooksStore,
    TapClick
) {
    return Bb.View.extend({
        id: 'search',
        
        templateFunc: _.template(tmpl),

        events: {
            'touchend .btn__back': 'handleBack'
        },

        initialize: function (options) {
            options || (options = {});

            this.parent = options.parent || document.body;
            this.onSkipBookStorePage = options.onSkipBookStorePage || function () {};
            this.listenSelectedBookTag = _.bind(this.listenSelectedBookTag, this);
            this.handleSearch = _.bind(this.handleSearch, this);

            // 绑定小说标签选中属性改变事件
            searchBooksStore.onUpdate(this.listenSelectedBookTag);

            // 渲染视图
            this.render();

            // 绑定事件
            this.bindEvent();

            // 默认渲染小说标签视图
            this.renderChild();
        },

        listenSelectedBookTag: function (val) {
            this.$('.text-input > input').val(val);

            // 异步执行，避免在dispatch里没有执行完，在调用dispatch报错
            setTimeout(_.bind(function () {
                this.renderChild('books', { val: val });
            }, this), 0);
        },

        handleBack: function () {
            this.onSkipBookStorePage();
        },

        handleSearch: function (e) {
            bookAction.searchBooks(this.$('.text-input > input').val());
        },

        bindEvent: function () {
            new TapClick({
                el: this.$('.icon__search')[ 0 ],
                cb: this.handleSearch
            });
        },

        remove: function () {
            var originalRemove = this.constructor.__super__.remove;
            originalRemove.call(this);

            searchBooksStore.off('update', this.listenSelectedBookTag);
            this.bookTagsSubView.remove();
        },

        render: function () {
            this.$el.html(this.templateFunc()).appendTo(this.parent);
        },

        renderChild: function (visible, where) {
            visible || (visible = 'bookTag');

            if (visible === 'bookTag') {
                this.bookTagsSubView = new BookTagListSubView({ parent: this.$('.bd_panel')[ 0 ] });
            } else {
                if (this.bookTagsSubView) {
                    this.bookTagsSubView.remove();
                    this.bookTagsSubView = null;
                }

                if (this.bookSearchSubView) {
                    this.bookSearchSubView.remove();    
                }
                
                this.bookSearchSubView = new BookSearchSubView({ 
                    parent: this.$('.bd_panel')[ 0 ],
                    where: where
                });
            }
        }  
    });
});