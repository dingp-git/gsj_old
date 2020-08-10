import os
import time

import matplotlib as mpl
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.pyplot import MultipleLocator
from matplotlib.ticker import FuncFormatter, MaxNLocator

plt.switch_backend('agg')
curPath = os.path.abspath(os.path.dirname(__file__))
rootPath = os.path.split(curPath)[0]

def drawImg(datalist,id):
    plt.rcdefaults()
    # fig, ax = plt.subplots()
    fig = plt.figure()
    ax = fig.add_subplot(111)
    plt.rcParams['font.sans-serif']=['SimHei']
    ax.xaxis.grid(True,linestyle='--',color='grey', alpha=.25)
    # x_values = list(range(11))
    x_major_locator = MultipleLocator(10)
    ax.xaxis.set_major_locator(x_major_locator)

    def to_percent(temp,position):
        return '%1.0f'%(1*temp) + '%'

    plt.gca().xaxis.set_major_formatter(FuncFormatter(to_percent))
    plt.gca().spines['left'].set_color('#7D9EC0')
    plt.gca().spines['bottom'].set_color('#7D9EC0')
    ax.tick_params(direction='in',width=1,length=1,axis='both',colors='#e1a842') 
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.axvline(50, linewidth=4, color='#FFFF00', alpha=1)
    ax.axvline(90, linewidth=4, color='#EE3B3B', alpha=1)    
    dataList2 = []
    for i in range(1,len(datalist)+1):
        dataList2.append(['G设备118号业务',100])

    ydatas = []
    ynums = []
    ynums2 = []

    for row in datalist:
        ydata = row[0]
        ydatas.append(ydata)

        ynum = row[1] 
        ynums.append(ynum)
        
    for row in dataList2:
        ynum2 = row[1]
        ynums2.append(ynum2)


    rects = ax.barh(ydatas,ynums2,0.4,align='center',color='#9AC0CD', label = '空闲')
    ax.barh(ydatas,ynums,0.4,align='center',color='#1D778E', label = '已用')
    ax.legend(bbox_to_anchor=(0.3, 1.08), loc=2, borderaxespad=0,numpoints=1,ncol=2)
    src = rootPath+'/static/reportImg/%d'%(id) + '.png'
    plt.savefig(src,bbox_inches = 'tight', dpi=600,transparent=True)
    # plt.show() 

# 函数调用
dataList = [['G设备118号业务', 20], ['G设备43', 70], ['G设备35424', 50], ['G设备63442', 80], ['G设备73444', 70], ['G设备3522', 30], ['G设备13033', 90]] 
drawImg(dataList,88)




