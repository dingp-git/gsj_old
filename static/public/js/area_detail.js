$(function () {
  //按具体地区获取告警信息
  var bjData;
  var shData;
  var gdData;
  initRegionCount();
});

var initializationTime = new Date().getTime();
function showLeftTime() {
  var now = new Date();
  var time = now.toLocaleString();
  var weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  var week = weekday[now.getDay()];
  document.all.show.innerHTML = time;
  //一秒刷新一次显示时间
  var timeID = setTimeout(showLeftTime, 1000);
}

/*-----------------------初始化地图区域告警信息-----------------------*/ {
  [], 123123;
}
function initRegionCount() {
  $.ajax({
    type: "get",
    async: false,
    url: "getCountAlarm/",
    dataType: "json",
    success: function (data) {
      bjData = data.bj;
      shData = data.sh;
      gdData = data.gd;
    },
  });
}

/*-------------------------填充map中告警信息-------------------------------------*/
function getDataByRegion(key) {
  var mapData = []; 
  var list;
  if (key == "bj") {
    list = bjData;
  } else if (key == "sh") {
    list = shData;
  } else {
    list = gdData;
  }
  for (var i = 0; i < list.length; i++) {
    var vdata = new Object();
    vdata.name = list[i].name;
    vdata.value = list[i].value;
    mapData.push(vdata);
  }
  return mapData;
}
