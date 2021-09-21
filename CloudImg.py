from io import BytesIO

import jieba
from flask import make_response
from wordcloud import WordCloud
from PIL import Image
import numpy as np
import DBcon


class CloudImg:
    def getCloudImg(self):
        font = r'C:\Windows\Fonts\FZSTK.TTF'
        db = DBcon.DB()
        text = ''
        words = db.getMsg()
        for word in words:
            text += word[0]
        string = ' '.join(jieba.cut(text))
        img = Image.open(r'static/img/cloudBgImg.jpg')
        img_array = np.array(img)
        wc = WordCloud(
            background_color='white',
            width=500,
            height=500,
            mask=img_array,
            font_path=font
        )
        wc.generate_from_text(string)
        wc.to_file(r'static/img/cloudImg.jpg')
        with Image.open(r'static/img/cloudImg.jpg') as cloudImg:
            buf = BytesIO()
            cloudImg.save(buf, 'jpeg')
            buf_str = buf.getvalue()
            # 把buf_str作为response返回前端，并设置首部字段
            response = make_response(buf_str)
            response.headers['Content-Type'] = 'image/gif'
            # 将验证码字符串储存在session中
        return response


