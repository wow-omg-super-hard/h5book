/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 09:11:30
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'webAppDispatcher' ], function (dispatcher) {
    return {
        settingReaderFontSize: function (fontSize) {
            dispatcher.dispatch({
                type: 'SETTING_READER_FONTSIZE',
                fontSize: fontSize
            });    
        },

        settingReaderBackground: function (background) {
            dispatcher.dispatch({
                type: 'SETTING_READER_BACKGROUND',
                background: background
            });
        },

        settingReaderMode: function (mode) {
            dispatcher.dispatch({
                type: 'SETTING_READER_MODE',
                mode: mode
            });
        }
    };
});