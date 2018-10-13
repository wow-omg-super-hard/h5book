/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 17:59:52
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'underscore', 'baseStore' ], function (_, baseStore) {
    return _.extend({}, baseStore, { store: [] });
});