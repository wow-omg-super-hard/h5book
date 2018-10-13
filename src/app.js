/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-03 10:20:40
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

var __CORE_PATH__ = 'cores/';
var __MOCK_PATH__ = 'mock/';
var __SRC_PATH__ = 'src/';
var __VENDOR_PATH__ = 'vendors/';

// 配置require
requirejs.config({
    baseUrl: '..',
    paths: {
        'backbone': __CORE_PATH__ + 'backbone',
        'flux': __CORE_PATH__ + 'flux',
        'text': __CORE_PATH__ + 'require.text',
        'underscore': __CORE_PATH__ + 'underscore',
        'jquery': __CORE_PATH__ + 'zepto',
        'Promise': __CORE_PATH__ + 'Promise',
        'adaptor': __VENDOR_PATH__ + 'adaptor',
        'Swipe': __VENDOR_PATH__ + 'Swipe',
        'PullRefresher': __VENDOR_PATH__ + 'PullRefresher',
        'TapClick': __VENDOR_PATH__ + 'TapClick',
        'OptimizeDisplayElement': __VENDOR_PATH__ + 'OptimizeDisplayElement',
        'WebAppRouter': __SRC_PATH__ + 'router/WebAppRouter',
        'baseStore': __SRC_PATH__ + 'stores/baseStore',
        'bookStore': __SRC_PATH__ + 'stores/bookStore',
        'bookTagStore': __SRC_PATH__ + 'stores/bookTagStore',
        'bookChapterStore': __SRC_PATH__ + 'stores/bookChapterStore',
        'readerStore': __SRC_PATH__ + 'stores/readerStore',
        'globalStore': __SRC_PATH__ + 'stores/globalStore',
        'searchBooksStore': __SRC_PATH__ + 'stores/searchBooksStore',
        'webAppDispatcher': __SRC_PATH__ + 'dispatcher/webAppDispatcher',
        'bookTagAction': __SRC_PATH__ + 'actions/bookTagAction',
        'bookAction': __SRC_PATH__ + 'actions/bookAction',
        'IndexView': __SRC_PATH__ + 'views/IndexView',
        'indexTmpl': __SRC_PATH__ + 'templates/indexTmpl',
        'BookStoreView': __SRC_PATH__ + 'views/BookStoreView',
        'bookStoreTmpl': __SRC_PATH__ + 'templates/bookStoreTmpl',
        'SearchView': __SRC_PATH__ + 'views/SearchView',
        'searchTmpl': __SRC_PATH__ + 'templates/searchTmpl',
        'BookSearchSubView': __SRC_PATH__ + 'views/includes/BookSearchSubView',
        'bookSearchTmpl': __SRC_PATH__ + 'templates/bookSearchTmpl',
        'BookTagListSubView': __SRC_PATH__ + 'views/includes/BookTagListSubView',
        'ReaderView': __SRC_PATH__ + 'views/ReaderView',
        'readerTmpl': __SRC_PATH__ + 'templates/readerTmpl'
    }
});

// 初始化
require([ 'backbone', 'adaptor', 'WebAppRouter' ], function (Bb, adaptor, WebAppRouter) {
    // 移动端适配
    adaptor(640);

    // 路由
    new WebAppRouter;
    Bb.history.start({ pushState: true });
});