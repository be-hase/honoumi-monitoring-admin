(function(){
'use strict';

App.Router = Backbone.Router.extend({
    existingAjax: false,
    routes: {
        "monitor/:name/status": "getStatus",
        "monitor/:name/queries": "getQueries",
        "monitor/:name/queries/:queryName": "getQueryResults",
        "server_group/:name": "serverGroup",
        "server_group": "serverGroup",
        "*path": "defaultRouting"
    },
    monitorCommon: function(name) {
        var _this, serverGroup, context, currentServer, servers;
        _this = this;

        serverGroup = App.Collections.serverGroups.getByName(name);
        if (!serverGroup) {
            return false;
        }
        servers = serverGroup.get('servers');

        currentServer = _this.getCurrentServer(serverGroup);

        context = {};
        context.name = serverGroup.get('name');
        context.serverName = serverGroup.get('serverName');
        context.servers = [];
        _.each(servers, function(value){
            context.servers.push({
                value: value,
                selected: currentServer === value ? 'selected' : ''
            });
        });

        App.Models.pageTitle.setContent(App.Templates.monitor_common(context));

        return serverGroup;
    },
    getCurrentServer: function(serverGroup) {
        var currentServer, servers;

        servers = serverGroup.get('servers');

        currentServer = App.getLocalStorageItem("currentServer");
        if (!currentServer || _.indexOf(servers, currentServer) === -1) {
            currentServer = servers[0];
        }

        return currentServer;
    },
    getStatus: function(name) {
        var _this, serverGroup, status;
        _this = this;

        serverGroup = _this.monitorCommon(name);
        if (!serverGroup) {
            _this.navigate('server_group', {trigger: true});
            return;
        }

        status = new App.Models.Status({
            server: _this.getCurrentServer(serverGroup),
            serverName: serverGroup.get('serverName')
        });

        _this.beforeAjax();
        _this.existingAjax = status.getStatus(
            function success() {
                App.Views.sidebar.refresh([
                    new App.Views.MonitorSidebar({model: serverGroup})
                ]);
                App.Views.main.refresh([
                    new App.Views.StatusMain({model: status})
                ]);
            },
            function complete() {
                _this.afterAjax();
            },
            {silent: true}
        );
    },
    getQueries: function(name) {
        var _this, serverGroup, queries;
        _this = this;

        serverGroup = _this.monitorCommon(name);
        if (!serverGroup) {
            _this.navigate('server_group', {trigger: true});
            return;
        }

        queries = new App.Collections.Queries([], {
            groupName: serverGroup.get('name'),
            server: _this.getCurrentServer(serverGroup),
            serverName: serverGroup.get('serverName')
        });

        _this.beforeAjax();
        _this.existingAjax = queries.getQueries(
            function success() {
                App.Views.sidebar.refresh([
                    new App.Views.MonitorSidebar({model: serverGroup})
                ]);
                App.Views.main.refresh([
                    new App.Views.QueriesMain({collection: queries})
                ]);
            },
            function complete() {
                _this.afterAjax();
            },
            {silent: true}
        );
    },
    getQueryResults: function(name, queryName, params) {
        var _this, serverGroup, query, limit;
        _this = this;

        serverGroup = _this.monitorCommon(name);
        if (!serverGroup) {
            _this.navigate('server_group', {trigger: true});
            return;
        }

        query = new App.Models.Query({
            name: queryName,
            groupName: serverGroup.get('name'),
            server: _this.getCurrentServer(serverGroup),
            serverName: serverGroup.get('serverName')
        });
        
        limit = 1000;
        if (params && $.isNumeric(params.limit)) {
            limit = params.limit;
        }

        _this.beforeAjax();
        _this.existingAjax = query.getQuery(
            limit,
            function success() {
                App.Views.sidebar.refresh([
                    new App.Views.MonitorSidebar({model: serverGroup})
                ]);
                App.Views.main.refresh([
                    new App.Views.QueryResultsMain({model: query})
                ]);
            },
            function complete() {
                _this.afterAjax();
            },
            {silent: true}
        );
    },
    serverGroup: function(name) {
        var _this, serverGroup;
        _this = this;

        App.Models.pageTitle.setContent('Select server group');
        
        if (!name) {
            serverGroup = new App.Models.ServerGroup();
        } else {
            serverGroup = App.Collections.serverGroups.getByName(name);
            if (!serverGroup) {
                _this.navigate('server_group', {trigger: true});
                return;
            }
        }

        App.Views.sidebar.refresh([
            new App.Views.ServerGroupSidebar({collection: App.Collections.serverGroups})
        ]);
        App.Views.main.refresh([
            new App.Views.ServerGroupMain({model: serverGroup})
        ]);
    },
    defaultRouting: function() {
        this.navigate('server_group', {trigger: true});
    },
    beforeAjax: function() {
        if (this.existingAjax) {
            this.existingAjax.abort();
        }
        App.showLoading();
    },
    afterAjax: function() {
        this.existingAjax = false;
        App.hideLoading();
        $('.modal-backdrop').remove();
    }
});

}());