from django.core.management.base import BaseCommand
from users.models import ArrowsUser
from notes.models import Project, Note
from random import choice, randint


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)

    def handle(self, *args, **options):
        Note.objects.all().delete()
        for idx in range(options.get('count')):
            project = choice(Project.objects.all())
            user = choice(ArrowsUser.objects.all())
            text = 'text-text-text-' * randint(1, 20)
            note = Note.objects.create(
                project=project,
                text=text,
                created_by_user=user
            )
            print(f'Note {note} created')
        print('Complete')
