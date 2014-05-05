(function(){
'use strict';

App.Collections.Base = Backbone.Collection.extend({
});

App.Collections.ServerGroups = App.Collections.Base.extend({
    model: App.Models.ServerGroup,
    getFromLocalStorage: function() {
        var _this = this,
            savedStr = App.getLocalStorageItem("serverGroups"),
            saved;

        try {
            saved = jQuery.parseJSON(savedStr);
        } catch (e) {
            saved = false;
        }

        if (!saved) {
            return;
        }

        _this.reset([], {silent: true});
        _.each(saved, function(value){
            _this.push(new App.Models.ServerGroup(value), {silent: true});
        });
    },
    getByName: function(name) {
        return this.findWhere({name: name});
    }
});

App.Collections.Queries = App.Collections.Base.extend({
    model: App.Models.Query,
    initialize: function(models, options) {
        this.groupName = options.groupName;
        this.server = options.server;
        this.serverName = options.serverName;
    },
    getQueries: function(success, complete, options) {
        var _this, apiUrl, cachedVal;
        _this = this;
        apiUrl = _this.server + '/monitor/' + _this.serverName + '/status';

        if (App.Caches.http) {
            cachedVal = App.Caches.http.getItem(apiUrl);
            if (cachedVal) {
                _this.reset(_.map(cachedVal.queries, function(value){
                    return new App.Models.Query(value);
                }), options);
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
                _this.reset(_.map(data.queries, function(value){
                    return new App.Models.Query(value);
                }), options);
                success(data);
            },
            complete: complete
        });
    },
    getByName: function(name) {
        return this.findWhere({name: name});
    },
    addQuery: function(postData, success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.server + '/monitor/' + _this.serverName + '/query/' + postData.queryName;

        return $.ajax({
            type: 'POST',
            url: apiUrl,
            data: postData,
            success: function(data) {
                App.Caches.http.removeItem(_this.server + '/monitor/' + _this.serverName + '/status');
                _this.add(new App.Models.Query(data), options);
                success(data);
            },
            complete: complete
        });
    },
    editAll: function(postData, success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.server + '/monitor/' + _this.serverName + '/queries/edit';

        return $.ajax({
            type: 'POST',
            url: apiUrl,
            data: postData,
            success: function(data) {
                App.Caches.http.removeItem(_this.server + '/monitor/' + _this.serverName + '/status');
                _this.reset(_.map(data, function(value){
                    return new App.Models.Query(value);
                }), options);
                success(data);
            },
            complete: complete
        });
    },
    deleteAll: function(success, complete, options) {
        var _this, apiUrl;
        _this = this;
        apiUrl = _this.server + '/monitor/' + _this.serverName + '/queries/delete';

        return $.ajax({
            type: 'POST',
            url: apiUrl,
            success: function(data) {
                App.Caches.http.removeItem(_this.server + '/monitor/' + _this.serverName + '/status');
                _this.reset(_.map(data, function(value){
                    return new App.Models.Query(value);
                }), options);
                success(data);
            },
            complete: complete
        });
    }
});

}());