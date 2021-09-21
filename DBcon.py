import pymysql


class DB:
    def getConnection(self):
        return pymysql.connect(host="127.0.0.1", port=3306, database="messageboard", user="root", password="88888888",
                               charset="utf8")

    def selectUser(self, user):
        conn = self.getConnection()
        cursor = conn.cursor()
        cursor.execute('select password from user where user = "%s"' % str(user))
        password = cursor.fetchall()
        cursor.close()
        conn.close()
        return password

    def selectAllUser(self):
        conn = self.getConnection()
        cursor = conn.cursor()
        cursor.execute('select * from user')
        users = cursor.fetchall()
        cursor.close()
        conn.close()
        return users

    def insertUser(self, user, password):
        conn = self.getConnection()
        cursor = conn.cursor()
        cursor.execute('insert into user values (%s, %s)', (user, password))
        conn.commit()
        cursor.close()
        conn.close()

    def insertMsg(self, user, msg, address):
        conn = self.getConnection()
        cursor = conn.cursor()
        cursor.execute('insert into msg values (%s, %s, %s)', (user, msg, address))
        conn.commit()
        cursor.close()
        conn.close()

    def selectMsg(self):
        conn = self.getConnection()
        cursor = conn.cursor()
        cursor.execute('select * from msg')
        msgs = cursor.fetchall()
        cursor.close()
        conn.close()
        return msgs

    def getMsg(self):
        conn = self.getConnection()
        cursor = conn.cursor()
        cursor.execute('select msg from msg')
        msgs = cursor.fetchall()
        cursor.close()
        conn.close()
        return msgs
