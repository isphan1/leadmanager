# Generated by Django 3.0.6 on 2020-05-25 01:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logger', '0005_auto_20200525_0124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(max_length=20),
        ),
    ]
