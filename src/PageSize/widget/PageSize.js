define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "dojo/text!PageSize/widget/template/PageSize.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, widgetTemplate) {
    "use strict";

    return declare("PageSize.widget.PageSize", [_WidgetBase, _TemplatedMixin], {

        templateString: widgetTemplate,

        // node
        selectNode: null,

        //modeler
        target: null,
        options: null, // {rows: 2, caption: "small", isDefault: true}

        widgetBase: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,
        _grid: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
            // populate some <option> elements with data from the modeler
            this._setOptionsEls(); // [HTMLNode, HTMLNode]
            // get a handle on the datagrid
            this._grid = this._getTargetGrid();
            this._updateGrid();
            // attach a listener to the <select> that updates the grid
            this.connect(this.selectNode, "change", this._updateGrid);
        },

        update: function(obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;

            this._updateRendering(callback);
        },

        _updateGrid: function() {
            // console.log(this._grid.domNode);
            var size = this.selectNode.value * 1;
            this._grid._dataSource._pageSize = size;
            this._grid.params.config.gridpresentation.rows = size;
            this._grid.reload();
        },

        _getTargetGrid: function() {
            var gridNode = document.querySelector(".mx-name-" + this.target);
            if (gridNode) {
                return dijit.registry.byNode(gridNode);
            }
            console.error("Could not find the grid");
            return null;
        },

        _setOptionsEls: function() {
            return this.options.forEach(lang.hitch(this, function(option) {
                var o = document.createElement("option");
                dojoHtml.set(o, option.caption || option.rows);
                o.value = option.rows;
                this.selectNode.appendChild(o);
                if (option.isDefault) {
                    this.selectNode.value = o.value;
                }
            }));
        },

        resize: function(box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function() {
            logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function(callback) {
            logger.debug(this.id + "._updateRendering");

            this._executeCallback(callback);
        },

        _executeCallback: function(cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["PageSize/widget/PageSize"]);