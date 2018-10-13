/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-06 18:08:17
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([
    'backbone',
    'underscore',
    'bookTagAction',
    'bookTagStore'
], 
function (
    Bb,
    _,
    bookTagAction,
    bookTagStore
) {
    return Bb.View.extend({
        id: 'taglist-search',

        tagName: 'ul',

        events: {
            'touchend .tagitem': 'handleSelectedBookTag'
        },

        initialize: function (options) {
            options || (options = {});

            this.parent = options.parent || document.body;
            this.listenFetchBookTags = _.bind(this.listenFetchBookTags, this);

            // 渲染视图
            this.render();

            // 绑定得到所有小说标签事件
            bookTagStore.onInit(this.listenFetchBookTags);

            // 查找小说标签
            bookTagAction.getBookTags();
        },

        listenFetchBookTags: function (bookTags) {
            // 批量添加dom，为了性能，应该添加到fragment中，然后在把fragment添加到dom中
            var $fragment = Bb.$(document.createDocumentFragment());

            _.each(bookTags, function (bookTag) {
                $fragment.append(Bb.$('<li data-name="'+ bookTag.name +'" class="tagitem">'+ bookTag.name +'</li>'));
            });

            this.$el.append($fragment);
        },

        handleSelectedBookTag: function (e) {
            bookTagAction.selectedBookTag(Bb.$(e.target).data('name'));
        },

        remove: function () {
            var originalRemove = this.constructor.__super__.remove;
            originalRemove.call(this);

            this.off('init', this.listenFetchBookTags);
        },

        render: function () {
            this.$el.appendTo(this.parent);
        }
    });
});