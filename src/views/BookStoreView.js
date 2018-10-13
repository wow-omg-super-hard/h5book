/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-06 07:16:13
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 
    'backbone', 
    'underscore',
    'text!bookStoreTmpl.html',
    'PullRefresher',
    'Swipe',
    'TapClick'
], function (
    Bb,
    _, 
    tmpl,
    PullRefresher,
    Swipe,
    TapClick
) {
    return Bb.View.extend({
        id: 'bookstore',

        templateFunc: _.template(tmpl),

        events: {
            'touchend .tabitem__tap': 'handleSwitch',
        },
        
        initialize: function (options) {
            options || (options = {});

            this.parent = options.parent || document.body;
            this.onSkipSearchPage = options.onSkipSearchPage || function () {};
            this.handleOpenSearchPage = _.bind(this.handleOpenSearchPage, this);

            // 渲染视图
            this.render();

            // 视图交互用到的数据
            this.setData();

            this.bindEvent();

            // 实现下拉刷新
            this.invokePullRefresh();

            // 实现页面滑动
            this.invokeSwipe();
        },

        handleSwitch: function (e) {
            var index = this.$(e.target).index();

            this.selectedTabItem(index);
            this.moveSlider(index);

            e.stopImmediatePropagation();
            // 禁止默认行为(后续click事件)，目的就是为了避免事件穿透
            e.preventDefault();
        },

        handleOpenSearchPage: function () {
            this.onSkipSearchPage();
        },

        bindEvent: function () {
            new TapClick({ 
                el: this.$('.top-bar-search')[ 0 ], 
                cb: this.handleOpenSearchPage 
            });
        },

        render: function () {
            this.$el.html(this.templateFunc(this.props)).appendTo(this.parent);
        },

        setData: function () {
            this.swipeWidth = this.$('.tabitem__tap').width();
        },

        selectedTabItem: function (index) {
            this.$('.tabitem__tap').removeClass('active').eq(index).addClass('active');
        },

        moveSlider: function (index) {
            this.$('.slider__swipe').css('transform', 'translate3d('+ (this.swipeWidth * index) +'px,0,0)');
        },

        invokePullRefresh: function () {
            this.pullRefresher = new PullRefresher({
                el: this.el,
                bindSelector: '.content__pull',
                onRefresh: function () {
                    
                }
            });
        },

        invokeSwipe: function () {
            this.swiper = new Swipe({
                el: this.el,
                bindSelector: '.page__swipe',
                onSwipe: this.handleOpenSearchPage
            });
        }
    });
})