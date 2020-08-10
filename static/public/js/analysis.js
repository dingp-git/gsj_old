//统计分析页
$(function () {
  laydate.render({
    elem: "#startTime",
    value: getDate(1),
  });

  laydate.render({
    elem: "#endTime",
    value: new Date(),
  });

  initSelectData();
  //初始化所有异常信息
  initException();
});
/*--------------------query-------------------------------*/
$("#queryButton").click(function () {
  initException();
});

function getSelectValues() {
  var param = {
    startTime: $("#startTime").val(),
    endTime: $("#endTime").val(),
    deptName: $("#deptName").val() == "全部" ? "" : $("#deptName").val(),
    busNum: $("#busNum").val() == "全部" ? "" : $("#busNum").val(),
    isp: $("#isp").val() == "全部" ? "" : $("#isp").val(),
    pointName: $("#pointName").val() == "全部" ? "" : $("#pointName").val(),
    actionDesc: $("#actionDesc").val() == "全部" ? "" : $("#actionDesc").val(),
    flag: false,
  };
  return param;
}

/*-----------------------export-----------------------------*/
$("#exportButton").click(function () {
  var url = "/analysis/exportAnalysis";
  var params = {
    param: JSON.stringify(getSelectValues()),
  };
  loading("正在导出", 1200);
  postExport(url, params);
});

/*-----------------------各下拉框-----------------------------*/
function initSelectData() {
  var url = "/getSelectData";
  var param = {};
  $.getJSON(url, param, function (data) {
    //填充各下拉框
    var common = "<option value=全部>全部</option>";
    $("#deptName").append(common);
    $("#pointName").append(common);
    $("#busNum").append(common);
    for (var key in data) {
      var list = data[key];
      for (var i = 0; i < list.length; i++) {
        if (key == "deptName") {
          var deptName =
            '<option value="' + list[i] + '">' + list[i] + "</option>";
          $("#deptName").append(deptName);
        } else if (key == "pointName") {
          var pointName =
            '<option value="' + list[i] + '">' + list[i] + "</option>";
          $("#pointName").append(pointName);
        } else {
          var busNum =
            '<option value="' + list[i] + '">' + list[i] + "</option>";
          $("#busNum").append(busNum);
        }
      }
    }
  });
}
/*-----------------------初始化各类异常-----------------------------*/
function initException() {
  //get param
  var param = getSelectValues();
  //获取所有异常并加载三类异常信息折线图
  var actionUrl = "/getActionExceptionData";
  var keepaliveUrl = "getKeepAliveExceptionData";
  var flowUrl = "getFlowExceptionData";
  var delayUrl = "getDelayExceptionData";

  loading("正在加载...", 1500);
  $.get(actionUrl, param, function (data) {
    loadActionExceptionData(data);
    // console.log(data);
  });

  $.post(keepaliveUrl, param, function (data) {
    loadKeepAliveExceptionData(data);
  });

  $.post(flowUrl, param, function (data) {
    loadFlowExceptionData(data);
  });

  $.post(delayUrl, param, function (data) {
    loadDelayExceptionData(data);
    //        setVarValue("delay",data);
  });
}

/*-----------------------动作异常-----------------------------*/
var myChart1 = echarts.init(document.getElementById("action"));
function loadActionExceptionData(data) {
  // 指定图表的配置项和数据
  option1 = {
    color: ["#455ae4", "#6927f8"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      right: 10,
      top: -5,
      data: ["回流", "回注"],
      textStyle: {
        color: "#fff",
        // fontSize: 16
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "6%",
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        // data : ['周一','周二','周三','周四','周五','周六','周日'],
        data: data[0].axis, //['周一','周二','周三','周四','周五','周六','周日'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#313454"],
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    series: formatSerie(data),
    // console.log(typeof data);
  };
  myChart1.setOption(option1);
  myChart1.resize();
}

/*-----------------------保活-----------------------------*/
var myChart2 = echarts.init(document.getElementById("keepalive"));
function loadKeepAliveExceptionData(data) {
  // 指定图表的配置项和数据
  option2 = {
    color: ["#455ae4", "#6927f8"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      right: 10,
      top: -5,
      data: ["回流包", "回流流量", "回注包", "回注流量"],
      textStyle: {
        color: "#fff",
        // fontSize: 16
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "6%",
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        data: data[0].axis, //['周一','周二','周三','周四','周五','周六','周日'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#313454"],
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    series: formatSerieByKeep(data),
  };
  myChart2.setOption(option2);
  myChart2.resize();
}

/*-----------------------流量异常-----------------------------*/
var myChart3 = echarts.init(document.getElementById("huil"));
function loadFlowExceptionData(data) {
  // 指定图表的配置项和数据
  option3 = {
    color: ["#9ad1ff", "#806eec"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      right: 10,
      top: -5,
      data: ["回流", "回注"],
      textStyle: {
        color: "#fff",
        // fontSize: 16
      },
    },
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "6%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data[0].axis,
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#313454"],
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    series: formatSerie(data),
  };
  myChart3.setOption(option3);
  myChart3.resize();
}

/*-----------------------延时异常-----------------------------*/
var myChart4 = echarts.init(document.getElementById("delay"));
function loadDelayExceptionData(data) {
  // 指定图表的配置项和数据
  option4 = {
    color: ["#455ae4", "#6927f8"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      right: 10,
      top: -5,
      data: ["回流", "回注"],
      textStyle: {
        color: "#fff",
        // fontSize: 16
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "6%",
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        data: data[0].axis,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2, //这里是为了突出显示加上的
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#313454"],
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    series: formatSerie(data),
  };
  myChart4.setOption(option4);
  myChart4.resize();
}

/*-----------------------action_error serie-----------------------------*/
function formatSerieByAction(data, type) {
  var serie = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].name == type) {
      for (var y = 0; y < data[i].data.length; y++) {
        var item = {
          value: data[i].data[y],
        };
        serie.push(item);
      }
    }
  }
  return serie;
}

function formatSerie(data) {
  var serie = [];
  for (var i = 0; i < data.length; i++) {
    var item = {
      data: data[i].vals,
      name: data[i].legend,
      type: "line",
    };
    serie.push(item);
    console.log(item);
  }
  console.log(serie);
  return serie;
}

/*-----------------------keepAlive serie-----------------------------*/
function formatSerieByKeep(data) {
  var serie = [];
  for (var i = 0; i < data.length; i++) {
    var item = {
      data: data[i].vals,
      name: data[i].legend,
      type: "line",
      itemStyle: {
        normal: {
          color: data[i].rgb,
        },
      },
    };
    serie.push(item);
  }
  return serie;
}

//function setVarValue(key,data){
//    if(key=="action"){
//        action_error = data;
//    }else if(key == "keep_active"){
//        keep_active = data;
//    }else if(key == "flow"){
//        flow_error = data;
//    }else{
//        delay_error = data;
//    }
//}

function loading(msg) {
  layer.msg(msg, {
    icon: 16,
    shade: [0.1, "#fff"],
    time: 2000,
  });
}
