//原始数据详情页
$(function(){
    laydate.render({
        elem:'#startTime'
        ,value:getDate(1)
    });

    laydate.render({
        elem:'#endTime'
        ,value:new Date()
    });

    initDetailsData();
    getPoints('');
});

function getPoints(param){
    $.get("/original/getPoints?areaName="+param,"",function(data){
        var all = "<option selected=selected value=''>全部</option>";
        $("#point").append(all);
        for(var i = 0; i <data.length;i++){
            var point  = "<option value=\""+data[i]+"\">"+data[i]+"</option>";;
            $("#point").append(point);
        }
    });
}

$("#areaName").change(function(){
    $("#point").empty();
    var areaName  =$(this).children('option:selected').val()
    getPoints(areaName);
})

/*-----------------------数据详请-----------------------------*/
function initDetailsData(){
     $('#list_table').bootstrapTable({
        url:"/original/getDetailsData",
        pagination: true,
        sidePagination: 'server',
        queryParamsType:'',
        queryParams:queryParams,
        pageList:[15,50,100],
        pageSize: 15,
        pageNumber: 1,
        buttonsAlign:'right',//按钮位置
        sortName: 'id',
        toolbar:'#toolbar',
        sortOrder: 'desc',
        height:670,
        columns:[
        {
           title:'序号',
           field:'id',
           halign:'center',
           sortable:true,//排序
           width:80
        },
        {
            title:'局点',
            halign:'center',
            field:'pointName',
            sortable:true,//排序
        },
        {
            title:'详情',
            halign:'center',
            field:'detail',
            width:400
        },
        {
            title:'时间',
            halign:'center',
            field:'alarmTime',
            formatter:function(value, row, index){
                return formatterMillisecond(value);
            }
        },
        {
            title:'业务号',
            halign:'center',
            field:'busNum',
            formatter:function(value, row, index){
                if(value==8848){
                    return "-";
                }else{
                    return value;
                }
            }
        },
        {
            title:'违规类型',
            halign:'center',
            field:'errorType',
        },
        {
            title:'流量类型',
            halign:'center',
            field:'flowType',
        },
        {
            title:'业务处室',
            halign:'center',
            field:'deptName',
        },
        {
            title:'运营商',
            halign:'center',
            field:'isp',
        },
        {
            title:'源IP',
            halign:'center',
            field:'srcIp',
        },
        {
            title:'目的IP',
            halign:'center',
            field:'dstIp',
        }
        ],
    })
}

function queryParams(params) {
    var args = {
        pointName: $("#point").val(),
        alarmType:$("#alarmType").val(),
        areaName : $("#areaName").val(),
        limit : params.pageSize,
        offset : params.pageNumber++,
        page: params.pageNumber-2,
        startTime:$("#startTime").val(),
        endTime:$("#endTime").val()
    };
    $.each(params, function (index, value) {
        console.log(index+"---"+value);
    })
    console.log("******************"+args);
    return args;
}

/*-------------查询按钮-----------------*/
$("#queryButton").click(function () {
    var args = {
            pointName: $("#point").val(),
            alarmType: $("#alarmType").val(),
            areaName: $("#areaName").val(),
            limit : 15,
            offset : 1,
            page: 0,
            startTime:$("#startTime").val(),
            endTime:$("#endTime").val()
      };
     $.ajax({
           url: "/details/getDetailsData",
           data: args,
           type: "get",
           cache: false,
           dataType:"json",
           beforeSend:function(){
//               loading("请稍等...",10000);
//                beforeSendMsg("请稍等...");
                layer.load(0);
           },
           success: function (data) {
               $('#list_table').bootstrapTable('load',data);
               layer.closeAll();
           },
     });
});

/*-----------------导出---------------------*/
$("#exportButton").click(function () {
   var areaName =  $("#areaName").val()=="全部"?"":$("#areaName").val();
   var pointName = $("#point").val()=="全部"?"":$("#point").val();
   var alarmType = $("#alarmType").val()=="全部"?"":$("#alarmType").val();
   var startTime = $("#startTime").val();
   var endTime = $("#endTime").val();
   var url="/details/exportDetails?areaName="+areaName+
        "&pointName="+pointName+
        "&alarmType="+alarmType+
        "&startTime="+startTime+
        "&endTime="+endTime;
   fetch(url).then(res => res.blob().then(blob =>{
        var a = document.createElement('a');
        a.href = url;
        a.download = "异常详情数据.csv";
        a.click();
        window.URL.revokeObjectURL(url);
   }))


});

//添加查询时间限制
var countdown=90;
function settime(val) {
	if(countdown != 0){
        val.setAttribute("disabled", true);
        document.getElementById('export').innerHTML = "下载中";
        countdown--;
	}else {
        val.removeAttribute("disabled");
        document.getElementById('export').innerHTML = "导出";
        countdown = 90;
	    return;//避免无限循环
	 }
	setTimeout(function() {
	settime(val)
	},1000)
}





/*----------------获取所有下拉框值---------------------*/
function getSelectValues(){
    var param = {
        'areaName':$("#areaName").val()=="全部"?"":$("#areaName").val(),
        'pointName':$("#point").val()=="全部"?"":$("#point").val(),
        'alarmType':$("#alarmType").val()=="全部"?"":$("#alarmType").val(),
        'startTime':$("#startTime").val(),
        'endTime':$("#endTime").val()
    };
     return param;
}

