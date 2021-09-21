bid=input('请输入您的竞拍价')
请输入您的竞拍价: 1000

print("您尚未竞拍价为:"+bid+"元")
# 您的竞拍价为: 1000元

threshould = 1100 # threshould为起拍价

if eval(bid) < threshould:
    print("您的竞拍价没有超过起拍价,请重新输入！")

# Traceback(most recent call last):

# File"<ipython-input-16-38c43dc7ed3b>",line 1,in <module>

# TypeError:'<'not supported between instances of 'str'and 'int'