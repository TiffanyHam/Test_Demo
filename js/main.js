/**
 * Created by Founder007 on 2017/10/13.
 */
$(function() {
	//动态菜单数据
	var _url = location.host;
	var treeData = [{
		text: "系统管理",
		state: "open",
		children: [{
			text: "菜单管理",
			state: "",
			attributes: {
				url: _url + "index.htm"
			}
		}, {
			text: "权限管理",
			attributes: {
				url: _url + "other.htm"
			}
		}, {
			text: "平台接口管理",
			state: "closed",
			children: [{
				text: "平台接口管理",
				attributes: {
					url: ""
				}
			}, {
				text: "平台代理商管理",
				attributes: {
					url: ""
				}
			}, {
				text: "顺丰接口请求管理",
				state: "closed",
				children: [{
					text: "订舱请求管理",
					attributes: {
						url: ""
					}
				}, {
					text: "平台代理商管理",
					attributes: {
						url: ""
					}
				}, {
					text: "服务商接口管理",
					attributes: {
						url: ""
					}
				}]
			}]
		}]
	}, {
		text: "运单接口管理",
		state: "closed",
		children: [{
			text: "运单接口申请记录",
			attributes: {
				url: ""
			}
		}, {
			text: "临时运单管理",
			attributes: {
				url: ""
			}
		}, {
			text: "运单查询接口请求记录",
			attributes: {
				url: ""
			}
		}]
	}];

	//实例化树形菜单
	$("#tree").tree({
		data: treeData,
		lines: true,
		onClick: function(node) {
			if(node.attributes) {
				Open(node.text, node.attributes.url);
			}
		}
	});
	//在右边center区域打开菜单，新增tab
	function Open(text, url) {
		var content = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';

		if($("#tabs").tabs('exists', text)) {
			$('#tabs').tabs('select', text);
		} else {
			$('#tabs').tabs('add', {
				title: text,
				closable: true,
				content: content
			});
		}
	}

	//绑定tabs的右键菜单
	$("#tabs").tabs({
		onContextMenu: function(e, title) {
			e.preventDefault();
			$('#tabsMenu').menu('show', {
				left: e.pageX,
				top: e.pageY
			}).data("tabTitle", title);
		}
	});

	//实例化menu的onClick事件
	$("#tabsMenu").menu({
		onClick: function(item) {
			CloseTab(this, item.name);
		}
	});

	//几个关闭事件的实现
	function CloseTab(menu, type) {
		var curTabTitle = $(menu).data("tabTitle");
		var tabs = $("#tabs");

		if(type === "close") {
			tabs.tabs("close", curTabTitle);
			return;
		}

		var allTabs = tabs.tabs("tabs");
		var closeTabsTitle = [];

		$.each(allTabs, function() {
			var opt = $(this).panel("options");
			if(opt.closable && opt.title != curTabTitle && type === "Other") {
				closeTabsTitle.push(opt.title);
			} else if(opt.closable && type === "All") {
				closeTabsTitle.push(opt.title);
			}
		});

		for(var i = 0; i < closeTabsTitle.length; i++) {
			tabs.tabs("close", closeTabsTitle[i]);
		}
	}
});

//编辑
function edit() {
	//getSelected: 获取第一个选中行的数据，如果没有选中的行则返回空，否则返回该行的记录
	//getSelections: 获取所有选中行的数据，返回数组，其元素为行的记录
	var row = $('#dg').datagrid('getSelected');

	if(row) {
		$('#add').form('clear');
		$("#addButton").hide();
		$("#editButton").show();
		//$('#add').dialog('open').dialog('setTitle', '编辑');
		$('#add').form('load', row);
		$('#add').dialog({
		title: '编辑',
		closed: false,
		cache: false,
		iconCls:'icon-edit',
		modal: true
	});

	} else {
		$.messager.alert('提示', '请选择一条记录！', 'info');
	}
	
}

//新增
function add() {
	$('#add').form('clear');
	$("#editButton").hide();
	$("#addButton").show();
	//$('#add').dialog('open').dialog({'iconCls': 'icon-add','setTitle':'新增'});
	//$('#add').dialog({iconCls : 'icon-add'});
	//$('#add').dialog('open').dialog({'iconCls':'icon-add'}); 
	$('#add').dialog({
		title: '新增',
		closed: false,
		cache: false,
		iconCls:'icon-add',
		modal: true
	});
	
}

//新增失败
function addError() {
	$.messager.alert('新增信息', '添加失败，请稍后重试', 'error');
}

//删除
function isDelete() {
	$.messager.confirm('删除信息', '确定要删除吗？', function(r) {
		if(r) {
			/*
			var row = $('#dg').datagrid('getSelected');
			var rowIndex = $('#dg').datagrid('getRowIndex', row); //获取选中行
			$('#dg').datagrid('deleteRow', rowIndex); //删除
			*/

			$.messager.alert('删除信息', '删除失败！', 'info'); //info: 要显示的图标图片。可用的值是：error(错误)、question（询问）、info（确定）、warning（警告）
			//$('#dg').datagrid('reload');//删除后重新加载
		}
	});
}

//刷新
function refresh() {
	$.messager.progress();
	setTimeout(function() {
		$.messager.progress('close');
	}, 3200)

}

//打印
function print() {
	$.messager.alert('打印', '未发现安装可打印的设备！', 'warning');
}

//帮助
function help() {
	$.messager.alert('帮助', 'xxxxxxxxx', 'question');
}

//保存
function saveFile() {
	$.messager.prompt('保存', '请输入文件名:', function(r) {
		if(r) {
			$.messager.alert('保存', '保存成功！', 'info');
		}
	});
}