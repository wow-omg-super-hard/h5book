/**
 * 
 * @authors zengwenbin (henshuaimeibian@163.com)
 * @date    2018-10-09 10:07:14
 * @link    https://github.com/wow-omg-super-hard
 * @version 1.0
 */

define([ 'backbone', 'underscore' ], function (Bb, _) {
    return _.extend({}, Bb.Events, {
        store: [],

        // 检测变化的属性，支持命名空间属性
        getChanges: function (original, waitUpdate, changes, baseKey) {
            // 使用深比较
            var self = this, waitValue;
            changes || (changes = []);
            baseKey || (baseKey = '');

            _.each(original, function (value, key) {
                if (key in waitUpdate) {
                    waitValue = waitUpdate[ key ];

                    if (baseKey) {
                        key = baseKey + '.' + key;
                    }

                    // 两个都是对象，则深比较
                    if (typeof value === 'object' && typeof waitValue === 'object') {
                        self.getChanges(value, waitValue, changes, key);

                    // 两个都不是对象，变化的要求是不相等 
                    } else if (typeof value !== 'object' && typeof waitValue !== 'object') {
                        if (value !== waitValue) {
                            changes.push(key);
                        }

                        // 只有一个是对象，该属性是变化的
                    } else {
                        changes.push(key);
                    }
                }
            });

            return changes;
        },

        // 深拷贝
        deepCopy: function (original, waitCopy) {
            var self = this;

            _.each(waitCopy, function (value, key) {
                if (!(key in original) || typeof value !== 'object') {
                    original[ key ] = value;
                } else {
                    if (typeof original[ key ] !== 'object') {
                        original[ key ] = {};
                    }

                    self.deepCopy(original[ key ], value);
                }
            });

            return original;
        },

        // 初始化仓库，一般是ajax请求数据或增加前端状态比如选中状态
        init: function (store) {
            this.store = store;
            this.trigger('init', this.store);
        },

        // 创建
        create: function (waitCreate) {
            var originalLen = this.store.length;
            !(waitCreate instanceof Array) && (waitCreate = [ waitCreate ]);
            this.store = _.union(this.store, waitCreate);

            if (this.store.length > originalLen) {
                this.trigger('create', waitCreate);
            }
        },

        // 删除
        delete: function (id) {
            var waitDelete = this.find(id), idx;

            if (waitDelete) {
                idx = _.findIndex(this.store, waitDelete);
                this.store = _.union(this.store.slice(0, idx), this.store.slice(idx + 1));
                this.trigger('delete', waitDelete);
            }
        },

        // 修改
        update: function (id, waitUpdate) {
            var originalUpdate = this.find(id), idx, beforeCopy, updated, changes, propKeys, propValue;

            if (originalUpdate) {
                beforeCopy = _.extend({}, originalUpdate);
                idx = _.findIndex(this.store, originalUpdate);
                // 深拷贝
                updated = this.deepCopy(beforeCopy, waitUpdate);
                // 深比较得到改变的命名空间属性
                changes = this.getChanges(originalUpdate, updated);
                this.store = _.union(this.store.slice(0, idx), [ updated ], this.store.slice(idx + 1));

                // 触发改变属性事件
                _.each(changes, _.bind(function (prop) {
                    // 使用reduce迭代命名空间属性获取最终值
                    propKeys = prop.split('.');
                    propValue = _.reduce(propKeys, function (memo, key) { return memo[ key ]; }, updated);

                    this.trigger('update:' + prop, propValue, updated);
                }, this));
            }
        },

        // 查找
        find: function (id) {
            var where = id;

            if (typeof id !== 'function') {
                if (typeof id === 'object') {
                    where = function (item) {
                        return _.isMatch(item, id);
                    };
                } else {
                    where = function (item) {
                        return item.id === id;
                    };
                }
            }

            return _.find(this.store, where);
        },

        onInit: function (cb) {
            this.on('init', cb);
        },

        onCreate: function (cb) {
            this.on('create', cb);
        },

        onDelete: function (cb) {
            this.on('delete', cb);
        },

        onUpdate: function (cbs) {
            _.each(cbs, _.bind(function (val, key) {
                this.on('update:' + key, val);
            }, this));
        }
    });
});
