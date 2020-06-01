import os,django
import requests,json,random

os.environ.setdefault('DJANGO_SETTINGS_MODULE','leadmanager.settings')
django.setup()

from query_test.models import Book,Author
from faker import Faker

def author_gen():
    fake = Faker()
    name = fake.name()
    s = Author.objects.get_or_create(name=name)[0]
    s.save()
    return s


def abc(N):
    fake = Faker()
    for _ in range(N):
        author = author_gen()
        for _ in range(N):
            title = fake.sentence()
            author = author
            price = fake.pyfloat(2)
            Book.objects.create(title=title,author=author,price=price)


def login():

    headers = {}

    headers['Content-Type'] = 'application/json'

    # headers['Authorization'] = "JWT "+ token

    data = {'username':'demo','password':'jnj'}

    token = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNywidXNlcm5hbWUiOiJkZW1vIiwiZXhwIjoxNTg5MTEyODI5LCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwib3JpZ19pYXQiOjE1ODkxMTI1Mjl9.e1z-dR9_unSgOF4Xbk48iKuuOcmMW7dYA4C1_QhO2ho"}

   # user = requests.post("http://127.0.0.1:8000/api/login/",data=json.dumps(data),headers=headers)

    print(json.dumps(data))

    user = requests.post("http://127.0.0.1:8000/api/jwt/refresh",data=json.dumps(token),headers=headers)


    print(user.text)

def get_lead():


    headers = {}

    headers['content-type'] = 'application/json'

    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNywidXNlcm5hbWUiOiJkZW1vIiwiZXhwIjoxNTg5MTExOTMwLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwib3JpZ19pYXQiOjE1ODkxMTE2MzB9.YuUd1Y4LYB7Bsu7qpcsNcvte8fGrXSFOCCjsaKYePnY"

    headers['Authorization'] = "JWT "+ token

    data = requests.get("http://127.0.0.1:8000/api/lead/",headers=headers)

    print(data.text)


abc(10)