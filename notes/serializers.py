from rest_framework import serializers
from notes.models import Project, Note

# Пока сложно понять, какой именно вывод для связных объектов потребуется, полагаю, либо id, либо весь объект.
# Но пока что для удобства вывода и ради понимания,как это работает, проставила гиперссылки.
# Ещё немного поэкпериментировала с выводом связных полей (через related_name) в сериализаторы других моделей.
# Всё работает, но может быть я неправильно или неоптимально что-то сделала.


class ProjectModelSerializer(serializers.ModelSerializer):
    users = serializers.HyperlinkedRelatedField('arrowsuser-detail', many=True, read_only=True)
    notes = serializers.HyperlinkedRelatedField('note-detail', many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteModelSerializer(serializers.ModelSerializer):
    project = serializers.HyperlinkedRelatedField('project-detail', read_only=True)
    created_by_user = serializers.HyperlinkedRelatedField('arrowsuser-detail', read_only=True)

    class Meta:
        model = Note
        fields = '__all__'
