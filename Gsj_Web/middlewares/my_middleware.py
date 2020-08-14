from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect,reverse
from Gsj_Web import settings
import re

class AuthMiddleWare(MiddlewareMixin):
    def process_request(self,request):
        url = request.path_info
        for i in settings.WHITE_LIST:
            if re.match(i,url):
                return
        is_login = request.session.get('is_login')
        if is_login:
            return
        return redirect("login")
        # return redirect("{}?url={}".format(reverse('login'),url))        
