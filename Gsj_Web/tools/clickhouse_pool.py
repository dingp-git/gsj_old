from Gsj_Web import settings
from clickhouse_driver import Client
from queue import Queue


class Clickhouse_Pool(object):
    def __init__(self):
        self.user = settings.CLICKHOUSE['user']
        self.password = settings.CLICKHOUSE['password']
        self.host = settings.CLICKHOUSE['host']
        self.port = settings.CLICKHOUSE['port']
        self.databases = settings.CLICKHOUSE['databases']
        self.pool_len = 20
        self.conn_queue = Queue(maxsize=self.pool_len)
        for i in range(self.pool_len):
            self.conn_queue.put(self.dedicated_connection())

    # 初始化连接池时创建连接
    def dedicated_connection(self):
        try:
            conn = Client(host=self.host, port=self.port, user=self.user,
                          database=self.databases, password=self.password)
        except Exception as e:
            conn = None
            print("连接池初始化失败,错误信息%s" % e)
        return conn

    # 获取一个连接
    def get_conn(self):
        conn = None
        try:
            if not self.conn_queue.empty():
                conn = self.conn_queue.get()
        except Exception as e:
            print("尝试获取连接失败,错误信息%s" % e)
            try:
                conn = self.dedicated_connection()
            except Exception as e:
                print("尝试新建连接失败,错误信息%s" % e)
        return conn

    # 归还一个连接
    def close_conn(self, conn):
        try:
            if not self.conn_queue.full():
                self.conn_queue.put(conn)
        except Exception as e:
            print("获取clickhouse队列出错或入队失败,错误信息%s" % e)
            try:
                if not self.conn_queue.full():
                    self.conn_queue.put(self.dedicated_connection())
            except Exception as e:
                print("再次尝试新建链接入队失败%s" % e)

    # 获取当前连接池连接数
    def get_conn_size(self):
        return self.conn_queue.qsize()
