/*
 * @Author: InnaSong
 * @Date:   2017-08-01 10:49:07
 * @Last Modified by:   InnaSong
 * @Last Modified time: 2018-07-13 12:22:56
 */

"use strict";

var beijChart = echarts.init(document.getElementById("beij"));

$(document).ready(function () {
  //北京地图
  var provoption = {
    color: ["#3542ab", "#4917b5"],
    backgroundColor: "",
    tooltip: {
      trigger: "item",
      formatter: function (params, ticket, callback) {
        var res;
        var res1;
        var res2;
        if (params.value[2] != null) {
          res1 = "告警总数: " + params.value[2];
        } else {
          res1 = "告警总数: " + 0;
        }
        if (params.name != null) {
          res2 = "局点名称: " + params.name;
        } else {
          res2 = "局点名称: " + 0;
        }
        res = res1 + "<br/>" + res2;
        return res;
      },
    },
    legend: {
      orient: "vertical",
      y: "90%",
      x: "30%",
      data: ["服务器分布"],
      itemWidth: 15,
      itemHeight: 15,
      textStyle: {
        color: "#fff",
      },
    },
    geo: {
      map: "北京",
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      silent:true,
      label: {
        emphasis: {
          // show: true,
          show: false,
          textStyle: {
            color: "#ccc",
          },
        },
      },
      //        roam: false,
      mapLocation: {
        width: "95%",
        height: "100%",
      },
      itemStyle: {
        normal: {
          shadowBlur: 40,
          shadowColor: "#376edd",
          areaColor: "#293282",
          borderColor: "#376edd",
          borderWidth: 3,
        },
        // emphasis: {
        //   areaColor: "#376edd",
        // },
      },
    },
    //禁止地图托动
    calculator: false,
    series: [
      {
        name: "告警数量",
        type: "scatter",
        coordinateSystem: "geo",
        data: getDataByRegion("bj"),
        rippleEffect: {
          period: 3,
          scale: 4,
          brushType: "stroke",
        },
        symbol: "circle",
        symbolSize: [10, 10],
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          normal: {
            color: "#ffff00",
          },
        },
      },
    ],
  };

  beijChart.setOption(provoption);
});
