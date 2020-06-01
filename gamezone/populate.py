import os,django
import requests,json,random

os.environ.setdefault('DJANGO_SETTINGS_MODULE','gamezone.settings')
django.setup()

from django.contrib.auth.models import User
from logger.models import Book,Author,Product,Order,Invoice
from faker import Faker
import uuid
Faker.seed(4321)

def author_gen(N):
    for _ in range(N):
        fake = Faker()
        name = fake.name()
        Author.objects.create(name=name)


def user_gen(N):
    for _ in range(N):
        fake = Faker()
        name = fake.name()
        User.objects.create(username=name)

def book(N):
    fake = Faker()
    for _ in range(N):
        for _ in range(N):
            p1 = random.randrange(1,21)
            p2 = random.randrange(1,21)
            i1 = Author.objects.get(id=p1)
            i2 = Author.objects.get(id=p2)
            title = fake.sentence()
            price = round(random.uniform(10.10,40.90),2)
            b1 = Book.objects.create(title=title,price=price)
            b1.author.add(i1,i2)
            b1.save()

def product(N):
    fake = Faker()
    for _ in range(N):
        for _ in range(N):
            id = random.randrange(1,12)
            name = fake.sentence()
            seller =  User.objects.get(id=id)
            price = round(random.uniform(10.20,90.90),2)
            Product.objects.create(name=name,seller=seller,price=price)


def order(N):
    fake = Faker()
    for _ in range(N):
        for _ in range(N):
            id = random.randrange(1,12)        
            buyer =  User.objects.get(id=id)
            status = random.choice(['pending','paid','complete'])
            total = round(random.uniform(50.20,150.90),2)
            transaction = uuid.uuid4()
            Order.objects.create(status=status,total=total,buyer=buyer,transaction=transaction)


def invoice(N):
    fake = Faker()
    for _ in range(N):
        for _ in range(N):
            order_id = random.randrange(1,101)        
            product_id = random.randrange(1,101)        
            order =  Order.objects.get(id=order_id)
            product = Product.objects.get(id=product_id)
            quantity = random.randrange(1,50)
            unit_price = round(random.uniform(50.20,550.90),2)
            Invoice.objects.create(order=order,product=product,quantity=quantity,unit_price=unit_price)

# author_gen(20)
# print("Author populate done..........")
# user_gen(10)
# print("User populate done..........")
book(5)
print("Book populate done..........")
product(5)
print("Product populate done..........")
order(10)
print("Order populate done..........")
invoice(10)
print("Invoice populate done..........")
