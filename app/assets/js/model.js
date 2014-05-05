(function(){
'use strict';

// BaseModel
var base = {
    toJSONDeep: function() {
        return $.extend(true, {}, this.attributes);
    },
    destroy: function(options) {
        var _this = this;

        options = options ? _.clone(options) : {};
        _this.trigger('destroy', _this, _this.collection, options);
    },
    setJson: function() {
    }
};

App.Models.Base = Backbone.Model.extend(base);
App.Models.NestedBase = Backbone.NestedModel.extend(base);

App.Models.PageTitle = App.Models.Base.extend({
    defaults: {
        content: ''
    },
    setContent: function(content) {
        this.set('content', content);
    },
    getContent: function() {
        return this.get('content');
    }
});

App.Models.ServerGroup = App.Models.Base.extend({
    defaults: {
        name: '',
        serverName: '',
        servers: []
    },
    saveServerGroup: function() {
        var savedStr = App.getLocalStorageItem("serverGroups"),
            saved, forSave;

        try {
            saved = jQuery.parseJSON(savedStr);
        } catch (e) {
            saved = false;
        }
        if (!saved) {
            saved = {};
        }

        forSave = this.toJSON();

        if (this.hasChanged('name')) {
            delete saved[this.previous('name')];
        } else {
        }

        saved[forSave.name] = forSave;
        App.setLocalStorageItem("serverGroups", JSON.stringify(saved));
    },
    deleteServerGroup: function() {
        var savedStr = App.getLocalStorageItem("serverGroups"),
            saved;

        try {
            saved = jQuery.parseJSON(savedStr);
        } catch (e) {
            saved = false;
        }
        if (!saved) {
            saved = {};
        }

        delete saved[this.get('name')];
        App.setLocalStorageItem("serverGroups", JSON.stringify(saved));
        this.destroy();
    }
});

App.Models.Status = App.Models.Base.extend({
    setJson: function(data, options) {
        this.set(data, options);
    },
    getStatus: function(success, complete, options) {
        var _this, apiUrl, cachedVal;
        _this = this;
        apiUrl = _this.get('server') + '/monitor/' + _this.get('serverName') + '/status';

        if (App.Caches.http) {
            cachedVal = App.Caches.http.getItem(apiUrl);
            if (cachedVal) {
                _this.setJson(cachedVal, options);
                success(cachedVal);
                complete();
                return false;
            }
        }

        return $.ajax({
            type: 'GET',
            url: apiUrl,
            success: function(data) {
                App.Caches.http.setItem(apiUrl, data, {
                    expirationAbsolute: moment().add('h', 3).toDate(),
                    expirationSliding: null,
                    priority: Cache.Priority.NORMAL
                });
                _this.setJson(data, options);
                success(data);
            },
            complete: complete
        });
    },
    editStatus: function(postData, success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.get('server') + '/monitor/' + _this.get('serverName') + '/status';

        return $.ajax({
            type: 'POST',
            url: apiUrl + '/edit',
            data: postData,
            success: function(data) {
                App.Caches.http.setItem(apiUrl, data, {
                    expirationAbsolute: moment().add('h', 3).toDate(),
                    expirationSliding: null,
                    priority: Cache.Priority.NORMAL
                });
                _this.setJson(data, options);
                success(data);
            },
            complete: complete
        });
    }
});

App.Models.Query = App.Models.Base.extend({
    setJson: function(data, options) {
        this.set(data, options);
    },
    getQuery: function(limit, success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.get('server') + '/monitor/' + _this.get('serverName') + '/query/' + _this.get('name');

        return $.ajax({
            type: 'GET',
            url: apiUrl,
            data: {
                limit: limit
            },
            success: function(data) {
                _this.setJson(data, options);
                success(data);
            },
            complete: complete
        });
    },
    editStatus: function(postData, success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.collection.server + '/monitor/' + _this.collection.serverName + '/query/' + _this.get('name') + '/edit';

        return $.ajax({
            type: 'POST',
            url: apiUrl,
            data: postData,
            success: function(data) {
                App.Caches.http.removeItem(_this.collection.server + '/monitor/' + _this.collection.serverName + '/status');
                _this.setJson(data, options);
                success(data);
            },
            complete: complete
        });
    },
    deleteQuery: function(success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.collection.server + '/monitor/' + _this.collection.serverName + '/query/' + _this.get('name') + '/delete';

        return $.ajax({
            type: 'POST',
            url: apiUrl,
            success: function(data) {
                App.Caches.http.removeItem(_this.collection.server + '/monitor/' + _this.collection.serverName + '/status');
                _this.destroy(options);
                success(data);
            },
            complete: complete
        });
    }
});

}());