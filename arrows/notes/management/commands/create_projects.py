from django.core.management.base import BaseCommand
from users.models import ArrowsUser
from notes.models import Project
from random import choices, randint, choice


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)

    def handle(self, *args, **options):
        Project.objects.all().delete()
        for idx in range(options.get('count')):
            repo_url = f'https://github.com/arrows{idx}' if idx % 3 else ''
            participants = ArrowsUser.objects.all()
            participants_count = randint(1, len(participants))
            participants_set = choices(participants, k=participants_count)
            owner = choice(participants_set)
            project = Project.objects.create(
                name=f'Project{idx}',
                repository=repo_url,
                owner=owner
            )
            for participant in participants_set:
                project.participants.add(participant)
            print(f'Project {project} created')
        print('Complete')
