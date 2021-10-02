import requests

response = requests.post(
    'http://127.0.0.1:8000/api/token-auth/',
    data={
        'username': 'django',
        'password': 'geekbrains'
    }
)

print('Получение обычного токена:')
print(response.status_code)
for key, value in response.json().items():
    print(f'{key}: {value}')

print('\nПолучение JWT токена:')
response = requests.post(
    'http://127.0.0.1:8000/api/token/',
    data={
        'username': 'django',
        'password': 'geekbrains'
    }
)
print(response.status_code)
data = response.json()
for key, value in data.items():
    print(f'{key}: {value}')

refresh_token = data.get('refresh')

print('\nОбновление JWT токена:')
response = requests.post(
    'http://127.0.0.1:8000/api/token/refresh/',
    data={
        'refresh': refresh_token
    }
)
print(response.status_code)
for key, value in response.json().items():
    print(f'{key}: {value}')

