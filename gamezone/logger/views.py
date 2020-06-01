from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Avg,Sum,Min,Max,Count,FloatField,Q,F,Subquery,OuterRef,IntegerField
from .models import Author,Book,Product,Order,Invoice
from django.contrib.auth.models import User

def index(request):

    # book = Book.objects.values('author__name').annotate(total=Sum('price'))
    # # product = Product.objects.filter(name__icontains='co').order_by('price')
    # item_sum = Sum(F('quantity') * F('unit_price'), output_field=FloatField())
    # items = Invoice.objects.filter(order__status='complete')
    # product_ids = items.values_list('product_id',flat=True).distinct()
    # product = Product.objects.in_bulk(product_ids)
    # print([item for key,item in product.items()])
    # total = Invoice.objects.annotate(pre_total=item_sum,pre_count = Count('product'))

    # order_buyer = Order.objects.all().select_related('buyer')

    # data = {
    #     'book':book,
    #     'product':[item for key,item in product.items()],
    #     'total':total,
    #     'order_buyer':order_buyer
    # }

    book = Book.objects.prefetch_related('author').annotate(total = F('price')* F('price'))[:10]

    #book = Book.objects.all().prefetch_related('author').order_by('created_at')[:50]
    author = Author.objects.all().annotate(total_price=Sum('book__price'),total_book=Count('book')).order_by('created_at')
    # .annotate(book_own=Count('book'))

    # print(author)


    user = User.objects.annotate(latest_order = Subquery(
        Order.objects.filter(buyer=OuterRef('pk'),).order_by('-ordered_at').values('ordered_at')[:1]
    ))

    # order = Order.objects.filter(total__gte=40,status='paid')

    order = Order.objects.filter(total__gte=40,status='paid').aggregate(total=Count('transaction'))

    # user = Order.objects.filter(buyer=1)

    price  = Product.objects.filter(price__gte=90)

    P2F_ACCESS = User.objects.filter(order__buyer__username='Russell Yang').distinct().annotate(total= Count('order')) #Fpreign key value access for parent 

    print(P2F_ACCESS)

    data = {
        'book':book,
        'author':author,
        'user':user,
        'order':order,
        'price':price,
        'P2F_ACCESS':P2F_ACCESS
    }

    return render(request,'home.html',{'data':data})
