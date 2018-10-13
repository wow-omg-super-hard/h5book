/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-03 10:36:29
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 
    'backbone',
    'IndexView'
], function (
    Bb,
    IndexView
) {
    var Router = Bb.Router.extend({
        routes: {
            '': 'renderBookStore',
            'search': 'renderSearchPage',
            'reader/:id': 'renderReaderPage'     
        },

        initialize: function () {
            this.indexView = new IndexView({ 
                parent: document.querySelector('#root'),
                router: this
            });
        },

        renderBookStore: function () {
            this.indexView.renderBookStorePage();
        },

        renderSearchPage: function () {
            this.indexView.renderSearchPage();
        },

        renderReaderPage: function (noverId) {
            this.indexView.renderReaderPage();
        }
    });  

    return Router;
});
