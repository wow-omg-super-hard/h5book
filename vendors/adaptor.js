/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-03 11:36:27
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'jquery' ], function ($) {
    return function (width) {
        var $meta, $html, metaContent, fontSize;

        // 如果不存在，则创建meta标签
        if (($meta = $('meta[name="viewport"]')).length <= 0) {
            metaContent = 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no';
            $meta = $('<meta name="viewport" content="'+ metaContent +'" />').prependTo(document.head);
        }

        // 通过document.clientWidth设置html标签的
        $html = $(document.documentElement);
        fontSize = parseFloat(($html.width() / width).toFixed(4)) * 100;
        $html.css('fontSize', fontSize);
    };
});