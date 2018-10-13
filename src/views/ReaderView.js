/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-07 08:16:08
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 
    'backbone', 
    'underscore',
    'text!readerTmpl.html'
], function (
    Bb, 
    _,
    tmpl
) {
    return Bb.View.extend({  
        id: 'reader',
              
        templateFunc: _.template(tmpl),

        initialize: function (options) {
            this.parent = options.parent || document.body;
            this.render();
        },

        render: function () {
            this.$el.html(this.templateFunc()).appendTo(this.parent);
        }    
    });
});