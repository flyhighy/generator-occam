/**
 * @author: <%=author %>
 * @email: <%=email %>
 * @version 0.1.0
 * @date: <%=createTime %>
 * @description:
 */
KISSY.add(function (S, Base) {
    "use strict";

    var <%= modName %> = Base.extend({
        initializer : function () {
            var that = this;

        }
    }, {
        ATTRS : {

        }
    });

    return <%= modName %>;

}, {
    requires : ['base']
});