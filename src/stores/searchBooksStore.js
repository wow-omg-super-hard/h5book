/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-11 18:50:29
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'backbone', 'underscore' ], function (Bb, _) {
    return _.extend({}, Bb.Events, {
        store: '',

        update: function (waitUpdate) {
            if (this.store !== waitUpdate) {
                this.store = waitUpdate;    
                this.trigger('update', waitUpdate);
            }
        },

        onUpdate: function (cb) {
            this.on('update', function (updated) {
                cb(updated);
            });
        }
    })
});

