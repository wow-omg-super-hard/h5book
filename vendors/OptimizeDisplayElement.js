/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-12 18:34:51
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'backbone' ], function (Bb) {
    return Bb.View.extend({
        initialize: function (options) {
            options || (options = {});

            this.setData(options);
            this.setStyle();
            this.handleScroll();
        },

        events: {
            'scroll': 'handleScroll'
        },

        handleScroll: function (e) {
            // 从scrollTop/itemHeight获取当前滚动到第几个子元素的索引
            this.itemIdx = Math.floor(this.$el.scrollTop() / this.itemHeight);
            this.scroll();

            e && e.stopPropagation();
        },

        scroll: function () {
            var self = this, $el;

            self.$el.children().each(function (idx, el) {
                $el = Bb.$(el);

                if ($el.css('position') !== 'absolute') {
                    $el.css({
                        position: 'absolute',
                        left: 0,
                        top: idx * self.itemHeight,
                        width: '100%'
                    });
                }

                if (idx < self.itemIdx || idx > (self.itemIdx + self.itemCount)) {
                    $el.hide();
                } else {
                    $el.show();
                }
            });
        },

        setData: function () {
            // 显示的当前子元素的索引
            this.itemIdx = 0;
            // 每个子元素的高度
            this.itemHeight = this.$el.children().first().height();
            // 元素的可视区域能显示多少个子元素
            this.itemCount = Math.ceil(this.$el.height() / this.itemHeight);
        },

        setStyle: function () {
            if (this.$el.css('position') !== 'relative') {
                this.$el.css('position', 'relative');
            }
        }
    });
});