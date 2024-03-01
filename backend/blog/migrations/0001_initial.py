# Generated by Django 3.2.12 on 2024-02-29 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('publication_date', models.DateField()),
                ('description', models.TextField()),
                ('body_text', models.TextField()),
            ],
        ),
    ]
