/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 08:44:15
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'webAppDispatcher' ], function (dispatcher) {
    return {
        searchBooks: function (val) {
            dispatcher.dispatch({
                type: 'SEARCH_BOOKS',
                payload: val
            });    
        },

        getBooks: function (where) {
            var books = [];

            if (where.val !== '0') {
                books = [
                    {
                        id: parseInt(_.uniqueId()),
                        title: '从陈桥到崖山',
                        content: '从一个8岁小孩（柴宗训）到另一个8岁小孩（赵昺）的轮回全景再现南北两宋从927年赵匡胤出生到',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '荣宠田园，屯粮皇后',
                        content: '她是有案底的落魄千金，他是狂放不羁却又权势遮天的B市太子，一场纠葛，她惹上了他。“女人，嫁给我',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '超级科技创意',
                        content: '简介1：“震惊！赵传志的微信和网购，已经改变了我们的生活！据悉，后续还有反重力飞行、人工智能、核聚变',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '我就是超级偶像',
                        content: '他的唱功是歌神级的！他的演技是影帝级的！他的舞蹈是舞王级的！他策划、制作、作词、谱曲、编',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '今古传奇·武侠版 第342期',
                        content: '今古传奇·武侠版 第342期',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '超级科技创意',
                        content: '简介1：“震惊！赵传志的微信和网购，已经改变了我们的生活！据悉，后续还有反重力飞行、人工智能、核聚变',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '我就是超级偶像',
                        content: '他的唱功是歌神级的！他的演技是影帝级的！他的舞蹈是舞王级的！他策划、制作、作词、谱曲、编',
                        author: where.val
                    },
                    {
                        id: parseInt(_.uniqueId()),
                        title: '今古传奇·武侠版 第342期',
                        content: '今古传奇·武侠版 第342期',
                        author: where.val
                    }
                ];
            }

            dispatcher.dispatch({
                type: 'GET_BOOKS',
                payload: books
            });
        }    
    };
});