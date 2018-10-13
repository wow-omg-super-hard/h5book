/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-07 18:40:26
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'backbone', 'underscore' ], function (Bb, _) {
    return Bb.View.extend({
        initialize: function (options) {
            this.bindSelector = options.bindSelector || '.page__swipe';
            this.onSwipe = options.onSwipe || function () {};

            // 绑定事件
            this.bindEvents();
            // 初始化属性
            this.initProps();
            // 设置常量数据
            this.setConstantData();
        },

        handleTouchStart: function (e) {
            var touch;

            if (!this.isTouched) {
                touch = this.getTouch(e);
                this.isTouched = true;
                this.offsetX = this.getTranslateXPosition();
                this.pullStartX = touch.pageX;
            }
        },

        handleTouchMove: function (e) {
            var touch, deltaX;

            if (this.isTouched) {
                touch = this.getTouch(e);
                this.pullX = touch.pageX;
                deltaX = this.pullX - this.pullStartX;
                this.moving(this.offsetX + deltaX);
            }
        },

        handleTouchEnd: function () {
            var deltaX;

            if (this.isTouched) {
                this.isTouched = false;
                deltaX = this.pullX - this.pullStartX;
                this.moved(deltaX);
                this.onSwipe();
            }
        },

        bindEvents: function () {
            this.events = {};
            this.events[ 'touchstart' ] = 'handleTouchStart';
            this.events[ 'touchmove' ] = 'handleTouchMove';
            this.events[ 'touchend' ] = 'handleTouchEnd';
            this._ensureElement();
        },

        initProps: function () {
            this.offsetX = this.pullStartX = this.pullX = 0;
            this.currPage = 0;
            this.maxPage = this.$el.children().length - 1;
            this.isTouched = false;
        },

        setConstantData: function () {
            this.moveX = this.$el.children().width();
            this.moveLimit = Math.floor(this.moveX / 3);
        },

        moving: function (x) {
            var $el = Bb.$(this.bindSelector);

            // 禁止过渡动画
            if ($el.css('transition') !== 'none') {
                $el.css('transition', 'none');
            }

            this.setTranslateXPosition(x);
        },

        moved: function (deltaX) {
            var $el = Bb.$(this.bindSelector);

            // 开启过渡动画
            if ($el.css('transition') === 'none') {
                $el.css('transition', 'transform .2s ease-out');
            }

            // 往左滑
            if (deltaX < 0) {
                //如果滑动距离超过最大滑动限制
                if (Math.abs(deltaX) > this.moveLimit) {
                    // 如果当前页不是最后一页，则滑动到下一页
                    if (this.currPage < this.maxPage) {
                        this.currPage++;
                    }
                }
            } else {
                if (Math.abs(deltaX) > this.moveLimit) {
                    if (this.currPage > 0) {
                        this.currPage--;
                    }
                }
            }

            this.setTranslateXPosition(-this.currPage * this.moveX);
        },

        getTouch: function (e) {
            var touch = e.touches[ 0 ];

            return touch;
        },

        setTranslateXPosition: function (x) {
            var el = Bb.$(this.bindSelector)[ 0 ];
            var transform = el.style.transform === '' 
                ? 'translate3d('+ x +'px, 0, 0)'
                : el.style.transform.replace(/translate(3d)?\(([^()]+)\)/i, function () { return 'translate3d('+ x +'px, 0, 0)'; });

            el.style.transform = transform; 
        },

        getTranslateXPosition: function () {
            var el = Bb.$(this.bindSelector)[ 0 ];
            var translate = /translate(3d)?\(([^()]+)\)/i.test(el.style.transform) ? RegExp.$2 : '', translates, x;

            if (translate === '') {
                x = 0;
            } else {
                translates = translate.split(/[,\s]+/);
                x = parseFloat(translates[ 0 ]);
            }

            return x;
        }
    });   
});
