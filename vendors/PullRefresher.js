/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-03 14:25:03
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'backbone', 'underscore' ], function (Bb, _) {
    return Bb.View.extend({
        initialize: function (options) {
            _.extend(
                this, 
                {   
                    dist: 50,
                    bindSelector: '.content__pull',
                    onRefresh: function () {}
                }, 
                _.pick(options, [ 'dist', 'bindSelector', 'onRefresh' ])
            );

            this.initEvent();
            this.initPosition();
            this.initData();
            this.setTransitionStyle();
            this.initPullPromptPart();
        },

        handleTouchStart: function (e) {
            var touch;

            if (this.mode === 'pending') {
                touch = this.getTouchPosition(e);
                this.pullStartX = touch.pageX;
                this.pullStartY = touch.pageY;
                this.offsetY = this.getTranslateYPosition();
                this.mode = 'pull';
            }
        },

        handleTouchMove: function (e) {
            var pullYDist, touch;

            if (this.mode === 'pull') {
                touch = this.getTouchPosition(e);
                this.pullX = touch.pageX;
                this.pullY = touch.pageY;
                pullYDist = this.pullY - this.pullStartY;
                this.isVertical = Math.abs(this.pullY - this.pullStartY) > Math.abs(this.pullX - this.pullStartX);
                this.pull((this.offsetY + pullYDist) / 3, pullYDist / 3);
            }
        },

        handleTouchEnd: function (e) {
            if (this.mode === 'pull') {
                this.mode = 'pending';
                this.offsetY = this.getTranslateYPosition();

                this.refresh();
            }
        },

        getTouchPosition: function (e) {
            var touch = e.touches[ 0 ];

            return touch;
        },

        getTranslateYPosition: function () {
            var el = this.$(this.bindSelector)[ 0 ];
            var translate = /translate(3d)?\(([^()]+)\)/i.test(el.style.transform) 
                ? RegExp.$2 
                : '';
            var translates, y;

            if (translate === '') {
                y = 0;
            } else {
                translates = translate.split(/[,\s]+/);
                y = parseFloat(translates[ 1 ]);
            }

            return y;
        },

        setTransitionYPosition: function (y) {
            var el = this.$(this.bindSelector)[ 0 ];
            var translate = el.style.transform === '' ? 'translate3d(0, '+ y +'px, 0)' : el.style.transform.replace(/translate(3d)?\(([^()]+)\)/i, function () {
                return 'translate3d(0, '+ y +'px, 0)';
            });

            el.style.transform = translate;
        },

        pull: function (y, pullYDist) {
            var el = this.$(this.bindSelector)[ 0 ];

            if (this.isVertical) {
                // 如果是往下下拉
                if (pullYDist > 0) {
                    if (el.style.transition !== 'none') {
                        el.style.transition = 'none';
                    }

                    this.setTransitionYPosition(y);

                    // 如果超出了最大下拉距离，那么当前模式就为准备刷新
                    if (pullYDist >= this.dist) {
                        this.$pullPromptPart.html('松开以刷新');
                        this.status = 'refresh';

                        // 如果小于最大下拉距离，那么当前模式就为下拉
                    } else {
                        this.$pullPromptPart.html('下拉可刷新');
                        this.status = 'pull';
                    }
                }
            }
        },

        refresh: function () {
            var el = this.$(this.bindSelector)[ 0 ];

            if (el.style.transition === 'none') {
                el.style.transition = 'transform .2s ease-out';
            }

            if (this.status === 'pull') {
                this.setTransitionYPosition(0);
            } else {
                this.$pullPromptPart.html('刷新中');
                this.setTransitionYPosition(this.dist);
                this.onRefresh();
            }
        },

        initEvent: function () {
            this.events = {};
            this.events[ 'touchstart' ] = 'handleTouchStart';
            this.events[ 'touchmove' ] = 'handleTouchMove';
            this.events[ 'touchend' ] = 'handleTouchEnd';
            this._ensureElement();
        },

        initPosition: function () {
            this.offsetY = this.pullStartX = this.pullStartY = this.pullX = this.pullY = 0;
        },

        initData: function () {
            this.mode = 'pending';
            this.status = 'pull';
            this.isVertical = true;
        },

        setTransitionStyle: function () {
            var transition = this.$el.css('transition');

            // 如果没有设置transition，就固定设置1个值
            if (!(/(-webkit-)?transform/i.test(transition))) {
                this.$el.css('transition', 'transform .2s ease-out');
            }
        },

        initPullPromptPart: function () {
            this.$pullPromptPart = Bb.$('<div style="position:absolute;left:0;top:0;width:100%;height:50px;line-height:50px;text-align:center;color:rgba(0, 0, 0, 0.5);font-size:12px">下拉可刷新</div>').insertBefore(this.$(this.bindSelector)[0])//this.$(this.bindSelector).before('<div style="position:absolute;left:0;top:0;width:100%;height:50px;line-height:50px;text-align:center;color:rgba(0, 0, 0, 0.5);font-size:12px">下拉可刷新</div>');
        }
    });
});