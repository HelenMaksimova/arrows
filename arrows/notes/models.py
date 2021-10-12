from django.utils.translation import gettext_lazy as _
from django.db import models
from users.models import ArrowsUser


class Project(models.Model):
    name = models.CharField(max_length=100, verbose_name=_('project name'))
    repository = models.URLField(blank=True, verbose_name=_('link to repository'))
    participants = models.ManyToManyField(ArrowsUser, related_name='projects',
                                          related_query_name='project',
                                          verbose_name=_('project staff'))
    owner = models.ForeignKey(ArrowsUser, on_delete=models.SET_NULL, null=True,
                              related_name='owned_projects',
                              related_query_name='owned_project',
                              verbose_name=_('project staff'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated at'))
    is_active = models.BooleanField(default=True, verbose_name=_('project status'))

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'

    def __str__(self):
        return f'{self.name}_{self.id}'


class Note(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE,
                                related_name='notes', related_query_name='note',
                                verbose_name=_('project'))
    text = models.TextField(verbose_name=_('note text'))
    created_by_user = models.ForeignKey(ArrowsUser, on_delete=models.SET_NULL,
                                        related_name='notes', related_query_name='note',
                                        verbose_name=_('created by'), null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created at'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('updated at'))
    is_active = models.BooleanField(default=True, verbose_name=_('note status'))

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'

    def __str__(self):
        return f'Заметка_{self.id}'
