/*
 * @Author: InnaSong
 * @Date:   2017-08-01 10:49:07
 * @Last Modified by:   InnaSong
 * @Last Modified time: 2018-07-13 12:22:56
 */

"use strict";
var guangdChart = echarts.init(document.getElementById("guangd"));

$(document).ready(function () {
  //地图
  var provoption = {
    // color: ['#3542ab','#4917b5'],
    backgroundColor: "",
    tooltip: {
      trigger: "item",
      // show: false,
      formatter: function (params, ticket, callback) {
        var res;
        var res1;
        var res2;
        if (params.value[2] != null) {
          res1 = "告警总数：" + params.value[2];
        } else {
          res1 = "告警总数：" + 0;
        }
        if (params.name != null) {
          res2 = "局点名称：" + params.name;
        } else {
          res2 = "局点名称：" + 0;
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
      map: "广东",
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      silent:true,
      label: {
        emphasis: {
          show: false,
          // show: true,  显示区域名称
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
    
          // areaColor: "#293282",
          // areaColor: "#376edd",

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
        data: getDataByRegion("gd"),
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
            color: "#ff6a00",
          },
        },
      },
      /*,
       {
        name: "",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [{
            name: "广州市",
            value: [113.27, 23.13]
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
    },
       {
        name: "",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [{
            name: "汕头市",
            value: [116.68, 23.35]
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
            name: "佛山市",
            value: [113.12, 23.02]
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
                color: "red"
            }
        }
    }*/
    ],
  };
  guangdChart.setOption(provoption);
});
