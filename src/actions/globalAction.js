/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 09:51:16
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'webAppDispatcher' ], function (dispatcher) {
    return {
        loading: function () {
            dispatcher.dispatch({
                type: 'LOADING'
            });
        },

        unloading: function () {
            dispatcher.dispatch({
                type: 'UNLOADING'
            });
        }
    };
});
