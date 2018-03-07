var toJs = require('nodejava').toJs;
var spring = require("spring");
var result = {};
result.data = '';
result.msg = '操作失败';
result.code = 500;
var isDataSeq = param.isDataSeq || false; //20180122 king 是否手动读取主键序列号.
var thisUserId = com.tt.pwp.framework.security.SecurityUtils.getLoginAccountId();
var thisTime = com.tt.pwp.framework.util.formatter.DateFormatterUtil.long2YYYY_MM_DDHH24miss(new java.util.Date());
var logger = com.tt.pwp.framework.util.log.LogUtil();
logger.info("pluginTreeSrv.srv.js---thisUserId:"+thisUserId+"---thisTime:"+thisTime+"---Param:"+JSON.stringify(param));
var datasource = "";                          //数据源
if (param && param.datasource) {
    var dsMgr = require('pwp-datasource');  //数据源管理对象
    db = dsMgr.db(param.datasource);        //调用db([datasouceId])函数得到指定的数据源对象,dsMgr.db('default')可得到默认数据源
    datasource = param.datasource;
}
var handler = {
    /**
     * 测试改srv 中调用别的srv方法；
     */
    test: function (params) {

        return result;
    },
    /**
     * 根据ID查询某一个。当没有版本号时，返回最新版本号的ID
     */
    findById: function (param) {

        var pluginTrees;
        if (param.id && param.pid) {
            pluginTrees = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree", "id = ? and pid = ? ", [param.id, param.pid]));
        } else if (param.id) {
            pluginTrees = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree", "id = ? ", [param.id]));
        } else if (param.pid) {
            var sql = "select * from tp_plugin_tree where id = (select max(id) from tp_plugin_tree where pid = ?)";
            pluginTrees = toJs.parse(db.queryForList(sql, [param.pid]));
        } else {
            pluginTrees = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree"));
        }
        if (pluginTrees) {
            result.data = pluginTrees;
            result.msg = '查询成功';
            result.code = 200;
        }
        return result;
    },
    findPluginTree: function (param) {
        var childrenData = [];
        var titleMsg = "";//当文件夹为子项没有文件夹时,后面添加的提示
        var datas = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree", " pid IS NULL ", []));//查询空值项
        if (datas && datas.length != 0) {
            for (var i = 0, dl = datas.length; i < dl; i++) {
                var obj1 = datas[i];
                var childrenObj1 = {
                    text: obj1.name,
                    id: obj1.id,
                    pid: obj1.pid,
                    state: 'closed',
                    attributes: [
                        {id: obj1.ver_id},
                        {pid: obj1.pid}
                    ]
                }
                var obj1children = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree", "pid = ? ", [obj1.id]));
                var childrenData2 = [];
                if (obj1children && obj1children.length > 0) {
                    var chil2 = obj1children;
                    var childrenData2Plugin = [];

                    for (var i2 = 0, dcl2 = chil2.length; i2 < dcl2; i2++) {
                        var obj2 = chil2[i2];
                        var childrenObj2 = {
                            text: obj2.name,
                            id: obj2.id,
                            pid: obj2.pid,
                            state: 'closed',
                            attributes: [
                                {id: obj2.ver_id},
                                {pid: obj2.pid}
                            ]
                        }
                        var childrenData3 = [];
                        var obj2children = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree", "pid = ? ", [obj2.id]));
                        if (obj2children && obj2children.length > 0) {
                            var chil3 = obj2children;

                            for (var i3 = 0, dcl3 = chil3.length; i3 < dcl3; i3++) {
                                var obj3 = chil3[i3];
                                var childrenObj3 = {
                                    text: obj3.name,
                                    id: obj3.id,
                                    pid: obj3.pid,
                                    state: 'closed',
                                    attributes: [
                                        {id: obj3.ver_id},
                                        {pid: obj3.pid}
                                    ]
                                }
                                var childrenData4 = [];
                                var obj3children = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin_tree", "pid = ? ", [obj3.id]));
                                if (obj3children && obj3children.length > 0) {
                                    var chil4 = obj3children;

                                    for (var i4 = 0, dcl4 = chil4.length; i4 < dcl4; i4++) {
                                        var obj4 = chil4[i4];
                                        var childrenObj4 = {
                                            text: obj4.name,
                                            id: obj4.id,
                                            pid: obj4.pid,
                                            state: 'closed',
                                            attributes: [
                                                {id: obj4.ver_id},
                                                {pid: obj4.pid}
                                            ]
                                        }
                                        var childrenData5 = [];
                                        if (obj4.children && obj4.children.length > 0) {

                                        } else {
                                            childrenObj4.text += titleMsg;
                                        }
                                        /*-----------*/
                                        var obj5Plugins = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin", "tree_type_id = ? ", [obj4.id]));
                                        //console.log(obj4.id + ",obj5Plugins:" + JSON.stringify(obj5Plugins));
                                        for (var ip5 = 0, dp5 = obj5Plugins.length; ip5 < dp5; ip5++) {
                                            var objp5 = obj5Plugins[ip5];
                                            var pluginObj5 = {
                                                text: objp5.name,
                                                id: objp5.id,
                                                ver_id: objp5.ver_id,
                                                attributes: [
                                                    {id: objp5.ver_id},
                                                    {name: objp5.name}
                                                ]
                                            }
                                            childrenData5.push(pluginObj5);
                                        }
                                        /*-----------*/
                                        //console.log( ",childrenData5----------------------:" + JSON.stringify(childrenData5));
                                        childrenObj4.children = childrenData5;
                                        childrenData4.push(childrenObj4);
                                    }

                                } else {
                                    childrenObj3.text += titleMsg;
                                }
                                /*-----------*/
                                var obj4Plugins = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin", "tree_type_id = ? ", [obj3.id]));
                                //console.log(obj3.id + ",obj4Plugins:" + JSON.stringify(obj4Plugins));
                                for (var ip4 = 0, dp4 = obj4Plugins.length; ip4 < dp4; ip4++) {
                                    var objp4 = obj4Plugins[ip4];
                                    var pluginObj4 = {
                                        text: objp4.name,
                                        id: objp4.id,
                                        ver_id: objp4.ver_id,
                                        attributes: [
                                            {id: objp4.ver_id},
                                            {name: objp4.name}
                                        ]
                                    }
                                    childrenData4.push(pluginObj4);
                                }
                                /*-----------*/
                                childrenObj3.children = childrenData4;
                                childrenData3.push(childrenObj3);
                            }
                            childrenObj2.children = childrenData3;
                        } else {
                            childrenObj2.text += titleMsg;
                        }
                        /*-----------*/
                        var obj3Plugins = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin", "tree_type_id = ? ", [obj2.id]));
                        //console.log(obj2.id + ",obj3Plugins:" + JSON.stringify(obj3Plugins));
                        for (var ip3 = 0, dp3 = obj3Plugins.length; ip3 < dp3; ip3++) {
                            var objp3 = obj3Plugins[ip3];
                            var pluginObj3 = {
                                text: objp3.name,
                                id: objp3.id,
                                ver_id: objp3.ver_id,
                                attributes: [
                                    {id: objp3.ver_id},
                                    {name: objp3.name}
                                ]
                            }
                            childrenData3.push(pluginObj3);
                        }
                        /*-----------*/
                        childrenObj2.children = childrenData3;
                        childrenData2.push(childrenObj2);
                    }


                } else {
                    childrenObj1.text += titleMsg;
                }
                /*-----------*/
                var obj2Plugins = toJs.parse(db.dao.findAll("editor.editorModel.tp_plugin", "tree_type_id = ? ", [obj1.id]));
                //console.log(obj1.id + ",obj2Plugins:" + JSON.stringify(obj2Plugins));
                for (var ip2 = 0, dp2 = obj2Plugins.length; ip2 < dp2; ip2++) {
                    var objp2 = obj2Plugins[ip2];
                    var pluginObj2 = {
                        text: objp2.name,
                        id: objp2.id,
                        ver_id: objp2.ver_id,
                        attributes: [
                            {id: objp2.ver_id},
                            {name: objp2.name}
                        ]
                    }
                    childrenData2.push(pluginObj2);
                }
                /*-----------*/
                childrenObj1.children = childrenData2;
                childrenData.push(childrenObj1)
            }
        } else {

        }
        logger.info("加载树,树长度:"+childrenData.length+";childrenData" + JSON.stringify(childrenData));
        if (childrenData) {
            result.data = childrenData;
            result.msg = '查询成功';
            result.code = 200;
        }
        return result;
    }


}
return handler[param.funName](param);
