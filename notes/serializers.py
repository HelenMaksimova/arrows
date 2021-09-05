from rest_framework import serializers
from notes.models import Project, Note
from users.serializers import ArrowsUserModelSerializer

# Пока сложно понять, какой именно вывод для связных объектов потребуется, полагаю, либо id, либо весь объект.
# Но пока что для удобства вывода и ради понимания,как это работает, проставила гиперссылки.
# Ещё немного поэкпериментировала с выводом связных полей (через related_name) в сериализаторы других моделей.
# Всё работает, но может быть я неправильно или неоптимально что-то сделала.


class ProjectModelSerializer(serializers.ModelSerializer):
    users = ArrowsUserModelSerializer(many=True)
    notes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(serializers.ModelSerializer):
    project = ProjectModelSerializer()
    created_by_user = ArrowsUserModelSerializer()

    class Meta:
        model = Note
        fields = '__all__'
