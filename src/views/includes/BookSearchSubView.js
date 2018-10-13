/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-06 18:08:47
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 
    'backbone', 
    'underscore',
    'text!bookSearchTmpl.html',
    'bookAction',
    'bookStore',
    'OptimizeDisplayElement'
], function (
    Bb,
    _,
    tmpl,
    bookAction,
    bookStore,
    OptimizeDisplayElement
) {
    return Bb.View.extend({
        id: 'booklist__search',

        tagName: 'ul',

        templateFunc: _.template(tmpl),

        initialize: function (options) {
            options || (options = {});

            this.parent = options.parent || document.body;
            this.render = _.bind(this.render, this);

            // 初始化数据
            this.setData(options);

            // 监听获取小说列表
            bookStore.onInit(this.render);

            // 获取小说列表
            bookAction.getBooks(this.where);
        },

        remove: function () {
            var originalRemove = this.constructor.__super__.remove;
            
            originalRemove.call(this);
            bookStore.off('init', this.render);
        },
        
        render: function (books) {
            if (!books.length) {
                this.$el.html('<div style="text-align: center; padding-top: .4rem">没有相应的搜索结果</div>').appendTo(this.parent);
            } else {
                this.$el.html(this.templateFunc({ books: books })).appendTo(this.parent);
                new OptimizeDisplayElement({ el: this.el });
            }
        },

        setData: function (options) {
            this.where = options.where || {};
        }
    });
});