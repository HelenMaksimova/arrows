from django.core.management.base import BaseCommand
from users.models import ArrowsUser
from notes.models import Project
from random import choices, randint


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)

    def handle(self, *args, **options):
        Project.objects.all().delete()
        for idx in range(options.get('count')):
            repo_url = f'https://github.com/arrows{idx}' if idx % 3 else ''
            users = ArrowsUser.objects.all()
            users_count = randint(0, len(users))
            users_set = choices(users, k=users_count)
            project = Project.objects.create(
                name=f'Project{idx}',
                repository=repo_url
            )
            for user in users_set:
                project.users.add(user)
            print(f'Project with id {project.id} created')
        print('Complete')
