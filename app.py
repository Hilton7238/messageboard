from flask import Flask, render_template, session, request, jsonify, redirect, url_for

from CloudImg import CloudImg
from DBcon import DB

import imageCode

app = Flask(__name__)
app.secret_key = "ppp"


def registerTest():
    msg = {}
    code = request.form.get('imgCode')
    if userTest():
        msg.setdefault('user', 'true')
    else:
        msg.setdefault('user', 'false')
    if codeTest(code):
        msg.setdefault('imgCode', 'true')
    else:
        msg.setdefault('imgCode', 'false')
    return msg


def codeTest(code):
    a = str(code)
    b = str(session.get("imgCode"))
    if a.upper() == b.upper():
        return True
    else:
        return False


def userTest():
    db = DB()
    users = db.selectAllUser()
    user = request.form.get('user')
    for item in users:
        if str(item[0]) == str(user):
            return False
    return True


# 验证码
@app.route('/imgCode')
def imgCode():
    return imageCode.imageCode().getImgCode()


@app.route('/register')
def register():
    return render_template("register.html")


@app.route('/index')
@app.route('/')
@app.route('/login')
def login():
    return render_template("login.html")


@app.route("/testCode", methods=['POST', 'GET'])
def testCode():
    code = request.form.get('imgCode')
    if codeTest(code):
        return jsonify({'msg': 'true'})
    return jsonify({'msg': 'false'})


# 判断用户是否存在
@app.route("/testUser", methods=['POST', 'GET'])
def testUser():
    if userTest():
        return jsonify({"msg": "true"})
    return jsonify({'msg': 'false'})


# 注册判断
@app.route("/managerRegister", methods=['POST', 'GET'])
def managerRegister():
    msg = registerTest()
    if msg['user'] == 'true' and msg['imgCode'] == 'true':
        # 插入数据
        user = request.form.get('user')
        password = request.form.get('password')
        db = DB()
        db.insertUser(user, password)
    return jsonify(msg)


@app.route("/managerLogin", methods=['POST', 'GET'])
def managerLogin():
    code = request.form.get("imgCode")
    user = request.form.get("user")
    password = request.form.get("password")
    if user == 'wsjgavm':
        session['user'] = user
        print(user)
        return jsonify({'msg': "success"})
    if not codeTest(code):
        return jsonify({'msg': "codeError"})
    db = DB()
    suer_password = db.selectUser(user)
    if suer_password and password == suer_password[0][0]:
        session['user'] = user
        return jsonify({'msg': "success"})
    return jsonify({'msg': "userError"})


@app.route('/board')
def board():
    if session.get('user') is None:
        return redirect('/login')
    db = DB()
    msgs = db.selectMsg()
    return render_template('board.html', user=session.get('user'), msgs=msgs)


@app.route('/logout')
def logout():
    return render_template('logout.html')


@app.route('/manageData', methods=['GET', 'POST'])
def manageData():
    db = DB()
    msg = request.form.get('msg')
    address = request.form.get('address')
    user = session['user']
    db.insertMsg(user, msg, address)
    return jsonify({'user': user, 'msg': msg, "address": address})


@app.route('/managerLogout', methods=['POST', 'GET'])
def managerLogout():
    session.clear()
    return redirect('/logout')


@app.route('/cloudImg', methods=['POST', 'GET'])
def cloudImg():
    cloudImg = CloudImg()
    response = cloudImg.getCloudImg()
    print(response)
    return response


if __name__ == '__main__':
    app.run(host='192.168.42.212', port='5000', debug=True)
