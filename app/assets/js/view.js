(function(){
'use strict';

// BaseView
App.Views.Base = Backbone.View.extend({
});

App.Views.Manager = App.Views.Base.extend({
    childViews: [],
    removeChilds: function() {
        _.each(this.childViews, function(childView){
            childView.remove();
        });
        this.childViews = [];
    },
    renderChilds: function() {
        var _this = this;

        _.each(this.childViews, function(childView){
            childView.render();
            _this.$el.append(childView.el);
        });
    },
    refresh: function(childViews) {
        this.removeChilds();
        this.childViews = childViews;
        this.renderChilds();
    }
});

App.Views.Main = App.Views.Manager.extend({});

App.Views.Sidebar = App.Views.Manager.extend({});

App.Views.PageTitle = App.Views.Base.extend({
    initialize: function() {
        this.listenTo(this.model, 'change', this.render, this);
    },
    events: {
        'change select[name="server"]': 'changeServer'
    },
    render: function() {
        this.$el.html(this.model.getContent());
        return this;
    },
    changeServer: function(event) {
        var $this = $(event.currentTarget);
        App.setLocalStorageItem("currentServer", $this.val());
        location.reload();
    }
});

App.Views.ServerGroupSidebar = App.Views.Base.extend({
    tagName: 'div',
    className: 'server-group-sidebar-view ',
    initialize: function() {
    },
    render: function() {
        var _this, context, name;
        _this = this;
        name = $.url().fsegment(2);
        context = {
            addActive: !!name ? '' : 'active',
            serverGroups: _this.collection.toJSON()
        };

        _.each(context.serverGroups, function(value){
            value.active = '';
            if (value.name === name) {
                value.active = 'active';
            }
        });

        _this.$el.html(App.Templates.server_group_sidebar(context));

        return _this;
    }
});

App.Views.ServerGroupMain = App.Views.Base.extend({
    tagName: 'div',
    className: 'server-group-main-view',
    initialize: function() {
    },
    events: {
        'click .save-btn': 'clickSave',
        'click .save-and-select-btn': 'clickSaveAndSelect',
        'click .delete-btn': 'clickDelete'
    },
    render: function() {
        var _this, context;
        _this = this;
        context = _this.model.toJSON();
        context.serversStr = context.servers.join('\n');

        _this.$el.html(App.Templates.server_group_main(context));

        return _this;
    },
    clickSave: function() {
        if (!this.saveServerGroup()) {
            return;
        }
        App.router.navigate('server_group/' + this.model.get('name'), {trigger: true});
    },
    clickSaveAndSelect: function() {
        if (!this.saveServerGroup()) {
            return;
        }
        App.router.navigate('monitor/' + this.model.get('name') + '/status', {trigger: true});
    },
    saveServerGroup: function() {
        var _this, name, serverName, serversTmp, servers, serversStr, validServer, isNew;
        _this = this;
        isNew = false;

        if (_this.model.get('name') === '') {
            isNew = true;
        }

        name = $.trim(_this.$('input[name="name"]').val());
        if (!name) {
            App.showAlert('Enter Group name', 'danger');
            return false;
        }
        if (!name.match(/^[a-zA-Z0-9_-]*$/)) {
            App.showAlert("Group name must be alphanumeric, '-', '_'", 'danger');
            return false;
        }
        if (name !== _this.model.get('name')) {
            if (App.Collections.serverGroups.getByName(name)) {
                App.showAlert('This Group name is already used.', 'danger');
                return false;
            }
        }

        serverName = $.trim(_this.$('input[name="serverName"]').val());
        if (!name) {
            App.showAlert('Enter Server name', 'danger');
            return false;
        }
        if (!name.match(/^[a-zA-Z0-9_-]*$/)) {
            App.showAlert("Server name must be alphanumeric, '-', '_'", 'danger');
            return false;
        }

        serversStr = $.trim(_this.$('textarea[name="servers"]').val());
        if (!serversStr) {
            App.showAlert('Enter Servers', 'danger');
            return false;
        }

        servers = [];
        serversTmp = serversStr.split(/\r\n|\r|\n/);
        validServer = true;
        _.each(serversTmp, function(server){
            var url = purl($.trim(server));
            if (!url.attr('protocol')) {
                validServer = false;
            }
            if (!url.attr('host')) {
                validServer = false;
            }
            if (!url.attr('port')) {
                validServer = false;
            }
            servers.push(url.attr('protocol') + '://' + url.attr('host') + ':' + url.attr('port'));
        });
        if (!validServer) {
            App.showAlert('Confirm server protocol, host, port.', 'danger');
            return false;
        }

        _this.model.set({
            name: name,
            serverName: serverName,
            servers: servers
        });
        _this.model.saveServerGroup();
        if (isNew) {
            App.Collections.serverGroups.getFromLocalStorage();
        }

        return true;
    },
    clickDelete: function() {
        this.model.deleteServerGroup();
        App.router.navigate('server_group', {trigger: true});
    }
});

App.Views.MonitorSidebar = App.Views.Base.extend({
    tagName: 'div',
    className: 'monitor-sidebar-view',
    initialize: function() {
    },
    render: function() {
        var _this, context, name;
        _this = this;
        name = $.url().fsegment(3);
        context = {
            statusActive: name === 'status' ? 'active' : '',
            queriesActive: name === 'queries' ? 'active' : '',
            name: _this.model.get('name')
        };

        _this.$el.html(App.Templates.monitor_sidebar(context));

        return _this;
    }
});

App.Views.StatusMain = App.Views.Base.extend({
    tagName: 'div',
    className: 'status-main-view',
    initialize: function() {
        this.listenTo(this.model, 'change', this.render, this);
    },
    events: {
        'click .status-change-btn': 'changeStatus'
    },
    render: function() {
        var _this, context;
        _this = this;
        context = _this.model.toJSON();

        _this.$el.html(App.Templates.status_main(context));

        return _this;
    },
    changeStatus: function(event) {
        var _this, $clicked, postData;
        _this = this;
        $clicked = $(event.currentTarget);
        postData = {
            isNowMonitoring: !_this.model.get('isNowMonitoring')
        };

        $clicked.button('loading');
        _this.model.editStatus(
            postData,
            function() {
            },
            function() {
                $clicked.button('reset');
            }
        );
    }
});

App.Views.QueriesMain = App.Views.Base.extend({
    tagName: 'div',
    className: 'queries-main-view',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render, this);
        this.listenTo(this.collection, 'remove', this.render, this);
    },
    events: {
        'click .change-status-btn': 'changeStatus',
        'click .delete-btn': 'deleteQuery',
        'click .add-query-btn': 'addQuery',
        'click .start-all-btn': 'startAllQuery',
        'click .stop-all-btn': 'stopAllQuery',
        'click .delete-all-btn': 'deleteAllQuery'
    },
    render: function() {
        var _this, context;
        _this = this;
        context = {
            groupName: _this.collection.groupName,
            server: _this.collection.server,
            serverName: _this.collection.serverName,
            queries: _this.collection.toJSON()
        };
        _.each(context.queries, function(value){
            if (value.maxStoreCount === -1) {
                value.maxStoreCountDisplay = 'Not created';
            } else {
                value.maxStoreCountDisplay = value.maxStoreCount;
            }
            if (value.status === 'started') {
                value.changeStatusDisplay = 'stop';
            } else {
                value.changeStatusDisplay = 'start';
            }
        });

        _this.$el.html(App.Templates.queries_main(context));

        return _this;
    },
    changeStatus: function(event) {
        var _this, $clicked, index, query, postData;
        _this = this;
        $clicked = $(event.currentTarget);
        index = _this.$('.change-status-btn').index($clicked);
        query = _this.collection.at(index);
        postData = {
            status: query.get('status') === 'started' ? 'stop' : 'start'
        };

        $clicked.button('loading');
        query.editStatus(
            postData,
            function() {
            },
            function() {
                $clicked.button('reset');
            }
        );
    },
    deleteQuery: function(event) {
        var _this, $clicked, index, query;
        _this = this;
        $clicked = $(event.currentTarget);
        index = _this.$('.delete-btn').index($clicked);
        query = _this.collection.at(index);

        if (!window.confirm('Are you sure ?')) {
            return;
        }

        $clicked.button('loading');
        query.deleteQuery(
            function() {
            },
            function() {
                $clicked.button('reset');
            }
        );
    },
    addQuery: function(event) {
        var _this, $clicked, $addQueryModal, postData;
        _this = this;
        $clicked = $(event.currentTarget);
        $addQueryModal = _this.$('.add-query-modal');
        postData = {
            queryName: $.trim($addQueryModal.find('input[name="queryName"]').val()),
            query: $.trim($addQueryModal.find('textarea[name="query"]').val()),
            maxStoreCount: $.trim($addQueryModal.find('input[name="maxStoreCount"]').val()),
            status: $addQueryModal.find('input[name="status"]:checked').length > 0 ? 'start' : 'stop'
        };

        if (!postData.queryName) {
            App.showAlert('Enter query name', 'danger');
            return false;
        }
        if (!postData.queryName.match(/^[a-zA-Z0-9_-]*$/)) {
            App.showAlert("Query name must be alphanumeric, '-', '_'", 'danger');
            return false;
        }
        if (_this.collection.getByName(postData.queryName)) {
            App.showAlert('This query name is already used.', 'danger');
            return false;
        }

        if (!postData.query) {
            App.showAlert('Enter query statement', 'danger');
            return false;
        }

        if (!postData.maxStoreCount) {
            App.showAlert('Enter max store count', 'danger');
            return false;
        }
        if (!$.isNumeric(postData.maxStoreCount)) {
            App.showAlert('Max store count must be numeric', 'danger');
            return false;
        }

        $clicked.button('loading');
        _this.collection.addQuery(
            postData,
            function() {
                $addQueryModal.one('hidden.bs.modal', _.bind(_this.render, _this));
                $addQueryModal.modal('hide');
            },
            function() {
                $clicked.button('reset');
            },
            {silent: true}
        );
    },
    startAllQuery: function(event) {
        this.editAllQuery(event, true);
    },
    stopAllQuery: function(event) {
        this.editAllQuery(event, false);
    },
    editAllQuery: function(event, isStart) {
        var _this, $clicked, postData;
        _this = this;
        $clicked = $(event.currentTarget);
        postData = {
            status: isStart ? 'start' : 'stop'
        };

        $clicked.button('loading');
        _this.collection.editAll(
            postData,
            function() {
                _this.render();
            },
            function() {
                $clicked.button('reset');
            },
            {silent: true}
        );
    },
    deleteAllQuery: function(event) {
        var _this, $clicked;
        _this = this;
        $clicked = $(event.currentTarget);

        if (!window.confirm('Are you sure ?')) {
            return;
        }

        $clicked.button('loading');
        _this.collection.deleteAll(
            function() {
                _this.render();
            },
            function() {
                $clicked.button('reset');
            },
            {silent: true}
        );
    }
});

App.Views.QueryResultsMain = App.Views.Base.extend({
    tagName: 'div',
    className: 'query-results-main-view',
    initialize: function() {
    },
    events: {
        'click .export-csv-btn': 'exportCsvBtn',
        'click .export-excel-btn': 'exportExcelBtn'
    },
    render: function() {
        var _this, context;
        _this = this;
        context = _this.model.toJSON();

        if (context.maxStoreCount === -1) {
            context.maxStoreCountDisplay = 'Not created';
        } else {
            context.maxStoreCountDisplay = context.maxStoreCount;
        }

        context.resultsKeys = ['_id', '_time'];
        _.each(context.results, function(value) {
            context.resultsKeys = _.union(context.resultsKeys, _.keys(value));
        });

        context.resultsArrays = [];
        _.each(context.results, function(value1) {
            var result = [];
            _.each(context.resultsKeys, function(value2){
                result.push(value1[value2]);
            });
            context.resultsArrays.push(result);
        });

        _this.$el.html(App.Templates.query_results_main(context));

        return _this;
    },
    exportCsvBtn: function() {
        var _this, csvArray, $trs, filename, csvStr, blob, downloadUrl, downloadLink;
        _this = this;
        csvArray = [];
        $trs = _this.$('.query-results-table tr');
        filename = moment().format('YYYYMMDD') + '.csv';

        if ($('html').hasClass('ielt10')) {
            App.showAlert('When the browser you are using is less than IE9, you can not download.', 'danger');
            return;
        }

        $trs.each(function(){
            var result = [];
            $(this).find('th, td').each(function(){
                result.push($(this).text());
            });
            csvArray.push(result);
        });

        csvStr = _.map(csvArray, function(value){
            return value.join(',');
        }).join('\r\n');

        blob = new Blob([csvStr],{type: "text/csv;charset=utf-8;"});
        if (window.navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            downloadUrl = (window.URL || window.webkitURL).createObjectURL(blob);
            downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = downloadUrl;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    },
    exportExcelBtn: function() {
        var blob, $cloneTable, downloadUrl, downloadLink, context, filename;
        context = {
            worksheet: 'Worksheet'
        };
        filename = moment().format('YYYYMMDD') + '.xls';

        if ($('html').hasClass('ielt10')) {
            App.showAlert('When the browser you are using is less than IE9, you can not download.', 'danger');
            return;
        }

        $cloneTable = this.$('.query-results-table').clone();
        context.table = $cloneTable.html();

        blob = new Blob([App.Templates.table_for_excel(context)], {type: "application/vnd.ms-excel;charset=utf-8;"});
        if (window.navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            downloadUrl = (window.URL || window.webkitURL).createObjectURL(blob);
            downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = downloadUrl;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
});

}());