/*
 * @Author: InnaSong
 * @Date:   2017-08-01 10:49:07
 * @Last Modified by:   InnaSong
 * @Last Modified time: 2018-07-13 12:22:56
 */

"use strict";

var shanghChart = echarts.init(document.getElementById("shangh"));

$(document).ready(function () {
  //上海地图
  var provoption = {
    // color: ['#3542ab','#4917b5'],
    backgroundColor: "",
    tooltip: {
      trigger: "item",
      formatter: function (params, ticket, callback) {
        var res;
        var res1;
        var res2;
        if (params.value[2] != null) {
          res1 = "<p>告警总数</p>" + params.value[2];
        } else {
          res1 = "<p>告警总数</p>" + 0;
        }
        if (params.name != null) {
          res2 = "<p>局点名称</p>" + params.name;
        } else {
          res2 = "<p>局点名称</p>" + 0;
        }
        res = res1 + res2;
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
      map: "上海",
      layoutCenter: ["40%", "50%"],
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
        name: "",
        type: "scatter",
        coordinateSystem: "geo",
        data: getDataByRegion("sh"),
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
            color: "red",
          },
        },
      } /*,
     {
        name: "",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [{
            name: "虹口区",
            value: [121.5,31.27]
        }, {
            name: "闵行区",
            value: [121.38,31.12]
        }],
        rippleEffect: {
            period:3,
            scale:4,
            brushType: "stroke",

        },
        symbol:'circle',
        symbolSize:[10,10],
        label: {
            normal: {
                formatter: "{b}",
                position: "right",
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: "#ff6a00"
            }
        }
    },
     {
        name: "",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [{
            name: "上海",
            value: [121.47,31.23]
        }],
        rippleEffect: {
            period:3,
            scale:4,
            brushType: "stroke",

        },
        symbol:'circle',
        symbolSize:[10,10],
        label: {
            normal: {
                formatter: "{b}",
                position: "right",
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: "#ffff00"
            }
        }
    },
     {
        name: "",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [{
            name: "嘉定区",
            value: [121.27,31.38]
        }],
        rippleEffect: {
            period:3,
            scale:4,
            brushType: "stroke",

        },
        symbol:'circle',
        symbolSize:[10,10],
        label: {
            normal: {
                formatter: "{b}",
                position: "right",
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: "#95ff9d"
            }
        }
    }*/,
    ],
  };
  shanghChart.setOption(provoption);
});
