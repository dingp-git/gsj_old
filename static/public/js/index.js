var areaName = "全部";
var pointName = "全部";
var time = "";

//首页
$(function () {
  //初始化告警信息
  countAlarm();
  initAlarm();
});
var time1 = window.setInterval("countAlarm()", 30000);
//var time2 = window.setInterval("initRegionCount()",30000);
//var time2 = window.setInterval(function(){
//     var params = {
//             'areaName':null,
//             'pointName':null,
//             'offset':1,

//             'limit':6,
//             'page':0,
//             'time':null
//         };
//     $.get('/home/getAllAlarmData',params,function(data){
//            $('#list_table').bootstrapTable('load',data);
//     })
//},15000);

/*-----------------------地图告警信息-----------------------------*/
//切换城市
function updateAlarm(id) {
  var city;
  if (id === "bj_alarm") {
    city = "北京";
  } else if (id === "sh_alarm") {
    city = "上海";
  } else {
    city = "广东";
  }
  areaName = city;
  pointName = city;
  var params = {
    areaName: city,
    pointName: city,
    // 'pointName':"全部",
    // 'pointName':null,
    offset: 1,
    limit: 6,
    page: 0,
  };
  loading("查询中，请稍等...", 1000);
  getData(params);
}

//告警统计
function countAlarm() {
  $.get("getCountAlarm/", "", function (data) {
    console.log(data);
    var color;
    $("#bj_alarm_regin").empty();
    $("#sh_alarm_regin").empty();
    $("#gd_alarm_regin").empty();
    //统计
    for (var key in data.bj) {
      var childDiv = data.bj[key]; //{name: "裕民路111", value:[116.3942910053,39.9791251434,1022]}
      $("#bj_alarm_regin").append(childDiv);
    }
    for (var key in data.sh) {
      var childDiv = data.sh[key];
      $("#sh_alarm_regin").append(childDiv);
    }
    for (var key in data.gd) {
      var childDiv = data.gd[key];
      $("#gd_alarm_regin").append(childDiv);
    }
  });
}

//地图点击事件
shanghChart.on("click", getAlarmDataByArea);
beijChart.on("click", getAlarmDataByArea);
// guangdChart.on("click",{seriesType:'scatter'},getAlarmDataByArea);
guangdChart.on("click", getAlarmDataByArea);

function getAlarmDataByArea(param) {
  console.log(22222, param);

  window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  var params = {
    areaName: "全部",
    pointName: param.name,
    offset: 1,
    limit: 6,
    page: 0,
  };
  if (param.componentType == "series") {
    pointName = param.name; //name:"朝阳区"
    loading("查询中，请稍等...", 1000);
    console.log(9999999, param);
    getData(params);
  }
}



/*------------------------图表告警信息---------------------------------*/
function initAlarm() {
  $("#list_table").bootstrapTable({
    url: "getAllAlarmData/",
    sidePagination: "server",
    pagination: true,
    pageList: [6, 10, 20, 50, 100],
    pageSize: 6,
    pageNumber: 1,
    queryParamsType: "",
    queryParams: queryParams,
    buttonsAlign: "right", //按钮位置
    showJumpto: "true",
    sortName: "id",
    toolbar: "#toolbar",
    sortOrder: "desc",
    height: 342,
    columns: [
      {
        title: "序号",
        field: "id",
        halign: "center",
        sortable: true, //排序
        width: 80,
      },
      {
        title: "局点",
        halign: "center",
        field: "pointName",
        sortable: true, //排序
      },
      {
        title: "详情",
        halign: "center",
        field: "detail",
        width: 400,
      },
      {
        title: "时间",
        halign: "center",
        field: "alarmTime",
        formatter: function (value, row, index) {
          return formatterMillisecond(value);
        },
      },
      {
        title: "业务号",
        halign: "center",
        field: "busNum",
        formatter: function (value, row, index) {
          if (value == 8848) {
            return "-";
          } else {
            return value;
          }
        },
      },
      {
        title: "违规类型",
        halign: "center",
        field: "errorType",
      },
      {
        title: "流量类型",
        halign: "center",
        field: "flowType",
      },
      {
        title: "业务处室",
        halign: "center",
        field: "deptName",
      },
      {
        title: "运营商",
        halign: "center",
        field: "isp",
      },
      {
        title: "源IP",
        halign: "center",
        field: "srcIp",
      },
      {
        title: "目的IP",
        halign: "center",
        field: "dstIp",
      },
      {
        title: "操作",
        halign: "center",
        field: "configuration",
        formatter: function (value, row, index) {
          return '<a href="/details/" class="bianj" >详情</a>';
        },
      },
    ],
    onLoadError: function (status) {
      console.log("加载数据失败" + status);
    },
    onLoadSuccess: function (value) {
      console.log(7777777, value);
    },
  });
}

//获取表格参数
function queryParams(params) {
  var args = {
    areaName: areaName,
    pointName: pointName,
    limit: params.pageSize, //6
    offset: params.pageNumber++, //2
    page: params.pageNumber - 2, //0
    // time:time
  };
  $.each(params, function (index, value) {
    console.log(index + "---" + value);
  });
  //   console.log(22222222222, args);
  return args;
}

/*******全部告警按钮*********/
$("#queryAll").click(function () {
  window.location = "../../details";
});

// 将数据加载到表格中
function getData(params) {
  console.log(44445555, params);
  $.get("getAllAlarmData/", params, function (data) {
    $("#list_table").bootstrapTable("load", data);
  });
}

$(window).resize(function () {
  $("#list_table").bootstrapTable("resetView");
});
