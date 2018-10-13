/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-12 09:56:27
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 * @移动端的click事件，解决click 300ms延迟
 */

 define([ 'backbone' ], function (Bb) {
    return Bb.View.extend({
        initialize: function (options) {
            options || (options = {});

            this.setData(options);
        },

        events: {
            'touchstart': 'handleTouchStart',
            'touchmove': 'handleTouchMove',
            'touchend': 'handleTouchEnd'
        },

        handleTouchStart: function (e) {
            var touch = e.touches[ 0 ];

            this.moveStartX = touch.pageX;
            this.moveStartY = touch.pageY;
            this.startTime = Date.now();
            this.isExcessMaxDist = false;
            
            e.stopPropagation();
        },

        handleTouchMove: function (e) {
            var touch = e.touches[ 0 ];
            var moveX = touch.pageX - this.moveStartX;
            var moveY = touch.pageY - this.moveStartY;

            this.isExcessMaxDist = Math.abs(moveX) > this.maxDist || Math.abs(moveY) > this.maxDist;

            e.stopPropagation();
        },

        handleTouchEnd: function (e) {
            this.isExcessResTime = Date.now() - this.startTime > this.resTime;

            if (!this.isExcessMaxDist && !this.isExcessResTime) {
                this.cb(e);
                e.stopPropagation();
            }
        },

        setData: function (options) {
            this.cb = options.cb || function () {};
            this.resTime = options.resTime || 150;
            this.maxDist = options.maxDist || 10;
            this.isExcessMaxDist = false;
            this.isExcessResTime = false;
            this.startTime = void 0;
            this.moveStartX = this.moveStartY = 0;
        }
    });
 });

