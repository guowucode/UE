var sde;
var sdefun = new sdeFun();
//系统关键字
var kw = ['hhj', 'huhuanjini'];
//window.SDE_CONFIG.DATASOURCE='aloDataSource';//数据源配置
//window.SDE_CONFIG.PLUGINREGEXP='';//控件正则表达式.
window.SDE_KEYWORD = window.SDE_KEYWORD.concat(kw);

// -----------------扩展方式
var expandJson = [{
    name: '占位符',
    title: '图片占位符',
    onclick: 'sde.insertPic();'
}, {
    name: '按钮',
    title: '插入按钮',
    onclick: 'sde.createButton();'
}, {
    name: '文本域',
    title: '文本域',
    onclick: 'sde.insertTextarea();'
}, {
    name: 'iframe',
    title: 'iframe',
    onclick: 'sde.getDialog();'
}, {
    name: '多图插入',
    title: '多图插入',
    onclick: 'insertMorePic();'
}, {
    name: '打印',
    title: '打印',
    onclick: "sde.__ue__.execCommand( 'print' )"
}, {
    name: '模板',
    title: '文字模板',
    onclick: "sde.__ue__.execCommand('texttemp')"
}];
var reviseJson = [{
    name: '设置',
    title: '设置修订模式',
    onclick: 'sde.setRevise();'
}, {
    name: '查询',
    title: '查询编辑模式',
    onclick: 'alert(window.parent.getMode());'
}, {
    name: '获取',
    title: '获取修订内容',
    onclick: 'alert(window.parent.getRevHtml());'
}, {
    name: '隐藏/显示',
    title: '隐藏/显示修订内容',
    onclick: 'window.parent.disRevHtml();'
}, {
    name: '其他',
    title: '其他',
    onclick: '#'
}];

sdefun.addSDEPlugins_left("sde-toolbar-updateTemplate", "后退", {}, "gotoBack();");
sdefun.addSDEPlugins_left("sde-toolbar-updateTemplate", "保存", {}, "updateTemplate();");// 在工具条上自定义菜单参数1=id,参数2=名称,4如果有第四个参数时，优先执行第四个参数,
sdefun.addSDEPlugins("sde-toolbar-expand", "扩展", expandJson);// 在工具条上自定义菜单参数1=id,参数2=名称,参数3=json,
sdefun.addSDEPlugins("sde-toolbar-revise", "修订", reviseJson);// 在工具条上自定义菜单参数1=id,参数2=名称,参数3=json,
sdefun.addSDEPlugins("sde-toolbar-source", "源码", {}, "sde.setExecCommand(\'source\')");// 在工具条上自定义菜单参数1=id,参数2=名称,4如果有第四个参数时，优先执行第四个参数,
sdefun.addSDEPlugins("sde-toolbar-cleardoc", "清空", {}, "cleardoc()");// 在工具条上自定义菜单参数1=id,参数2=名称,4如果有第四个参数时，优先执行第四个参数,
/*sdefun.addSDEPlugins("sde-toolbar-cleardoc", "所有控件值", {}, "getAllControl()");// 在工具条上自定义菜单参数1=id,参数2=名称,4如果有第四个参数时，优先执行第四个参数,*/
sdefun.addSDEPlugins("sde-toolbar-sdeTools", "操作栏", {}, "sdeTools();");// 在工具条上自定义菜单参数1=id,参数2=名称,4如果有第四个参数时，优先执行第四个参数,

var title = '<div id="printTools" style="float:left;display:none; ">'
    + '<button onclick="lodop()">lodop</button>'
    + '<button onclick="CheckIsInstall(1)">打印预览</button>'
    + '<button onclick="CheckIsInstall(2)">直接打印</button>'
    + '<button onclick="CheckIsInstall(3)">打印维护</button>'
    + '<button onclick="CheckIsInstall(4)">打印设计</button>'
    + '<button onclick="CheckIsInstall(5)">打印码</button>'
    + '<button onclick="CheckIsInstall_lyon(1)">打印_lyon</button>'
    + '<button onclick="getRuleParamById()">getRuleParamById</button>'
    + '<button onclick="getRuleParamByCode()">getRuleParamByCode</button>'
    + '<button onclick="getRuleColumnById()">getRuleColumnById</button>'
    + '<button onclick="getRuleColumnByCode()">getRuleColumnByCode</button>'
    + '<hr/>'
    + '</div>'
    + '<div id="sdeTools" style="float:left;display:none; ">'
    /*+ '<button onclick="sde.insertButton();">插入按钮</button>'
    + '<button onclick="sde.setExecCommand(\'insertrow\')">插入行</button>'
    + '<button onclick="sde.setExecCommand(\'deleterow\')">删除行</button>'
    + '<button onclick="sde.clearLoad(\'去除后加载\');">清除后加载</button>'
    + '<button onclick="alert(JSON.stringify(sde.getControlByParam(\'#EbyId\')));">getControlByParam</button>'
    + '<button onclick="sde.__ue__.setAttrSDE(\'.sde-table\');">setAttrSDE</button>'*/
    + '&nbsp;<a href="/UE/bundle/editor/func/sdeDesc/updateLog/main.vop">帮助文档</a>&nbsp;'
    + '&nbsp;<a href="/UE/bundle/editor/func/pluginManager/pluginList/pluginList.vop">控件管理</a>&nbsp;'
    + '&nbsp;<a href="/UE/bundle/editor/func/templateList/templateList/templateList.vop">模板列表</a>&nbsp;'
    + '<button onclick="printTools();">打印栏</button>'
    + '<button onclick="getDialog();">获取Dialog</button>'
    + '<button onclick="sdefun.templateCopy();">模板另存</button>'
    + '<button onclick="sde.execCommand(\'inserthtml\',\'inserthtml内容\')">inserthtml</button>'
    + '<button onmousedown="sdefun.initSDETree()">初始化树</button>'
    + '<button onmousedown="sdeTree()">显示树</button>'
    + '<button onclick="addReport();">新增报告</button>'
    + '<button onclick="updateReport();">修改报告</button>'
    + '<button onclick="sdefun.updateReportState();">修改报告状态</button>'
    + '<button onclick="templateSave()">新增模板</button>'
    + '<button onclick="updateTemplate();">修改模板</button>'
    + '<button onclick="sde.setDesign();">设计模式</button>'
    + '<button onclick="sde.setEditor();">编辑模式</button>'
    + '<button onclick="sde.setReadonly();">只读模式</button>'
    + '<button onclick="_myFunction()">测试方法</button>'
    + '<button onclick="_setControls()">设置控件值</button>'
    + '<button onclick="_getControl()">获取控件值</button>'
    + '<button onclick="alert(sde.html());">获取html</button>'
    + '<button onclick="alert(JSON.stringify(sde.getAllControl( \'.sde-table2\')))">获取所有控件</button>'
    + '<button onclick="sde.__ue__.execCommand( \'forecolor\',\'rgb(255, 0, 0)\')">forecolor</button>'
    + '<button onclick="sde.__ue__.execCommand( \'backcolor\',\'blue\')">backcolor</button>'
    + '<button onclick="insertimage()">insertimage</button>'
    + '<button onclick="sde.setExecCommand(\'fontsize\', \'14px\')">设置字大小</button>'
    + '<button onclick="cleardoc()">清空内容</button>'
    + '<button onclick="sdefun.updateAllControl()">更新所有控件</button>'
    + '<button onclick="sdefun.checkAllControl()">检查所有控件</button>'
    + '<button onclick="sdefun.insertImages(\'list\',\'/UE\')">导入图片</button>'
    + '<button onclick="alert(sdefun.getIdCard(\'45032419920914581X\',2));">身份证</button>'
    + '<button onclick="createBarcode(\'divCode\',\'test\',\'B\');">条形码</button>'
    + '<button onclick="insertTable();">插入表格</button>'
    + '<button onclick="sde.hideSDE([\'.sde-left\',\'.sde-right\']);">隐藏括号</button>'
    + '<button onclick="sde.showSDE([\'.sde-left\',\'.sde-right\']);">显示括号</button>'
    + '<button onclick="sde.hideSDE(\'button\');">隐藏按钮</button>'
    + '<button onclick="sde.showSDE(\'button\');">显示按钮</button>'
    + '<button onclick="sde.__ue__.cleanSDE(\'#sde_table_id\',\'sde_table_dis\');">显示自定义表格</button>'
    + '<button onclick="sde.__ue__.cleanSDE(\'.sde-table\',\'sde_table_dis\');">显示所有表格</button>'
    + '<button onclick="sde.__ue__.cleanSDE([\'#yjs\',\'span[yjs]\']);">显示月经史</button>'
    + '<button onclick="sde.setControlUnderline()">显示下划线</button>'
    + '<button onclick="console.log(sde.checkNull([\'+\',\'-\',\'/\']));">空值校验</button>'
    + '<button onclick="console.log(sde.checkRequire([\'+\',\'-\',\'/\']));">必填项校验</button>'
    + '<button onclick="alert(sde.checkRedPoint());">小红点校验</button>'
    + '<button onclick="alert(sde.cancelRedPoint());">取消红点</button>'
    + '<button onmousedown="isFocus();">获得焦点</button>'
    + '<button onmousedown="alert(getText());">选中文本</button>'
    + '<button onclick="sde.setRevise();">修订模式</button>'
    + '<button onmousedown="alert(getMode())">获取编辑模式</button>'
    + '<button onmousedown="alert(sde.getRevEditHtml())">获取修订html</button>'
    + '<button onmousedown="alert(sde.getRevDelHtml())">修订删除html</button>'
    + '<button onmousedown="sdefun.addReviseHtml()">保存修订痕迹</button>'
    + '<button onmousedown="sde.restoreRevise()">还原修订html</button>'
    + '<button onmousedown="sde.showAllRevise()">启用修订html</button>'
    + '<button onmousedown="sde.cleanRevise()">禁用修订html</button>'
    + '<button onmousedown="sde.__ue__.setTableSDE()">setTableSDE</button>'
    + '<button onmousedown="sde.setMRHPSelect();">setMRHPSelect</button>'
    + '<button onmousedown="sde.setPlaintextOnly();">setPlaintextOnly</button>'
    + '<button onmousedown="sde.updataSDE();">updataSDE</button>'
    + '<button onmousedown="getNewReport()">刷新报告</button>'
    + '<button onmousedown="blockformula()">插入公式</button>'
    + '<button onmousedown="getLocalData()">获取草稿箱</button>'
    + '<button onmousedown="clearLocalData()">清空草稿箱</button>'
    + '<button onmousedown="sdefun.checkPlugin()">检验控件</button>'
    + '<button onmousedown="setBarcode()">setBarcode</button>'
    + '<button onmousedown="createD3()">createD3</button>'
    + '<button onmousedown="getFilePathByHtml()">获取文件路径</button>'
    + '<button onmousedown="updatePluginByCode2Newest()">更新控件</button>'
    + '<button onmousedown="sdefun.forceDeletePlugin()">强制删除控件</button>'
    + '<button onmousedown="alert(sdefun.getSelectionHTML())">getSelectionHTML</button>'
    + '<button onmousedown="alert(sdefun.setRuleValue())">setRuleValue</button>'
    + '<button onmousedown="sde.recordReadonly(\'#recordTable\')">recordReadonly</button>'
    + '<button onmousedown="sde.recordEditor(\'#recordTable\')">单个病程可编辑</button>'
    + '<button onmousedown="sdefun.getNewestReportByTempVId(8)">获取最新报告byTempVId</button>'
    + '<button onmousedown="sdefun.updateAllPluginByVerID()">updateAllPluginByVerID</button>'
    + '<button onmousedown="sde.checkPluginLR()">checkPluginLR</button>'
    + '<button onmousedown="sde.getControlScore()">getControlScore</button>'
    + '<button onmousedown="sde.setSdeWidth(\'148mm\')">宽度148mm</button>'
    + '<button onmousedown="templateFindAll()">templateFindAll</button>'
    + '<button onmousedown="templateFindAll2()">templateFindAll2</button>'
    + '<button onmousedown="findPluginTree()">findPluginTree</button>'
    + '</div>';

var footer = 'footer';
var toolbars = '';

/**
 * templateFindById 第一个参数是模板id 将获取最新版本的模板 第二个参数是版本号，必须与第一个参数结合用
 * 如果要findByVerId，请用findByVer_Id(param);
 */
var content = "", head, ver_id = 7, template_id, mode = 'DESIGN'; // mode可选：DESIGN（设计）、EDITOR（编辑）、READONLY（只读）、REVISE修订
var queryObject = sdefun.getQueryObject();
ver_id = queryObject.ver_id || 7;
var template = sdefun.templateFindById(template_id, ver_id);

if (template) {
    content = template.content;
    document.getElementById("template_mode").value = mode;
    document.getElementById("template_id").value = template.template_id;
    document.getElementById("template_ver_id").value = template.template_ver_id;
    document.getElementById("type_id").value = template.type_id;
    document.getElementById("syn_version").value = template.syn_version;
}

sdeUserFun.prototype.edcxxx = function (param) {
    $(param).find('.sde-value').text(2);
    $(param).attr('_code', 'code');
    var sde_model = $(param).attr('sde-model');
    var jsonStr = JSON.parse(sde_model);
    jsonStr.code = "code";
    $(param).attr('sde-model', JSON.stringify(jsonStr));
    console.log("测试双击事件edcxxx");
}

window.onload = function () {
    //window.UEDITOR_CONFIG.WEB_URL_FASTDFS = "1";//FASTDFS服务配置----"1":启用fastDFS上传，"0":本地上传
    //window.SDE_TOOLBAR['sde-toolbar-records']=["sdetemplate"];//重写工具条内容
    //window.SDE_CONFIG.MIP_MRHP='.TBODY';
    //window.SDE_CONFIG.MIP_MRHP = ["#basicTable", "#surgeryTable"];
    window.SDE_CONFIG.PWP_USER_ID = loginAccount.accountCode;
    sde = new SDE(
        {
            datasource: "",
            id: "myEditor",
            title: title, // 自定义title
            footer: footer, // 自定义footer
            _content: content,
            sde_free_meun: '0',
            setpmargin: "margin:0;",//设置p标签的样式
            //sde_toolbar:{},
            /*
             * sde_font_size:'15px', //字体大小 sde_line_height:'2em', //行距
             * view_padding:"0px 20px 20px 20px", //纸张的边上还留有距离
             */
            body_font_family: "宋体", // 默认字体
            //body_class : 'span.sde-underline {  	text-decoration: none !important;border-bottom:1px solid black; } hr{margin-bottom: -1px;margin-top: -1px;}.sde-table td{word-break: break-all;padding-left: 1px !important;padding-right: 1px !important;}', // body的样式
            // toolbars : toolbars,
            // control_templates: "",
            // iframe_js_src :  [window.SDE_CONFIG.HOME_URL_DIALOGS+'js/jquery-3.2.1.js',window.SDE_CONFIG.HOME_URL_DIALOGS+'js/ryExpand.js'],
              iframe_css_src : [window.SDE_CONFIG.HOME_URL_DIALOGS+'mtips/mTips.css'],
            mode: mode,// mode可选：DESIGN（设计）、EDITOR（编辑）、READONLY（只读）、REVISE（修订模式）
            test: ''
        });
    sde.ready(function () {
        sde.pasteModel(0);
        sde.iconMark(0);
        sdefun.initSDETree();
        /* sde.setMRHPSelect();
         sde.setControlUnderline();*/
        /*var makePluginStore = new sdeFun().makePluginStore();
         baidu.editor.sdeplugins['ttt'] = {MAKEPLUGINSTORE: makePluginStore};
         */
        /*debugger;
         sde.__ue__.cleanAddSDE(['.sde-left','.sde-right']);
         sde.__ue__.cleanRemoveSDE(['.sde-left','.sde-right']);*/
        /*
         * D //添加文件到编辑器中 UE.utils.loadFile(document, { href:
         * window.SDE_CONFIG.HOME_URL+"dialogs/css/sde-icon.css", tag:
         * "link", type: "text/css", rel: "stylesheet" });
         */

        // sde对象是异步加载，即必须等待sde.ready加载完成后才能执行。
        // sde.setRevise();
        // console.log("第三加载"+2);
        // sde.setControls('name','奥巴马');
        // sde.inserthtml("如果编辑器没有聚集光标，就默认在最前面插入html----");
        // sde.setContent("追加html");
        /*head = '<div id="headDiv"><p style="text-align: center; line-height:normal;"> <span style="font-size: 14px; font-family: arial, helvetica, sans-serif;"><span style="font-family: arial, helvetica, sans-serif; font-size: 14px;"></span></span><img src="/mip/image/ueditor/upload/image/20170413/syxjlyy.jpg"/></p><p style="text-align: center; line-height:normal;"><span style="font-size: 23px;"><strong><span style="font-family: 宋体;">入 &nbsp;院 &nbsp;记 &nbsp;录</span></strong></span></p><p style="line-height: normal;"><span style="font-family:宋体; font-size: 16px;">姓名:<span id="name" title="姓名" sde-model="{&quot;CODE&quot;:&quot;name&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;姓名&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;姓名&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;,&quot;TEXTLENGTH&quot;:&quot;&quot;,&quot;plugin_ex_json&quot;:[{&quot;field_code&quot;:&quot;verifytype&quot;,&quot;field_name&quot;:&quot;数据类型&quot;,&quot;field_value&quot;:&quot;text&quot;}]}" class="sde-bg"><span class="sde-left" style="color:#0000FF">[</span><span title="姓名" style="color:#000000;" class="sde-value"> </span><span style="color:#0000FF" class="sde-right">]</span></span></span><span style="font-family:宋体; font-size: 16px;"><strong>&nbsp; </strong>性别:&nbsp;<span id="SEX" title="性别" sde-model="{&quot;VER_ID&quot;:194,&quot;PLUGINID&quot;:194,&quot;ID&quot;:&quot;SEX&quot;,&quot;NAME&quot;:&quot;性别&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;性别&quot;,&quot;REQUIRED&quot;:&quot;0&quot;,&quot;READONLY&quot;:&quot;0&quot;,&quot;COLOR&quot;:&quot;000000&quot;,&quot;VALUE&quot;:&quot;3&quot;,&quot;ISDISPLAY&quot;:&quot;0&quot;,&quot;TYPE&quot;:&quot;select&quot;,&quot;BINDINGDATA&quot;:[{&quot;VALUE&quot;:&quot;1&quot;,&quot;TEXT&quot;:&quot;男&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;2&quot;,&quot;TEXT&quot;:&quot;女&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;3&quot;,&quot;TEXT&quot;:&quot;-&quot;,&quot;SELECTED&quot;:1}],&quot;FREEINPUT&quot;:&quot;0&quot;,&quot;TEXT&quot;:&quot;-&quot;}" class="sde-bg"><span class="sde-left" style="color:#0000FF">[</span><span title="性别" style="color:#000000;" class="sde-value">-</span><span style="color:#0000FF" class="sde-right">]</span></span><strong>&nbsp; &nbsp;</strong>科室:<span id="ks" title="科室" sde-model="{&quot;CODE&quot;:&quot;ks&quot;,&quot;ID&quot;:&quot;ks&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;科室&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;科室&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" class="sde-bg"><span class="sde-left" style="color:#0000FF">[</span><span title="科室" style="color:#000000;" class="sde-value"> </span><span style="color:#0000FF" class="sde-right">]</span></span><strong>&nbsp; </strong>床号:<span id="ch" title="床号" sde-model="{&quot;CODE&quot;:&quot;ch&quot;,&quot;ID&quot;:&quot;ch&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;床号&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;床号&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" class="sde-bg"><span class="sde-left" style="color:#0000FF">[</span><span title="床号" style="color:#000000;" class="sde-value"> </span><span style="color:#0000FF" class="sde-right">]</span></span><strong>&nbsp; </strong>住院号:<span id="zyh" title="住院号" sde-model="{&quot;CODE&quot;:&quot;zyh&quot;,&quot;ID&quot;:&quot;zyh&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;住院号&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;住院号&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" class="sde-bg"><span class="sde-left" style="color:#0000FF">[</span><span title="住院号" style="color:#000000;" class="sde-value"> </span><span style="color:#0000FF" class="sde-right">]</span></span></span></p><hr/></div>';
         sde.setPageHead(head);*/

    });

};


function findPluginTree() {
    var res = srvFunByParam("pluginTreeSrv", "findById", {}, false);//获取旧的报告，
    console.log(JSON.stringify(res));
    return res;
}
function getAllControl() {
    var allC = sde.getAllControl();
    var allJ = JSON.stringify(allC);
    console.log(allJ);
    alert(allJ);
}
function reportSrvTest1() {
    debugger
    var res = srvFunByParam("reportSrv", "test", {}, false);//获取旧的报告，
    console.log(res);
}
function findAllTemplateData() {
    debugger
    var res = srvFunByParam("templateSrv", "findAllTemplateData", {}, false);
    console.log(JSON.stringify(res))
}
function templateSave() {
    var date1 = new Date().getTime();
    var res = sdefun.templateSave();
    var date2 = new Date().getTime();
    alert( "耗时：" + (date2 - date1)+",结果:"+res.msg);
}
function templateFindAll() {
    var param = {};
    param = {max_ver_id: 8};//最小版本号
    /* param ={max_ver_id:8};//最大版本号
     param ={min_ver_id:8,max_ver_id:10};//最小和最大版本号之间
     param.template_ver_ids =[8,2];//多个版本号*/
    var res = sdefun.addTempDateByContent(param);
    console.log(JSON.stringify(res))
}
function templateFindAll2() {
    var param = {};
    param = {min_ver_id: 8};//最小版本号
    /*param ={max_ver_id:8};//最大版本号
     param ={min_ver_id:8,max_ver_id:10};//最小和最大版本号之间
     param.template_ver_ids =[8,2];//多个版本号*/
    var res = sdefun.addTempDateByContent2(param);
    console.log(JSON.stringify(res))
}

function initTree(){

    treeObj.initTree("sdeTree");
    treeObj['loadData']();

}
function sdeTree(){
    $("#sdeTree").css("display","block").toggleClass("tree-open","tree-close");
    $("#sde-showtree").toggleClass("sde-showtree-open","sde-showtree-close");
    $("#sde-arrowNav").toggleClass("sde-arrowNav-open","sde-arrowNav-close");
}
function createD3() {
    var dataset = [
        {x: 0, y: 88}, {x: 1, y: 35},
        {x: 2, y: 23}, {x: 3, y: 78},
        {x: 4, y: 55}, {x: 5, y: 18},
        {x: 6, y: 98}, {x: 7, y: 100},
        {x: 8, y: 22}, {x: 9, y: 65}
    ];
    sdefun.createD3(dataset);
}

function _myFunction() {
    var functionName = prompt('请输入方法名称：', '');
    console.log('结果:' + JSON.stringify(sdefun[functionName]()));
}

function _setControls() {
    var data;
    var id = prompt('请输入设置控件ID：', '');
    var pa=12;
    debugger;
    if (id) data = sde.setControls(id, pa,'.sde-table2');
}

function _getControl() {
    var data;
    var id = prompt('请输入获取控件ID：', '');
    debugger
    if (id) data = sde.getControl(id,'.sde-table2');
    alert(JSON.stringify(data) || "");
}

function getNewReport() {
    var param = {};
    param.report_id = '349';
    var date1 = new Date().getTime();
    sdefun.getNewReport(param);
    console.log("刷新耗时：" + (new Date().getTime() - date1));
}

function blockformula() {
    sde.execCommand("blockformula");
}

function setBarcode() {
    var param = {
        id: "imgId",  //占位符id，必须传值
        space: 4,       //字体间距，默认4px，可不传值
        name: "aaa",//必须传值
        bWidth: 1,    //必须传值
        bHeight: 30,  //必须传值
        number: "1234567" //必须传值
    };
    sde.setBarcode(param);

}

function old2NewReport2() {
    var param = {};
    param.report_id = '349';
    console.log(sdefun.old2NewReport2(param));
}

function insertimage() {
    sde.execCommand("sde-insertimage");
}

function lodop() {
    LODOP.PRINT_INIT("preview");
    LODOP.ADD_PRINT_HTM(10, 55, "100%", "100%", head);
    LODOP.PREVIEW();
}

function CheckIsInstall_lyon(val) {
    //$("#ueditor_0").contents().find(".span_input").attr("style","").removeClass("sde-value span_input");
    sde.__ue__.cleanSDE(['.sde-left', '.sde-right']);
    sde.__ue__.cleanSDE('button');
    var $outerHtml = $(sde.__ue__.document.getElementsByTagName("html")[0]);
    var headcss = $outerHtml.find("head")[0].outerHTML;
    var contrue = $outerHtml.find('[contenteditable="true"]');// .removeAttr('contenteditable');
    var confalse = $outerHtml.find('[contenteditable="false"]');
    var conp = $outerHtml.find('[contenteditable="plaintext-only"]');
    contrue.removeAttr('contenteditable');
    confalse.removeAttr('contenteditable');
    conp.removeAttr('contenteditable');
    LODOP.ADD_PRINT_HTM("5mm", "10mm", "190mm", "277mm", headcss.outerHTML + $outerHtml[0].outerHTML);
    //NO.1
    /*var headDiv = $outerHtml.find("#headTable");
     LODOP.ADD_PRINT_HTM("5mm", "19mm", "171mm", "33mm", headcss + headDiv.html());
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
     var contentDiv = $outerHtml.find("#contentDiv");
     LODOP.ADD_PRINT_HTM("33mm", "19mm", "171mm", "250.5mm", headcss + contentDiv[0].outerHTML);
     var lastTb = $outerHtml.find("#lastTb");
     LODOP.ADD_PRINT_TABLE(0, 0, "171mm", "100%", headcss + lastTb[0].outerHTML);
     LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1);
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
     var foot = "<div style='border-top: 1px solid black ; text-align:  center; vertical-align: top' tdata='pageNO'>第##页</div>";
     LODOP.ADD_PRINT_HTM("272mm", "10mm", "190mm", "12.5mm", foot);
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);*/

    //NO.2
    /*  wrapTextSpan($outerHtml);
     $($outerHtml.find("#headDiv")[0]).toggleClass("display-none");
     var divs = sde.querySelectorAll("div[pagebreak='true']");
     for (var i = 0; i < divs.length; i++) {
     divs[i].setAttribute("style", "page-break-before:always");
     }
     var headDiv = $outerHtml.find("#headDiv")[0];
     LODOP.ADD_PRINT_HTM("5mm", "15mm", "190mm", "31mm", headcss + headDiv.outerHTML);
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
     var content = $outerHtml[0].innerHTML;
     content = content.replace(/(\r\n)|(\n)/g, '<br>');
     LODOP.ADD_PRINT_HTM("35mm", "10mm", "190mm", "230mm", headcss + content);
     $($outerHtml.find("#headDiv")[0]).toggleClass("display-none");
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
     var foot = "<div style='border-top: 1px solid black ; text-align:  center; vertical-align: top' tdata='pageNO'>第##页</div>";
     LODOP.ADD_PRINT_HTM("272mm", "10mm", "190mm", "27.5mm", foot);
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);*/


    //NO.3
    /*var headDiv = $outerHtml.find("#headTable");
     LODOP.ADD_PRINT_HTM("5mm", "19mm", "171mm", "33mm", headcss + headDiv.html());
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
     $outerHtml.find("#headTable").css("display","none");
     var content = $outerHtml.html();
     LODOP.ADD_PRINT_HTM("35mm", "10mm", "190mm", "240mm", headcss + content);
     var foot = "<div style='border-top: 1px solid black ; text-align:  center; vertical-align: top' tdata='pageNO'>第##页</div>";
     LODOP.ADD_PRINT_HTM("285mm", "10mm", "190mm", "12.5mm", foot);
     LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
     $outerHtml.find("#headTable").css("display","");*/


    LODOP.PREVIEW();
    setTimeout(function () {
        sde.__ue__.cleanSDE(['.sde-left', '.sde-right']);
        sde.__ue__.cleanSDE('button');
        contrue.attr('contenteditable', 'true');
        confalse.attr('contenteditable', 'false');
        conp.attr('contenteditable', 'plaintext-only');
    }, 300);
    // $("#ueditor_0").contents().find(".sde-left").next().css({"color":"#000000","width":"100px"}).addClass("sde-value span_input");
}
function wrapTextSpan($target) {
    $target.find("body").children("div").each(function () {
        $(this).children("p").each(function () {
            $(this).children("span").each(function () {

                handleSpan(this);
            })
            if ($(this).children().length == 0) {
                var text = $(this).text();
                $(this).text(text.split(" ").join(""));
            }

        });
    });
    $target.find("body").children("table").each(function () {
        $(this).find("tbody").find("td>p").each(function () {
            $(this).children("span").each(function () {
                var html = "";
                handleSpan(this);

            });
            if ($(this).children().length == 0) {
                var text = $(this).text();
                $(this).text(text.split(" ").join(""));
            }
        });
    });
}

function handleSpan(target, flag) {
    var exceptClass = ["display-none", "sde-value"];  //排除拥有这些样式的span元素
    if (target.nodeType == 3) {
        return;
    }
    if (target.nodeType == 1 && target.tagName.toLowerCase() == "span" && $(target).children().length == 0) {
        for (var i = 0; i < exceptClass.length; i++) {
            if (flag) {
                if ($(target).hasClass("sde-left") || $(target).hasClass("sde-right")) {
                    $(target).replaceWith("");
                }

            }
            if ($(target).hasClass(exceptClass[i])) {
                return;
            }
        }
        $(target).replaceWith($(target).text().split(" ").join(""));
    }
    else if ($(target).children().length > 0) {
        $(target).children().each(function () {
            handleSpan(this, flag);
        })
    }
}


function CheckIsInstall(val) {
    try {
        if (val == 5) {
            LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_整页表格");
            LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
            var outerHtml = sde.__ue__.document.getElementsByTagName("html")[0];
            var headcss = $(outerHtml).find("head")[0];
            LODOP.ADD_PRINT_TABLE("2%", "1%", "96%", "98%", headcss.outerHTML + sde.__ue__.document.getElementById("div1").innerHTML);
            LODOP.SET_PREVIEW_WINDOW(1, 2, 0, 0, 0, "");
            LODOP.PREVIEW();
            return;
        }
        $("#ueditor_0").contents().find(".span_input").attr("style", "").removeClass("sde-value span_input");
        LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
        // LODOP. SET_PRINT_PAGESIZE (1,2100,2970,"");
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");

        var $outerHtml = $(sde.__ue__.document.getElementsByTagName("html")[0]);
        var contrue = $outerHtml.find('[contenteditable="true"]');// .removeAttr('contenteditable');
        var confalse = $outerHtml.find('[contenteditable="false"]');
        var conp = $outerHtml.find('[contenteditable="plaintext-only"]');
        contrue.removeAttr('contenteditable');
        confalse.removeAttr('contenteditable');
        // $outerHtml.find('[contenteditable]').removeAttr('contenteditable');
        var headcss = $outerHtml.find("head")[0];
        // var headDiv = $outerHtml.find("#headDiv")[0];

        LODOP.ADD_PRINT_HTML("0mm", "15mm", "190mm", "28mm", headcss.outerHTML);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
        // LODOP.SET_PRINT_STYLEA(0,"PageUnIndex","1");
        var _body = sde.__ue__.document.getElementsByTagName("html")[0];
        $(_body).find("#headDiv").toggleClass("display-none");
        setTimeout(function () {
            $(_body).find("#headDiv").toggleClass("display-none");
            contrue.attr('contenteditable', 'true');
            confalse.attr('contenteditable', 'false');
            conp.attr('contenteditable', 'plaintext-only');
        }, 300);

        LODOP.ADD_PRINT_HTML("28mm", "15mm", "190mm", "237mm", _body.outerHTML);
        // LODOP.SET_PRINT_STYLEA(0,"LinkNewPage",1);
        // LODOP.SET_PRINT_STYLEA(0,"PageIndex","2");
        // LODOP.SET_PRINT_STYLEA(0,"PageUnIndex","2");//1、2页不输出，排除法。
        // var iPageCount=LODOP.GET_VALUE("PRINT_STATUS_TOTAL_PAGES",1);

        // LODOP.ADD_PRINT_HTM(1,600,300,100,"总页号：<font color='#0000ff'
        // format='ChineseNum'><span tdata='pageNO'>第##页</span>/<span
        // tdata='pageCount'>共##页</span></font>");

        // LODOP.SET_PRINT_STYLE("ItemType",1);
        var foot = '<p style="white-space: normal;">'
            + '   <strong><span style="font-family: arial, helvetica, sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;姓名:</span></strong><span style="font-family: arial, helvetica, sans-serif;"><span id="name" title="姓名" sde-model="{&quot;CODE&quot;:&quot;name&quot;,&quot;ID&quot;:&quot;name&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;姓名&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;姓名&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" contenteditable="false" class="sde-bg"><span class="sde-left" contenteditable="false" style="color: #0000FF;">[</span><span title="姓名" class="sde-value" contenteditable="true" mode="EDITOR">&nbsp;</span><span contenteditable="false" class="sde-right" style="color: #0000FF;">]</span></span>&nbsp;&nbsp;&nbsp;&nbsp;<strong>性别:</strong>&nbsp;<span id="SEX" title="性别" sde-model="{&quot;VER_ID&quot;:194,&quot;PLUGINID&quot;:194,&quot;ID&quot;:&quot;SEX&quot;,&quot;NAME&quot;:&quot;性别&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;性别&quot;,&quot;REQUIRED&quot;:&quot;0&quot;,&quot;READONLY&quot;:&quot;0&quot;,&quot;COLOR&quot;:&quot;000000&quot;,&quot;VALUE&quot;:&quot;3&quot;,&quot;ISDISPLAY&quot;:&quot;0&quot;,&quot;TYPE&quot;:&quot;select&quot;,&quot;BINDINGDATA&quot;:[{&quot;VALUE&quot;:&quot;1&quot;,&quot;TEXT&quot;:&quot;男&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;2&quot;,&quot;TEXT&quot;:&quot;女&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;3&quot;,&quot;TEXT&quot;:&quot;-&quot;,&quot;SELECTED&quot;:1}],&quot;FREEINPUT&quot;:&quot;0&quot;,&quot;TEXT&quot;:&quot;-&quot;}" contenteditable="false" class="sde-bg"><span class="sde-left" contenteditable="false" style="color: #0000FF;">[</span><span title="性别" class="sde-value" contenteditable="true" mode="EDITOR">-</span><span contenteditable="false" class="sde-right" style="color: #0000FF;">]</span></span><strong>&nbsp;&nbsp;&nbsp;&nbsp;科室:</strong><span id="ks" title="科室" sde-model="{&quot;CODE&quot;:&quot;ks&quot;,&quot;ID&quot;:&quot;ks&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;科室&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;科室&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" contenteditable="false" class="sde-bg"><span class="sde-left" contenteditable="false" style="color: #0000FF;">[</span><span title="科室" class="sde-value" contenteditable="true" mode="EDITOR">&nbsp;</span><span contenteditable="false" class="sde-right" style="color: #0000FF;">]</span></span><strong>&nbsp;&nbsp;&nbsp;&nbsp;床号:</strong><span id="ch" title="床号" sde-model="{&quot;CODE&quot;:&quot;ch&quot;,&quot;ID&quot;:&quot;ch&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;床号&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;床号&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" contenteditable="false" class="sde-bg"><span class="sde-left" contenteditable="false" style="color: #0000FF;">[</span><span title="床号" class="sde-value" contenteditable="true" mode="EDITOR">&nbsp;</span><span contenteditable="false" class="sde-right" style="color: #0000FF;">]</span></span><strong>&nbsp;&nbsp;&nbsp;&nbsp;住院号:</strong><span id="zyh" title="住院号" sde-model="{&quot;CODE&quot;:&quot;zyh&quot;,&quot;ID&quot;:&quot;zyh&quot;,&quot;TYPE&quot;:&quot;text&quot;,&quot;NAME&quot;:&quot;住院号&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;住院号&quot;,&quot;VERIFYTYPE&quot;:&quot;text&quot;,&quot;VALUE&quot;:&quot; &quot;,&quot;REQUIRED&quot;:0,&quot;READONLY&quot;:0,&quot;COLOR&quot;:&quot;000000&quot;}" contenteditable="false" class="sde-bg"><span class="sde-left" contenteditable="false" style="color: #0000FF;">[</span><span title="住院号" class="sde-value" contenteditable="true" mode="EDITOR">&nbsp;</span><span contenteditable="false" class="sde-right" style="color: #0000FF;">]</span></span></span>'
            + '</p> ' + ' ';
        LODOP.ADD_PRINT_HTML("270mm", "15mm", "190mm", "27.5mm", foot);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
        if (val == 1) {
            LODOP.PREVIEW();  // 打印预览
        }
        if (val == 2) LODOP.PRINT(); // 直接打印
        if (val == 3) LODOP.PRINT_SETUP(); // 打印维护
        if (val == 4) LODOP.PRINT_DESIGN(); // 打印设计

        /*
         * LODOP.SET_PRINT_MODE("PRINT_START_PAGE",1);
         * LODOP.SET_PRINT_MODE("PRINT_END_PAGE",2);
         *
         * var iPageCount=LODOP.GET_VALUE("PREVIEW_PAGE_COUNT",0);
         * console.log("获得页数:"+iPageCount); var
         * iThisNumber=LODOP.GET_VALUE("PREVIEW_PAGE_NUMBER",0);//获得当前页号
         * LODOP.SET_PRINT_MODE("PRINT_START_PAGE",iThisNumber);
         * LODOP.SET_PRINT_MODE("PRINT_END_PAGE",iThisNumber);
         * LODOP.DO_ACTION("PREVIEW_PRINT",0);
         *
         * console.log("获得当前页号:"+iThisNumber);
         */
    } catch (err) {
        console.log(err);
    }
    $("#ueditor_0").contents().find(".sde-left").next().css({
        "color": "#000000",
        "width": "100px"
    }).addClass("sde-value span_input");
};

// -----------------右键扩展
UE.Plugins = [{
    group: '这里加一个菜单',
    icon: '123',
    subMenu: [{
        label: '这里是一个子菜单',
        cmdName: '123',
        exec: function () {
            alert('这里天加一个菜单');
        }
    }, '-', {
        label: '菜单',
        cmdName: '123',
        exec: function () {
            alert('这个菜单');
        }
    }]
}, '-', {
    label: '清空编辑器',
    cmdName: 'cleardoc',
    exec: function () {
        alert('即将清空编辑器内容');
        sde.setExecCommand('cleardoc');
    }
}, '-', {
    label: '菜单',
    cmdName: '123',
    exec: function () {
        alert('这个菜单');
    }
}];



window.SDE_CONFIG.SDE_TABLEWIDTH = '0'; // 当设置为'0'时，插入的表格自动宽度，
// window.SDE_CONFIG.SDE_EDITORWIDTH='21cm'; //编辑器内容的宽度，建议不要修改
// window.SDE_CONFIG.SDE_UEPADDING='20px'; //编辑器内容与边界的间距，建议不要修改

// var ver_id = 7, template_id, mode='REVISE'; //
// mode可选：DESIGN（设计）、EDITOR（编辑）、READONLY（只读）
// var template = sdefun.templateFindById(template_id, ver_id);
// var content = template ? template.content : "";
// document.getElementById("template_mode").value = mode;
// document.getElementById("template_id").value = template.template_id ?
// template.template_id : 0;
// document.getElementById("template_ver_id").value = template.template_ver_id;
// document.getElementById("type_id").value = template.type_id;
// document.getElementById("syn_version").value = template.syn_version;
// console.log("template_id:"+document.getElementById("template_id").value);
// console.log("template_ver_id:"+document.getElementById("template_ver_id").value);
// console.log("type_id:"+document.getElementById("type_id").value);
// console.log("syn_version:"+document.getElementById("syn_version").value);
// var temp = sdefun.pluginFindByParam();

window.SDE_CONFIG.SDE_YANSHI = {
    earAvgRight: '<span>2017-04-12 73</span></br><span>2017-05-12 66</span></br><span> 2017-06-12&nbsp;59</span></br><span></span>',
    earAvgLeft: '<span>2017-04-12 67</span></br><span>2017-05-12 57</span></br><span> 2017-06-12 earAvgLeft</span></br><span></span>'
};
function sdeTools() {
    var display = $("#sdeTools").css("display");
    $("#sdeTools").css("display", display == "block" ? "none" : "block");
}
function printTools() {
    $("#printTools").css("display", $("#printTools").css("display") == "block" ? "none" : "block");
}

function gotoBack() {
    window.history.back(-1);
    /*window.location.reload(); //刷新
    window.history.go(1); //前进
    window.history.go(-1); //前进
    window.history.forward(); //前进
    window.history.back(); //返回
    window.history.back(-1);//返回
*/
}

function updateTemplate() {
    if (window.SDE_CONFIG.IS_CONTENTCHAGNE !== "0") {
        console.log("已经改变：" + window.SDE_CONFIG.IS_CONTENTCHAGNE);
    } else {
        console.log("没有改变：" + window.SDE_CONFIG.IS_CONTENTCHAGNE);
    }
    var param = {};
    param.template_id = document.getElementById("template_id").value;
    param.template_ver_id = document.getElementById("template_ver_id").value;
    param.type_id = document.getElementById("type_id").value;
    param.syn_version = document.getElementById("syn_version").value;
    param.status = '6';
    var date1 = new Date().getTime();
    var data = sdefun.updateTemplate(param);
    var date2 = new Date().getTime();
    if (data && data.code == 200) {
        window.location.reload();
    }
    var msg="耗时：" + (date2 - date1)+",结果:"+data.msg;
    console.log(msg);
    alert(msg);
}

function insertTable() {
    var table = '<table class="sde-table" id="sde_table_id"> ' + '<tbody>'
        + '<tr class="firstRow">' + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>' + '</tr>' + '<tr>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>' + '</tr>' + '<tr>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>'
        + '<td width="192" valign="top"></td>' + '</tr>' + '</tbody>'
        + '</table>';
    sde.setExecCommands('insertHtml', table);
}

function insertHtml() {
    sde.setExecCommands('insertHtml', "触发插入html事件");
}

function cleardoc() {
    sde.__ue__.body.innerHTML = "";
    /*var template = sdefun.templateFindById(template_id, 7);
     sde.setContent(template.content);
     sde.setReadonly();*/
    sde.setContent("触发插入html事件-cleardoc");
}

function insertBtn() {
    var funName = prompt('输入按钮名', '');
    var value = "<button onclick='alert(1)'>" + funName + "</button>";
    sde.setExecCommands('insertHtml', value);
}

function insertcharts() {
    var value = '<a id="main" style="width:300px; height:200px;border:1px solid #ccc; display: inline-block;"></a>';
    sde.setExecCommands('insertHtml', value);
    /*
     * var ue = UE.getEditor('myEditor'); var node = new UE.uNode({
     * type:'element', tagName:'span', attrs:{style:'width:300px;
     * height:200px;border:1px solid #ccc; display: inline-block;'} });
     * console.log(node); ue.execCommand('insertHtml', node.toHtml());
     */
    // console.log(ue.document.getElementById('main'));
}

function getDialog() {
    var param = {
        label: 'testVop',
        url: window.SDE_CONFIG.HOME_URL_DIALOGS + 'button/test.vop' // 这是一个返回dialog所呈现页面的SpringMVC请求。
    }
    sde.getDialog(param);
}

function insertMorePic() {
    var value = '<div id="imginfo" style="width:auto;height: auto;border: 1px solid #ccc;"><img class="noMagnificate" height="500" style="width:100%;border:none;"></div>';
    sde.setExecCommands('insertHtml', value);
}

function sdeInsertTable(numRows, numCols) {
    sde.insertTable(numRows, numCols)
}

function addReport() {
    var param = {};
    var goal = sde.getAllControl(); // 控件指标数据
    var content = sde.html(); // 所有的html
    param.content = content;
    param.template_ver_id = document.getElementById("template_ver_id").value;

    var date1 = new Date().getTime();

    var report = sdefun.addReport(param, goal);
    var date2 = new Date().getTime();
    if (report) {
        document.getElementById("report_id").value = report.data.id;
        document.getElementById("syn_version").value = report.data.syn_version;
        $.showTip("保存成功");
    } else {
        $.showTip("保存失败");
    }
    alert("耗时：" + (date2 - date1));
}

function updateReport(param) {
    var defaults = {};
    defaults.template_ver_id = document.getElementById("template_ver_id").value;
    // 模板类型ID，TP_TEMPLATE_TYPE的主键
    defaults.content = sde.html();
    defaults.reportDatas = sde.getAllControl();
    defaults.status = 0;
    defaults.syn_version = 0;

    defaults.id = document.getElementById("report_id").value;
    param = $.extend(true, defaults, param);
    var result = srvFunByParam("reportSrv", "updateReport", param, false);
    if (result.syn_version) document.getElementById("syn_version").value = result.data.syn_version;
    $.showTip("updateMsg:" + result.msg);
    return result;
}

function getText() {
    // 当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    /*
     * debugger; var bookmark =
     * sde.__ue__.selection.getRange().createBookmark(); var end = bookmark.end;
     * var filterFn = function(node) { return node.nodeType == 1 ?
     * node.tagName.toLowerCase() != 'br' : !UE.dom.domUtils.isWhitespace(node); };
     * var current = UE.dom.domUtils.getNextDomNode(bookmark.start, false,
     * filterFn);
     */
    // sde.__ue__.execCommand('insertimage');
    // debugger;
    /*
     * var selection = sde.__ue__.selection.getNative(), other_range =
     * selection.getRangeAt(0); var oFragment = other_range.extractContents();
     * other_range.insertNode(oFragment); var focusNode = selection.focusNode;
     * var parentNode = $(focusNode.parentNode);
     * $(focusNode).attr("style","border-width: 1px; border-style:
     * solid;border-bottom:none"); return focusNode.outerHTML;
     */
    var range = sde.__ue__.selection.getRange();
    range.select();
    var txt = sde.__ue__.selection.getText();
    return txt;

}

function isFocus() {
    var boo = sde.__ue__.isFocus();
    alert(boo);
    return boo;
}

function getTemplate() {
    sde.__ue__.execCommand('template');
}

function getMode() {
    var mode = window.SDE_CONFIG.MODE;
    return mode;
}




var bo = true;
function disRevHtml() {
    if (bo) {
        sde.cleanRevise();
        bo = false;
    } else {
        sde.showAllRevise();
        bo = true;
    }
}


function getRuleParamById() {
    var params = {};
    var param = {ver_id: 300, type: 'select'};
    var ruleId = '4';

    params.ruleId = ruleId;
    params.param = JSON.stringify(param);
    var data = sdefun.getRuleParamById(params);
    console.log("getRuleParamById:" + JSON.stringify(data));
}
function getRuleParamByCode() {
    var params = {};
    var param = {ver_id: 300, type: 'select'};
    var ruleCode = 'J7TUN29L';

    params.ruleCode = ruleCode;
    params.param = JSON.stringify(param);
    var data = sdefun.getRuleParamByCode(params);
    console.log("getRuleParamById:" + JSON.stringify(data));
}
function getRuleColumnById() {
    var params = {};
    var param = {ver_id: 300, type: 'select'};
    var ruleId = '4';

    params.ruleId = ruleId;
    params.param = JSON.stringify(param);
    var data = sdefun.getRuleColumnById(params);
    console.log("getRuleColumnById:" + JSON.stringify(data));
}
function getRuleColumnByCode() {
    var params = {};
    var param = {ver_id: 300, type: 'select'};
    var ruleCode = 'J7TUN29L';

    params.ruleCode = ruleCode;
    params.param = JSON.stringify(param);
    var data = sdefun.getRuleColumnByCode(params);
    console.log("getRuleColumnByCode:" + JSON.stringify(data));
}
function getLocalData() {
    alert(sde.execCommand("getlocaldata"));
}

function clearLocalData() {
    sde.execCommand("clearlocaldata");
    alert("已清空草稿箱")
}
function reset() {
    console.log("此方法会清空编辑器内容，清空回退列表，会触发reset事件");
    sde.__ue__.reset();

}
function undoMangerReset() {
    sde.__ue__.undoManger.reset();
}

function updatePluginByCode2Newest() {
    var param = {};
    param.insert = '1';
    param.update = '1';
    sdefun.updatePluginByCode2Newest(param);
}
function getFilePathByHtml() {
    console.log('getFilePathByHtml:' + JSON.stringify(sdefun.getFilePathByHtml()));
}
function getPage(callback) {
    debugger;
    LODOP.GET_VALUE("PRINTSETUP_PAGE_COUNT", "0");
    var counter = 0;
    var timer = setInterval(function () {
        counter += 0.3;
        //console.log(CLODOP.Result+"*****"+(CLODOP.Result!=true) );
        if (CLODOP.Result && CLODOP.Result !== "undefined") {
            // console.log("111111111111");
            var strResult = '';
            strResult = CLODOP.Result;
            var iPos = strResult.indexOf("=");
            LODOP.pageNum = strResult.slice(iPos + 1);
            if (LODOP.pageNum != "true") {
                // console.log(LODOP.pageNum+"=======");
                if (callback) callback();
                clearInterval(timer);
            }
        }
        if (counter >= 200) clearInterval(timer);
    }, 300);
}