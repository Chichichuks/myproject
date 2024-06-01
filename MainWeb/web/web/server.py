# Импортируем модуль http.server для запуска HTTP-сервера
import http.server
import socketserver

# Задаем порт, на котором будет запущен сервер
PORT = 8000

# Запускаем HTTP-сервер на указанном порту
with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print("Сервер запущен на порту", PORT)
    # Сервер будет работать до тех пор, пока вы не прервёте его выполнение
    httpd.serve_forever()
