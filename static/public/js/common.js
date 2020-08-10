/*-----------------------模拟post提交-----------------------*/
function postExport(url,params){
   var form = document.createElement("form");
   form.style.display = 'none';
   form.action = url;
   form.method = "post";
   document.body.appendChild(form);
   //拼接参数
   if(null != params){
      for(var key in params){
          var input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = params[key];
          form.appendChild(input);
      }
   }
   form.submit();
   form.remove();
}

function postExport2(url,params){
//    window.open('down.html','下载','height:100,weight:300,top:25%');
    var config = { method:'post'};
    var $iframe = $('<iframe id="down-file-iframe"/>');
    var $form = $('<form target="down-file-iframe" method="'+config.method+'" />');
    $(document.body).append($iframe);
    $iframe.append($form);
    $form.attr('action',url);
    if(null != params){
       for(var key in params){
          $form.append('<input type="hidden" name="" value="'+params[key]+'" />');
       }
    }
    $form[0].submit();
    $iframe.remove();

}

function loading(msg,times){
    layer.msg(msg,{
        icon:16,
        shade:[0.1,'#fff'],
        time:times
    })
}

function beforeSendMsg(msg){
    layer.msg(msg,{
        icon:16,
        shade:[0.3,'#fff']
    })
}


function formatterMillisecond(millssecond){
    var time = new Date(millssecond);
    var year = time.getFullYear()+"年";
    var month = (time.getMonth()+1)<10?"0"+(time.getMonth()+1):(time.getMonth()+1);
    var date = time.getDate()<10?"0"+time.getDate():time.getDate();
    var hours = time.getHours()<10?"0"+time.getHours():time.getHours();
    var minutes = time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes();
    var seconds = time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds();
    var newTime= year+month+"月"+date+"日"+""+hours+":"+minutes+":"+seconds;
    return newTime;
}

/*-----------默认获取一天的时间----------*/
function getDate(days){
   var now = new Date();
   var lastSevenDay = new Date(now.getTime()-24*days*60*60*1000);
   return lastSevenDay;
}
