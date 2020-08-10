//报表页
$(function () {
  //执行一个laydate实例
  //initReportData();
  laydate.render({
    elem: "#time2",
    type: "datetime",
    range: true,
  });
  var time;
  loadImage();
  // loadData();
});

/*-----------------------加载图片-----------------------------*/
function loadImage(id) {
  $.ajax({
    url: "/getReportImg?id=" + id,
    // url: "/details/getDetailsData",
    type: "get",
    // cache: false,
    //   dataType:"json",
    beforeSend: function () {
      loading("请稍等...", 10000);
      // beforeSendMsg("请稍等...");
      //       // layer.load(0);
    },

    success: function (data) {
      console.log("1111" + data);
      addImg("report_echarts1");
      addImg("report_echarts2");
      addImg("report_echarts3");
      addImg("report_echarts4");
      addImg("report_echarts5");
      addImg("report_echarts6");
    },
  });
}

// 添加img标签
function addImg(obj) {
  var div = document.getElementById(obj);
  var id = obj.substr(obj.length - 1, 1); //1,2,3,4,5,6
  var img = document.createElement("img");
  img.style.width = "800px";
  img.style.height = "580px";
  img.style.marginLeft = "24px";
  img.style.marginTop = "16px";

  //判断是否已存在img标签，若存在则删除
  var divImg = div.getElementsByTagName("img");
  for (var i = 0, len = divImg.length; i < len; i++) {
    div.removeChild(divImg[0]);
  }
  img.src = "../../static/reportImg/" + id + ".png";
  div.appendChild(img);
}

/*-----------------------导出按钮-----------------------------*/
// $("#exportButton").click(function () {
//   // var param = {
//   //  'time':time
//   // }
//    loading("正在导出",2200);
//    $.get("/exportReportImg", function(data,status){
//       console.log(data + '.....' + status);
//    })

// });

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  // var seperator = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + "年" + month + "月" + strDate + "日";
  // var currentdate = year + seperator + month + seperator + strDate;
  return currentdate;
}

function downLoad(content, fileName) {
  var aEle = document.createElement("a"); // 创建a标签
  // blob = new Blob([content]);
  aEle.download = fileName; // 设置下载文件的文件名
  //aEle.href = URL.createObjectUrl(blob);
  aEle.href = content; // content为后台返回的下载地址
  aEle.click(); // 设置点击事件
}

$("#exportButton").click(function () {
  var curTime = getNowFormatDate();
  console.log(curTime, 66666666);
  loading("正在导出", 2200);
  $.get("/exportReportImg", function (data, status) {
    console.log(data + "  .....  " + status);
    downLoad(data, curTime + " - 报表.docx");
  });
});

/*-----------------------查询按钮-----------------------------*/
$("#queryButton").click(function () {
  //  var param = {
  //      'time':$("#time2").val()   //获取用户选择的时间
  //  }
  //  $.get("/getReportImg",param,function(){
  $.get("/getReportImg", function () {
    loading("正在加载...", 1500);
    loadImage();
  });
});

////////////////////////////////////////////////////////////////////////////////

// function saveImages(chartId,key){
//   //实例dom,获取url
// //    var myChart = echarts.getInstanceByDom(document.getElementById(chartId));
//   var url = chartId.getConnectedDataURL({
//       pixelRatio:1.3,//图片像素设置
//       backgroundColor:'#fff',
//       excludeComponents:[//保存图片时剔除的元素
//           'toolbox'
//       ],
//       type:'png'
//   });
//   var data = "image="+encodeURIComponent(url);
//   var xmlhttp ;
//   if(window.XMLHttpRequest){
//       xmlhttp = new XMLHttpRequest();
//   }else{
//       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.open("POST","/report/uploadImage",true);
//   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//   xmlhttp.send(data+"&key="+key);
// }

/*----------------------初始化----------------------------*/
// function loadData(){
//     $.post("/report/getReportData","",function(data){
//         loading("查询中，请稍等",1500);
//         initAllCharts(data);
//     })
// }
/*----------------------加载所有图表-----------------------------*/
// function initAllCharts(data){
//         for(var key in data){
//             if(key=="time"){
//                 console.log("=====>"+data[key]);
//                 setVarValue("time",data[key]);
//             }else if(key=="noIpv4Rule"){
//                 loadReportAllCharts("report_echarts1",data[key]);
//             }else if(key=="noIpv4Mask"){
//                 loadReportAllCharts("report_echarts2",data[key]);
//             }else if(key=="openIpv4Rule"){
//                 loadReportAllCharts("report_echarts3",data[key]);
//             }else if(key=="openIpv4Mask"){
//                 loadReportAllCharts("report_echarts4",data[key]);
//             }else if(key=="openIpv6Rule"){
//                 loadReportAllCharts("report_echarts5",data[key]);
//             }else if(key=="openIpv6Mask"){
//                 loadReportAllCharts("report_echarts6",data[key]);
//             }else{
// //                loadReportAllCharts("report_echarts7",data[key]);
//             }
//         }
// }
/*-----------------------填充Option---------------------------*/
// function loadReportAllCharts(id,data){
//     var myChart = echarts.init(document.getElementById(id));
//     var option ={
//       tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//               type: 'shadow',
//             },
//           },
//       legend: {
//         // tslint:disable-next-line:max-line-length
//         data: ['使用量（%）', '空闲量（%）'],
//       },
//       xAxis: {
//         min: 0,
//         max: 100,
//         type: 'value',
//         axisLabel: {
//           color: '#e1a842',
//         },
//         splitLine: {
//           show: false,
//         },
//       },
//       yAxis: {
//         type: 'category',
//         data: format(data).y,//['1号业务私有量','2号业务私有量','4号业务私有量','57号业务私有量','g设备总量'],
//         axisLabel: {
//           margin:13,//调整坐标轴与类目之间的距离
//           color: '#e1a842',
//           interval:0 //类目显示不完整
//         },
//       },
//       //调整画布的间距
//       grid:{
//         left:'18%',
//         right:'2%'
//       },
//       series:[
//         {
//           name: '使用量（%）',
//           type: 'bar',
//           stack: '总量',
//           label: {
//             normal: {
//               show: true,
//               position: 'insideRight',
//             },
//           },
//           data:format(data).xUse ,//['10','4.55','15','24','23'],
//           itemStyle: {
//             normal: {
//               color: 'blue',
//             },
//           },
//           markLine:{
//               silent: true,
//               data: [{
//                   xAxis: 50 ,//y轴添加时，选择:yAxis，x轴添加时用xAxis
//                   lineStyle:{
//                     color:'yellow',
//                     width:5,
//                     type:'solid'//'solid' 是实线，'dashed'是虚线，'dotted'是密集虚线
//                   },
//               },
//               {
//                   xAxis: 90,
//                   lineStyle:{
//                     color:'red',
//                     width:5,
//                     type:'solid'//'solid' 是实线，'dashed'是虚线，'dotted'是密集虚线
//                   },
//           }]
//         }
//       },
//       {
//         name: '空闲量（%）',
//         type: 'bar',
//         stack: '总量',
//         label: {
//           normal: {
//             show: true,
//             position: 'insideRight',
//           },
//         },
//         data:format(data).xUnuse,// ['90','95.45','85','76','77'],
//         itemStyle: {
//           normal: {
//             color: 'green',
//           },
//         },
//       }
//       ]
//   }
//     myChart.setOption(option);
//     //后置保存图片
//     setTimeout(saveImages(myChart,id.substr(id.length-1,1)),2000);
// }
// //格式option展示数据
// function format(data){
//     var map = {};
//     var xUse = [];
//     var xUnuse = [];
//     var y = [];
//     for(var key in data){
//         var use = data[key].usage;
//         var priUsageRate = data[key].priUsageRate;//使用
//         var pubUnUsed =data[key].pubUnUsed;//空闲
//         xUse.push(priUsageRate);
//         xUnuse.push(pubUnUsed) ;
//         y.push(key.slice(0,1)!="G"
//             ?key+"号业务私有("+(Math.round((use*10000)/10000)/10000).toFixed(2)+"万)"
//             :data[key].busNum+"("+Math.round(use/10000)+"万)");
//     }
//     //数据排序
// //    y.sort(sortNumber);
//     map.xUse = xUse;
//     map.xUnuse = xUnuse;
//     map.y = y;
//     return map;
// }

// /*-----------------------保存图片-----------------------------*/
// function saveImages(chartId,key){
//   //实例dom,获取url
// //    var myChart = echarts.getInstanceByDom(document.getElementById(chartId));
//   var url = chartId.getConnectedDataURL({
//       pixelRatio:1.3,//图片像素设置
//       backgroundColor:'#fff',
//       excludeComponents:[//保存图片时剔除的元素
//           'toolbox'
//       ],
//       type:'png'
//   });
//   var data = "image="+encodeURIComponent(url);
//   var xmlhttp ;
//   if(window.XMLHttpRequest){
//       xmlhttp = new XMLHttpRequest();
//   }else{
//       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   xmlhttp.open("POST","/report/uploadImage",true);
//   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//   xmlhttp.send(data+"&key="+key);
// }

// /*-----------------------导出按钮-----------------------------*/
// $("#exportButton").click(function () {
//    var param = {
//     'time':time
//    }
//     loading("正在导出",2200);
//    postExport("/report/exportReport",param);
// });

// /*-----------------------查询按钮-----------------------------*/
// $("#queryButton").click(function () {
//     var param = {
//         'time':$("#time2").val()   //获取用户选择的时间
//     }
//     $.post("/report/getReportData",param,function(data){
//         loading("正在加载...",1500);
//         initAllCharts(data);
//     })
// });

/*-----------------------为导出时所需变量赋值------------------*/
// function setVarValue(key,data){
//     if(key=="time"){
//         for(var key in data){
//             time = key;
//         }
//     }
// }
