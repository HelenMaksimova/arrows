from django.core.management.base import BaseCommand
from users.models import ArrowsUser


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)
        parser.add_argument('-sn', nargs='?', default='django')
        parser.add_argument('-sp', nargs='?', default='geekbrains')
        parser.add_argument('-se', nargs='?', default='super@user.com')
        parser.add_argument('--recreate_su', action='store_true')

    def handle(self, *args, **options):
        super_user = ArrowsUser.objects.filter(is_superuser=True)
        if super_user:
            if options.get('recreate_su'):
                super_user.delete()
                self.create_superuser(options.get('sn'),
                                      options.get('sp'),
                                      options.get('se'))
            else:
                super_user = super_user.first()
                print(f'superuser {super_user} already exists. For recreate superuser use command with --recreate_su')
        else:
            self.create_superuser(options.get('sn'),
                                  options.get('sp'),
                                  options.get('se'))

        ArrowsUser.objects.filter(is_superuser=False).delete()
        self.create_users(options.get('count', 5))
        print('complete')

    @staticmethod
    def create_users(count):
        for idx in range(count):
            user = ArrowsUser.objects.create_user(
                username=f'user{idx}',
                password=f'passtest{idx}',
                first_name=f'John{idx}',
                last_name=f'Dew{idx}',
                email=f'email{idx}@mail.com')
            print(f'user {user} created')

    @staticmethod
    def create_superuser(username, password, email):
        super_user = ArrowsUser.objects.create_superuser(
            username=username,
            password=password,
            email=email,
            is_superuser=True,
            is_staff=True)
        print(f'superuser {super_user} created')
