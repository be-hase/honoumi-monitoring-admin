this["App"] = this["App"] || {};
this["App"]["Templates"] = this["App"]["Templates"] || {};

this["App"]["Templates"]["monitor_common"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" "
    + escapeExpression(((stack1 = (depth0 && depth0.selected)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n";
  return buffer;
  }

  buffer += "<div class=\"clearfix\">\n    <small>Group name : </small>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ", <small>Server name : </small>";
  if (helper = helpers.serverName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.serverName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n    <div class=\"pull-right\">\n        <select name=\"server\" class=\"form-control input-sm\">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.servers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n    </div>\n</div>";
  return buffer;
  });

this["App"]["Templates"]["monitor_sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"list-group\">\n    <a href=\"#monitor/";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/status\" class=\"list-group-item ";
  if (helper = helpers.statusActive) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.statusActive); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Status</a>\n    <a href=\"#monitor/";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/queries\" class=\"list-group-item ";
  if (helper = helpers.queriesActive) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.queriesActive); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Queries</a>\n</div>\n";
  return buffer;
  });

this["App"]["Templates"]["queries_main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr class=\"table-data\">\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.storeCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.maxStoreCountDisplay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>\n                        <a href=\"#monitor/"
    + escapeExpression(((stack1 = (depth1 && depth1.groupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/queries/"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"btn btn-primary btn-xs\">View result</a>\n                    </td>\n                    <td>\n                        <button class=\"btn btn-danger btn-xs change-status-btn\">"
    + escapeExpression(((stack1 = (depth0 && depth0.changeStatusDisplay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n                    </td>\n                    <td>\n                        <button class=\"btn btn-danger btn-xs delete-btn\">Delete</button>\n                    </td>\n                </tr>\n";
  return buffer;
  }

  buffer += "<div class=\"clearfix some-action-wrap\">\n    <div class=\"pull-left\">\n        <button class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" data-target=\".add-query-modal\">Add query</button>\n    </div>\n    <div class=\"pull-right\">\n        <button class=\"btn btn-danger btn-xs start-all-btn\">Start All</button>\n        <button class=\"btn btn-danger btn-xs stop-all-btn\">Stop All</button>\n        <button class=\"btn btn-danger btn-xs delete-all-btn\">Delete All</button>\n    </div>\n</div>\n\n<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Queries</div>\n    <div class=\"panel-body\">\n        <table class=\"table table-hover\">\n            <thead>\n                <tr class=\"table-head\">\n                    <th>Name</th>\n                    <th>Statement</th>\n                    <th>Store count</th>\n                    <th>Max store count</th>\n                    <th>status</th>\n                    <th></th>\n                    <th></th>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.queries), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<div class=\"modal fade add-query-modal\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n                <h4 class=\"modal-title\">Add query</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div role=\"form\">\n                    <div class=\"form-group\">\n                        <label>Query name.</label>\n                        <input type=\"text\" name=\"queryName\" class=\"form-control\" placeholder=\"Enter query name\" maxlength=\"20\" value=\"\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label>\n                            Query statement.\n                        </label>\n                        <textarea name=\"query\" class=\"form-control enable-tab\" rows=\"5\" placeholder=\"Enter query statement\"></textarea>\n                    </div>\n                    <div class=\"form-group\">\n                        <label>Max store count.</label>\n                        <input type=\"text\" name=\"maxStoreCount\" class=\"form-control\" placeholder=\"Enter max store count\" maxlength=\"10\" value=\"\">\n                    </div>\n                    <div class=\"checkbox\">\n                        <label>\n                            <input type=\"checkbox\" name=\"status\" value=\"on\"> auto start (Start at the same time created.)\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary add-query-btn\">Send</button>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
  return buffer;
  });

this["App"]["Templates"]["query_results_main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <th>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</th>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <tr class=\"table-data\">\n        ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </tr>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n        ";
  return buffer;
  }

  buffer += "<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Query</div>\n    <div class=\"panel-body\">\n        <table class=\"table table-hover\">\n            <thead>\n                <tr class=\"table-head\">\n                    <th>Name</th>\n                    <th>Statement</th>\n                    <th>Store count</th>\n                    <th>Max store count</th>\n                    <th>status</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr class=\"table-data\">\n                    <td>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.storeCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.storeCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.maxStoreCountDisplay) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.maxStoreCountDisplay); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                    <td>";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n\n<div class=\"clearfix some-action-wrap\">\n    <div class=\"pull-left\">\n    </div>\n    <div class=\"pull-right\">\n        <button class=\"btn btn-primary btn-xs export-csv-btn\">export CSV</button>\n        <button class=\"btn btn-primary btn-xs export-excel-btn\">export Excel</button>\n    </div>\n</div>\n\n<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Query Results</div>\n    <div class=\"panel-body\">\n        <div class=\"table-wrap\">\n            <table class=\"table table-hover query-results-table\">\n                <thead>\n                    <tr class=\"table-head\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.resultsKeys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </tr>\n                </thead>\n                <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.resultsArrays), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>";
  return buffer;
  });

this["App"]["Templates"]["server_group_main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div role=\"form\">\n    <div class=\"form-group\">\n        <label>Group name.</label>\n        <input type=\"text\" name=\"name\" class=\"form-control\" placeholder=\"Enter group name\" maxlength=\"20\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    </div>\n    <div class=\"form-group\">\n        <label>\n            Server name.<br>\n            (Parameters when you start the Honoumi-server.)\n        </label>\n        <input type=\"text\" name=\"serverName\" class=\"form-control\" placeholder=\"Enter monitoring server name\" value=\"";
  if (helper = helpers.serverName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.serverName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    </div>\n    <div class=\"form-group\">\n        <label>\n            Servers connection info. (ex: http://10.10.10.10:10081)<br>\n            You can enter more than one separated by a newline.\n        </label>\n        <textarea name=\"servers\" class=\"form-control\" rows=\"8\" placeholder=\"Enter servers (ex: http://10.10.10.10:10081)\">";
  if (helper = helpers.serversStr) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.serversStr); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n    </div>\n    <div class=\"clearfix\">\n        <button class=\"btn btn-default save-btn\">Save</button>\n        <button class=\"btn btn-default save-and-select-btn\">Save and Select</button>\n        <div class=\"pull-right\">\n        <button class=\"btn btn-danger delete-btn\">Delete</button>\n        </div>\n    </div>\n    <br>\n    <p>\n        Save in the localStorage of the browser.\n    </p>\n</div>";
  return buffer;
  });

this["App"]["Templates"]["server_group_sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a href=\"#server_group/"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"list-group-item "
    + escapeExpression(((stack1 = (depth0 && depth0.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n";
  return buffer;
  }

  buffer += "<div class=\"list-group\">\n    <a href=\"#server_group\" class=\"list-group-item ";
  if (helper = helpers.addActive) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.addActive); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Add new group</a>\n</div>\n\n<p>Server group list</p>\n<div class=\"list-group\">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.serverGroups), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["App"]["Templates"]["status_main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n            <div class=\"col-sm-6 col-md-6\">\n                Now monitoring\n            </div>\n            <div class=\"col-sm-6 col-md-6 text-right\">\n                <button class=\"btn btn-xs btn-danger status-change-btn\">stop</button>\n            </div>\n";
  }

function program3(depth0,data) {
  
  
  return "\n            <div class=\"col-sm-6 col-md-6\">\n                Stopped\n            </div>\n            <div class=\"col-sm-6 col-md-6 text-right\">\n                <button class=\"btn btn-xs btn-danger status-change-btn\">start</button>\n            </div>\n";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr class=\"table-data\">\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>\n                        <dl class=\"dl-horizontal\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.properties), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </dl>\n                    </td>\n                </tr>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <dt class=\"property-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt>\n                            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

  buffer += "<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Monitoring status</div>\n    <div class=\"panel-body\">\n        <div class=\"row\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNowMonitoring), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</div>\n\n<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Event types</div>\n    <div class=\"panel-body\">\n        <table class=\"table table-hover\">\n            <thead>\n                <tr class=\"table-head\">\n                    <th>Event name</th>\n                    <th>properties</th>\n                </tr>\n            </thead>\n            <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.eventTypes), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>\n";
  return buffer;
  });

this["App"]["Templates"]["table_for_excel"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>";
  if (helper = helpers.worksheet) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.worksheet); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>";
  if (helper = helpers.table) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.table); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</table></body></html>";
  return buffer;
  });