/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 08:07:24
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 
    'flux', 
    'bookStore',
    'bookTagStore', 
    'searchBooksStore' 
], function (
    flux, 
    bookStore,
    bookTagStore, 
    searchBooksStore
) {
    var dispatcher = new (flux.Dispatcher);

    dispatcher.register(function (action) {
        switch (action.type) {
            case 'SELECTED_BOOK_TAG':
                searchBooksStore.update(action.payload);
                break;

            case 'GET_BOOK_TAGS':
                bookTagStore.init(action.payload);
                break;

            case 'GET_BOOKS':
                bookStore.init(action.payload);
                break;

            case 'SEARCH_BOOKS':
                searchBooksStore.update(action.payload);
                break;
        }
    });

    return dispatcher;
});