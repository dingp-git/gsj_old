import re 

# pattern = re.compile(r'\d+')
# m = pattern.search('one12twothree34four')  
# print(m)
# pattern = re.compile(r'\w+')

# m = pattern.match('hello world')
# print(m)   # <re.Match object; span=(0, 5), match='hello'>
# mm = m.group()
# print(type(mm))


# ret = re.match("hello","hello word")
# print(ret)
# print(ret.group())
# print(ret.start())
# print(ret.end())
# print(ret.span())

# f = pattern.search('hhdsgd hfdf')
# print(f.group())

# fa = pattern.findall('sdff dgg dsg fdg')
# print(fa)
# import re
# print(re.search('www', 'www.runoob.com'))   #<re.Match object; span=(0, 3), match='www'>
# print(re.search('com', 'www.runoob.com'))   #<re.Match object; span=(11, 14), match='com'>

# print(re.search('www', 'www.runoob.com').group())   #www
# print(re.search('com', 'www.runoob.com').group())   #com

# pattern = re.compile('com')
# ret = pattern.search('www.baidu.com')
# print(ret)
# print(ret.group())

 
# import re
# # ret = re.findall(r'\d+','run88oob123google456')
# pattern = re.compile(r'\d+')   # 查找数字
# ret = pattern.findall('run88oob123google456')
 
# print(ret)  # ['88', '123', '456']


# s = ['1.dat','10.dat','5.dat']
# new = sorted(s,key = lambda i:int(re.match(r'(\d+)',i).group()))
# print(new)   # 返回一个新的列表

# s.sort(key = lambda i:int(re.match(r'(\d+)',i).group()))
# print(s)



# dataList = [['G设备21',30],['G设备31',60],['16号业务私有空间',50],['442号业务私有空间',80],['44号业务私有空间',70],['22号业务私有空间',30],['3号业务私有空间',90],['1号业务私有空间',50],['2号业务私有空间',80],['8号业务私有空间',70],['126号业务私有空间',30]]
# for item in dataList:
#     print(item[0])
#     newList = sorted(dataList,key=lambda i: int(re.search(r'\d+',item[0]).group()))
#     print(newList)



# pattern = re.compile(r'([a-z]+) ([a-z]+)', re.I)   # re.I 表示忽略大小写
# m = pattern.match('Hello World Wide Web')
# print(m)   # <re.Match object; span=(0, 11), match='Hello World'>

# print(m.group(0))    # Hello World
# print(m.group(1))    # Hello
# print(m.span(0))    # (0, 11)
# print(m.span(1))    # (0, 5)
# print(m.span(2))    # (6, 11)
# print(m.group(2))    # World
# print(m.groups(0))    # ('Hello', 'World')


# it = re.finditer(r"\d+","12q344dfd35f")
# for m in it:
#     print(m.group())

# pattern = re.compile("\d+")
# i = pattern.finditer("12q344dfd35f")
# print(i)
# for j in i:
#     print(j.group())


# phone = "2004-959-559 # 这是一个国外电话号码"

# # ret = re.sub(r"#.*$","",phone)
# ret = re.sub("\D","*",phone)
# print(ret,type(ret))
# rettt = re.findall('\W+', 'runoob, runoob, runoob.')
# ret = re.split('\W+', 'runoob, runoob, runoob.',1)
# print(rettt)
# print(ret)

# num = '06'
# ret = re.search(r'100|\d{1,2}',num).group()
# print(ret)


# num = '0106-3423344'
# ret = re.search(r'\d{3,4}-\d{7,8}',num).group()
# print(ret)


# num = '2374664585'
# ret = re.search(r'^[1-9]\d{4,10}$',num).group()
# print(ret)

# email = 'rtt@qq.cn.net'
# ret = re.search(r"^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z_]{1,13}\.[com,cn,net]{1,3}",email).group()
# print(ret)



# ret = re.search('a.+b','324ae63tba6437bkgdfa').group()
# print(ret)
li = [('1','2'),('3','4'),('5','3'),('3','4'),('5','3')]

# for item in li:
#     li2 = item.split(',')
#     print(li2[0],li2[1])

for i in li:
    d = {}
    d['name'] = i[0]
    d['value'] = i[1]
    print(d)
