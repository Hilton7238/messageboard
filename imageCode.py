from io import BytesIO
import random
import string
from PIL import Image, ImageFont, ImageDraw, ImageFilter
from flask import Flask, render_template, session, make_response


class imageCode():
    '''
    验证码处理
    '''

    def rndColor(self):
        '''随机颜色'''
        return random.randint(32, 127), random.randint(32, 127), random.randint(32, 127)

    def geneText(self):
        '''生成4位验证码'''
        return ''.join(random.sample(string.ascii_letters + string.digits, 4))  # ascii_letters是生成所有字母 digits是生成所有数字0-9

    def getVerifyCode(self):
        '''生成验证码图形'''
        code = self.geneText()
        # 图片大小120×50
        width, height = 120, 50
        # 新图片对象
        im = Image.new('RGB', (width, height), 'white')
        # 字体
        font = ImageFont.truetype(r'C:\Users\System-Pc\Desktop\arial.ttf', 40)
        # draw对象
        draw = ImageDraw.Draw(im)
        # 绘制字符串
        for item in range(4):
            draw.text((5 + random.randint(-3, 3) + 23 * item, 5 + random.randint(-3, 3)),
                      text=code[item], fill=self.rndColor(), font=font)
        return im, code

    def getImgCode(self):
        image, code = self.getVerifyCode()
        # 图片以二进制形式写入
        buf = BytesIO()
        image.save(buf, 'jpeg')
        buf_str = buf.getvalue()
        # 把buf_str作为response返回前端，并设置首部字段
        response = make_response(buf_str)
        response.headers['Content-Type'] = 'image/gif'
        # 将验证码字符串储存在session中
        session['imgCode'] = code
        return response

