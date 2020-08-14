from django.shortcuts import render,redirect
from clickhouse_driver import Client
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from Gsj_Web import pool
import time
import datetime
import csv
from docs import drawImg
from docs import exportDocx
# import codecs

# from django.template import loader, Context


# index/告警统计
class GetCountAlarm(APIView):
    def get(self, request):
        client = pool.get_conn()
        sql = "select distinct dev_point,dev_location,dev_area from dynamic_backend_alarm where 1=1 "
        result = client.execute(sql)
        totalTemp = len(result)

        pool.close_conn(client)
        retDict = {}
        bjList = []
        shList = []
        gdList = []
        for item in result:
            sql = "select * from dynamic_backend_alarm where dev_point = '%s' " % item[0]
            resultData = client.execute(sql)
            dataSum = len(resultData)
            # print(sql)
            # print(resultData)

            dataTempDict = {}
            item1 = item[1].split(',')
            item2 = [float(i) for i in item1]
            item2.append(dataSum)

            dataTempDict['name'] = item[0]
            dataTempDict['value'] = item2
            if item[2] == "北京":
                bjList.append(dataTempDict)
            elif item[2] == "上海":
                shList.append(dataTempDict)
            else:
                gdList.append(dataTempDict)

        retDict['bj'] = bjList
        retDict['sh'] = shList
        retDict['gd'] = gdList

        return Response(retDict)


# index/图表告警信息
class GetAllAlarmData(APIView):
    def get(self, request):
        client = pool.get_conn()
        sql = "select dev_point,detail,human_time,bus_num,error_type,flow_type,bus_dept,dev_isp,vx_ip_header_src_ip,vx_ip_header_dst_ip from dynamic_backend_alarm where 1=1 "
        limit = int(request.GET.get('limit'))
        offset = int(request.GET.get('offset'))
        page = int(request.GET.get('page'))
        pointName = request.GET.get('pointName')
        areaName = request.GET.get('areaName')

        # 多条件过滤
        if not areaName == '全部':
            sql += "and dev_area = '%s' " % areaName
        if not (pointName == '全部' or pointName == '北京' or pointName == '上海' or pointName == '广东'):
            sql += "and dev_point = '%s' " % pointName

        # sql += "and start_time between %s and %s " % (int(time.time()*1000), int((time.time()-300)*1000))

        tempResult = client.execute(sql)
        total = len(tempResult)
        sql += 'limit %d,%d' % (page*limit, limit)

        print(33333333333,sql)
        result = client.execute(sql)
        pool.close_conn(client)
        # print(1111,result)

        datas = []

        for i, item in enumerate(result, start=1):
            dict = {}
            dict['id'] = i
            dict['pointName'] = item[0]
            dict['detail'] = item[1]
            dict['alarmTime'] = item[2]
            dict['busNum'] = item[3]
            dict['errorType'] = item[4]
            dict['flowType'] = item[5]
            dict['deptName'] = item[6]
            dict['isp'] = item[7]
            dict['srcIp'] = item[8]
            dict['dstIp'] = item[9]
            datas.append(dict)

        values = {}
        values['rows'] = datas
        values['total'] = total
        print(444444, values)

        return Response(values)


# detail/获取局点
class GetPoints(APIView):

    def get(self, request):
        ret = {
            '北京': ['北京', '局点1', '局点2', '局点3', '局点4'],
            '上海': ['上海', '局点11', '局点22', '局点33', '局点44'],
            '广东': ['广东', '局点111', '局点222', '局点333', '局点444'],
        }
        areaName = request.GET.get('areaName')
        bj_list = ret['北京']
        sh_list = ret['上海']
        gd_list = ret['广东']
        all_list = bj_list + sh_list + gd_list

        if areaName == '全部':
            ret['全部'] = all_list
        # print(all_list)
        return Response(ret[areaName])


# detail/获取告警信息详情
seTime = time.strftime("%Y-%m-%d", time.localtime())  # 获取当前时间
class GetDetailsData(APIView):

    def get(self, request):
        # startTime = request.GET.get('startTime',default=seTime)    # 起始时间
        # endTime = request.GET.get('endTime',default=seTime)    #结束时间
        pointName = request.GET.get('pointName', default='全部')  # 局点
        areaName = request.GET.get('areaName', default='全部')  # 省份
        limit = int(request.GET.get('limit'))
        # offset = int(request.GET.get('offset'))
        page = int(request.GET.get('page'))

        print(pointName, 1111234455, areaName)

        client = pool.get_conn()
        sql = "select dev_point,detail,human_time,bus_num,error_type,flow_type,bus_dept,dev_isp,vx_ip_header_src_ip,vx_ip_header_dst_ip from dynamic_backend_alarm where 1=1 "

        # 多条件过滤
        # if not (pointName == '全部' or pointName == ''):
        #     sql += "and dev_point = '%s' " % pointName
        if not (areaName == '全部' or areaName == ''):
            sql += "and dev_area = '%s' " % areaName
        # sql += "and start_time between %s and %s " % (int(time.time()*1000), int((time.time()-300)*1000))

        tempResult = client.execute(sql)
        # print(sql)
        total = len(tempResult)
        # print(total)
        sql += 'limit %d,%d' % (page*limit, limit)
        # print(sql)
        result = client.execute(sql)
        pool.close_conn(client)

        datas = []
        for i, item in enumerate(result, start=1):
            dict = {}
            dict['id'] = i
            dict['pointName'] = item[0]
            dict['detail'] = item[1]
            dict['alarmTime'] = item[2]
            dict['busNum'] = item[3]
            dict['errorType'] = item[4]
            dict['flowType'] = item[5]
            dict['deptName'] = item[6]
            dict['isp'] = item[7]
            dict['srcIp'] = item[8]
            dict['dstIp'] = item[9]
            datas.append(dict)
        values = {}
        values['total'] = total
        values['rows'] = datas
        # print(values)

        return Response(values)


# detail/导出excel数据
class ExportDetails(APIView):

    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="异常详情数据.csv"'
        # pointName = request.GET.get('pointName')
        areaName = request.GET.get('areaName')
        # alarmType = request.GET.get('alarmType')
        # startTime = request.GET.get('startTime')
        # endTime = request.GET.get('endTime')

        client = pool.get_conn()

        sql = "select dev_point,detail,human_time,bus_num,error_type,flow_type,bus_dept,dev_isp,vx_ip_header_src_ip,vx_ip_header_dst_ip from dynamic_backend_alarm where 1=1 "

        # 多条件过滤
        # if not (pointName == '全部' or pointName == ''):
        #     sql += "and pointName = '%s' " % pointName
        if not (areaName == '全部' or areaName == ''):
            sql += "and dev_area = '%s' " % areaName
        # sql += "and start_time between %s and %s " % (int(time.time()*1000), int((time.time()-300)*1000))
        # sql += 'order by uuid'
        datas = client.execute(sql)
        pool.close_conn(client)
        # print(1111,sql)

        writer = csv.writer(response)
        dataList = []
        for item in datas:
            item = list(item)
            dataList.append(item)
        writer.writerow(["局点", "详情", "时间", "业务号", "违规类型",
                         "流量类型", "业务处室", "运营商", "源IP", "目的IP"])
        # writer.writerow(["序号","局点","详情","时间","业务号","违规类型","流量类型","业务处室","运营商","源IP","目的IP"])

        for data in dataList:
            # print(data)
            writer.writerow(data)
        # print(22222,dataList)
        return response
        # return HttpResponse(dataList,safe=False)


# analysis/获取下拉数据


# analysis/业务运作违规
# class GetActionExceptionData(APIView):

#     def get(self, request):

#         # data = [{'vals':12,'legend':['回流','回注']},{'vals':33,'legend':['回流','回注']}]
#         # {'axis': ['周一','周二','周三','周四','周五','周六','周日']},
#         data = [{'vals': 12, 'legend': ['回流', '回注']},
#                 {'vals': 33, 'legend': ['回流', '回注']}]

#         return Response(data, safe=False)


# report/获取报表图片
class GetReportImg(APIView):
    def get(self, request):

        dataList1 = [['G设备118号业务', 20], ['G设备43', 70], ['G设备42335', 50], ['G设4备63', 80], ['G设备42473', 70], ['G424设备35', 30], ['G42设备130', 90], ['G设备118号业务', 20], ['G设备243', 70], ['G设备35', 50],
                     ['G设备63423', 80], ['G设备4473', 70], ['G设备35', 30], ['G设备130', 90], ['G设备118号业务', 20], [
                         'G设备4433', 70], ['G设备4235', 50], ['G设备6433', 80], ['G设备7433', 70], ['G设备35', 30],
                     ['G设备118号业务55', 20], ['G设备433', 70], ['G设备4235', 50], ['G设备2463', 80], ['G设备4373', 70], ['G设备35', 30]]
        dataList2 = [['G设备118号业务44', 20], ['G设备223', 30], ['G设备6421', 60], ['G设备71', 30], ['G设备2451', 80], ['G设备14310', 19], ['G设备1431', 50], ['16号业务私有空间', 50], ['442号业务私有空间', 80], ['44号业务私有空间', 70], ['22号业务私有空间', 30], ['3号业务私有空间', 90],
                     ['G设备23', 10], ['G设备33', 17], ['G设备43', 70], ['G设备35424', 50], ['G设备63442', 80], ['G设备73444', 70], ['G设备3522', 30], ['G设备13033', 90]]
        dataList3 = [['G设备51', 20], ['16号业务私有空间', 50], ['442号业务私有空间', 80], ['44号业务私有空间', 70], ['22号业务私有空间', 30], ['G设备4473', 70], [
            'G设备35', 30], ['G设备130', 90], ['G设备118号业务', 20], ['G设备4433', 70], ['G设备63442', 80], ['G设备73444', 70], ['G设备3522', 30], ['G设备13033', 90]]
        dataList4 = [['G设备118号业务', 20], ['G设备4473', 70], ['G设备35', 30], ['G设备130', 90], ['G设备118号业务', 20], ['G设备4433', 70], ['G设备2', 30], ['16号业务', 70], ['G设备4', 90], ['G设备5', 60], ['G设备6', 80], ['G设备7', 90], ['G设备5', 100], ['G设备10', 80],
                     ['G设备33', 17], ['G设备43', 70], ['G设备35424', 50], ['G设备63442', 80], ['G设备73444', 70], ['G设备3522', 30], ['G设备13033', 90], ['16号业务私有空间', 50], ['442号业务私有空间', 80], ['44号业务私有空间', 70], ['22号业务私有空间', 30], ['3号业务私有空间', 90]]
        dataList5 = [['G设备118号业务', 20], ['G设备43', 70], ['G设备35424', 50], [
            'G设备63442', 80], ['G设备73444', 70], ['G设备3522', 30], ['G设备13033', 90]]
        dataList6 = [['G设备21', 30], ['G设备31', 60], ['16号业务私有空间', 50], ['442号业务私有空间', 80], ['44号业务私有空间', 70], [
            '22号业务私有空间', 30], ['3号业务私有空间', 90], ['1号业务私有空间', 50], ['2号业务私有空间', 80], ['8号业务私有空间', 70], ['126号业务私有空间', 30]]

        numDir = {
            "dataList1": dataList1,
            "dataList2": dataList2,
            "dataList3": dataList3,
            "dataList4": dataList4,
            "dataList5": dataList5,
            "dataList6": dataList6,
        }
        srcList = []
        for id in range(1, 7):
            drawImg.drawImg(numDir["dataList%d" % (id)], id)
            srcList.append("../../static/reportImg/%d" % (id) + ".png")
        exportDocx.exportDocx()
        return HttpResponse(srcList)

# report/导出报表图片
class ExportReportImg(APIView):
    def get(self, request):
        srcUrl = "../static/mouth_report.docx"
        return HttpResponse(srcUrl)



# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def login(request):
#     # 用户名：admin 密码：admin123
#     user = "admin"
#     psd = "admin123"
#     if request.method == "GET":
#         return render(request,'login.html')
#     if request.method == 'POST':
#         # request  <WSGIRequest: POST '/login/'>
#         # request.POST <QueryDict: {'username': ['admin'], 'password': ['admin123']}>
#         print(1111,request.COOKIES)
#         print(2222,request.session)
#         print(3333,request.user.username)
        

#         # next_url = request.get_full_path()
#         # print(4444,next_url)
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         msg = ""
#         if username and password:
#             username = username.strip()
#             if password == psd:
#                 next_url = request.GET.get("next")
#                 print(9999,next_url)
#                 # request.session['username'] = username
#                 # request.session['password'] = password
#                 response = redirect('index')
#                 response.set_cookie('username',username,3600)
#                 response.set_cookie('password',password,3600)

#                 # response   <HttpResponseRedirect status_code=302, "text/html; charset=utf-8", url="/index/">
#                 print(66666,request)
#                 print(66666,response)

#                 return response
#             else:
#                 return render(request,'login.html',{'msg':'您输入的密码不正确，请重试！'})
#         else:
#             return render(request,'login.html',{'msg':'账户或密码为空'})


from django.views.decorators.csrf import csrf_exempt
from Gsj_Web.middlewares.my_middleware import AuthMiddleWare

@csrf_exempt
def login(request):
    msg = ""
    if request.method == "POST":
        user = "admin"
        psd = "admin123"
        username = request.POST.get("username")
        password = request.POST.get("password")

        if username == user and password == psd:
            
            # response = redirect("index")
            # # 设置cookie
            # response.set_cookie('username',username,1800)
            # response.set_cookie('password',password,1800)
            # 设置session  保存登陆状态
            request.session["is_login"] = True
            request.session["username"] = username
            # request.session.set_expiry(1800)
          
            # url = request.GET.get('url')
            # if url:
            #     return redirect(url)
            return redirect("index")
        else:
            msg = "用户名或密码错误，请重试！"
            return render(request,'login.html',{'msg':msg})
    else:
        return render(request, "login.html")


def logout(request):
    # 删除所有当前请求相关的session
    request.session.delete()
    return redirect("login")


def index(request):

    if request.session.get('is_login',None):
        username = request.session.get('username')
        return render(request,"index.html",{"username":username})
    else:
        return redirect("login")


def details(request):
    return render(request, 'details.html')


def analysis(request):
    return render(request, 'analysis.html')


def original(request):
    return render(request, 'original.html')


def report(request):
    return render(request, 'report.html')


def echarts(request):
    return render(request, 'echarts.html')


# if __name__ == "__main__":
#     print(getReportImg)
