"""Gsj_Web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from Gsj_Web import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),


    # index
    url(r'getCountAlarm/',views.GetCountAlarm.as_view()),
    url(r'getAllAlarmData/', views.GetAllAlarmData.as_view()),
    # url(r'getPoints/(?P<areaName>\W+)/', views.GetPoints.as_view()),

    # detail
    url(r'getPoints', views.GetPoints.as_view()),
    url(r'getDetailsData', views.GetDetailsData.as_view()),
    url(r'exportDetails', views.ExportDetails.as_view()),


    # url(r'getSelectData/', views.GetSelectData.as_view()),
    # url(r'getActionExceptionData/', views.GetActionExceptionData.as_view()),

    # report
    url(r'getReportImg', views.GetReportImg.as_view()),
    url(r'exportReportImg', views.ExportReportImg.as_view()),


    # url(r'echarts/',views.echarts),
    url(r'index/',views.index),
    url(r'details/',views.details),
    url(r'analysis/',views.analysis),
    url(r'login/',views.login),
    url(r'original/',views.original),
    url(r'report/',views.report),
]
