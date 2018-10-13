/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 08:43:07
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'underscore', 'webAppDispatcher' ], function (_, dispatcher) {
    return {
        selectedBookTag: function (tagName) {
            dispatcher.dispatch({
                type: 'SELECTED_BOOK_TAG',
                payload: tagName
            });
        },

        getBookTags: function () {
            var bookTags = [
                {
                    id: parseInt(_.uniqueId()),
                    name: '如果蜗牛有爱情'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '择天记'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '一夜弃妃'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '诛仙'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '豪门小老婆'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '异能小农民'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '武动乾坤'
                },
                {
                    id: parseInt(_.uniqueId()),
                    name: '别那么骄傲'
                }
            ];

            // 正式环境用ajax，这里模拟所以使用常量代替
            dispatcher.dispatch({
                type: 'GET_BOOK_TAGS',
                payload: bookTags
            })
        }
    };
});