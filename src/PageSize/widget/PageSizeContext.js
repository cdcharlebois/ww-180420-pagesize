define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/html",
    "PageSize/widget/PageSize"
], function(declare, lang, dojoHtml, PageSize) {
    "use strict";

    return declare("PageSize.widget.PageSizeContext", [PageSize], {

        attribute: null,

        /**
         * @override
         */
        update: function() {
            var ctxOption = document.createElement("option"),
                defaultSize = this._contextObj.get(this.attribute) * 1;
            dojoHtml.set(ctxOption, defaultSize);
            ctxOption.value = defaultSize;
            this.selectNode.appendChild(ctxOption);
            this.selectNode.value = ctxOption.value;
            this._updateGrid();
        },

    });
});

require(["PageSize/widget/PageSizeContext"]);