// end point of JavaScript
$(function(){
    'use strict';

    // global setting for ajax
    $.ajaxSetup({
        dataType: 'json',
        timeout: 60000,
        error : function(jqXHR, textStatus) {
            var data;

            if (textStatus === 'abort') {
                return;
            }

            data = App.parseError(jqXHR);

            if (data && _.has(data, 'error')) {
                App.showAlert(data.error, 'danger');
                return;
            }
            
            App.showAlert('Server error', 'danger');
        },
    });

    // enable enter tab
    $(document).on('keydown', '.enable-tab', function(e) {
        var keyCode = e.keyCode || e.which,
            $this = $(this),
            start, end;

        if (keyCode === 9) {
            e.preventDefault();
            start = $this.get(0).selectionStart;
            end = $this.get(0).selectionEnd;

            $this.val($(this).val().substring(0, start) + "\t" + $this.val().substring(end));

            $this.get(0).selectionStart = $this.get(0).selectionEnd = start + 1;
        }
    });

    // server groups
    App.Collections.serverGroups = new App.Collections.ServerGroups();
    App.Collections.serverGroups.getFromLocalStorage();

    // model
    App.Models.pageTitle = new App.Models.PageTitle();

    // view
    App.Views.pageTitle = new App.Views.PageTitle({el: $('.page-name'), model: App.Models.pageTitle});
    App.Views.main = new App.Views.Main({el: $('.main-view')});
    App.Views.sidebar = new App.Views.Sidebar({el: $('.sidebar-view')});

    // mediatorを作成
    App.mediator = _.extend({}, Backbone.Events);

    // Cacheを作成
    App.Caches.http = new Cache(10);

    // Backbone routerを作成
    App.router = new App.Router();

    // Application start
    Backbone.history.start();
});