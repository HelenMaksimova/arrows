from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand
from users.models import ArrowsUser


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):

        super_user = ArrowsUser.objects.filter(is_superuser=True)
        if not super_user:
            self.create_superuser()
        else:
            super_user = super_user.first()
            print(f'superuser {super_user} already exists')
            user_answer = input(f'delete superuser and create new superuser (y/n): ').lower()
            if user_answer == 'y':
                super_user.delete()
                self.create_superuser()

        ArrowsUser.objects.filter(is_superuser=False).delete()

        for idx in range(options['count']):
            user = ArrowsUser.objects.create(
                username=f'user_{idx}',
                password=make_password(f'passtest{idx}'),
                first_name=f'John_{idx}',
                last_name=f'Dew_{idx}',
                email=f'email_{idx}@mail.com')
            print(f'user {user} created')

        print('complete')

    @staticmethod
    def create_superuser():
        username = input('Ник суперпользователя: ')
        password = input('Пароль: ')
        email = input('Email: ')
        super_user = ArrowsUser.objects.create(
            username=username,
            password=make_password(password),
            email=email,
            is_superuser=True,
            is_staff=True)
        print(f'superuser {super_user} created')
