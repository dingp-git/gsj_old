from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect,reverse
from Gsj_Web import settings
import re

class AuthMiddleWare(MiddlewareMixin):
   
    def process_request(self,request):
        # 需要登陆后访问的地址，需要判断登录状态
        # 默认所有的地址都要登陆才能访问
        # 设置一个白名单，不登陆就可以访问
        url = request.path_info
        # 白名单
        for i in settings.WHITE_LIST:
            if re.match(i,url):
                return
        # 校验登录状态
        is_login = request.session.get('is_login')

        if is_login:
            # 已经登陆了  可以访问
            return
        # 没有登陆  需要去登录
        return redirect("login")
        # return redirect("{}?url={}".format(reverse('login'),url))        
