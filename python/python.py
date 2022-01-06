from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
from typing import Collection

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    array = ["hi","hello","await","bye","word"]

    def do_GET(words):
        words.send_response(200)
        words.send_header('Content-type', 'text/html')
        words.end_headers()
        print(words.array)

        for i in words.array:
            words.wfile.write(i.encode()+" ".encode())
        

    def do_POST(words):
        content_length = int(words.headers['Content-Length'])
        body = words.rfile.read(content_length)
        words.send_response(200)
        words.send_header('Content-type', 'text/html')
        words.end_headers()
        response = BytesIO()

        response.write(b'This is POST request. ')
        response.write(b'Received: ')
        response.write(body)
        words.array.append(str(body.decode()))
        words.array.pop(0)
        words.wfile.write(response.getvalue())

        for i in words.array:
            words.wfile.write(i.encode()+" ".encode())
            print(words.array)

httpd = HTTPServer(('localhost', 1111), SimpleHTTPRequestHandler)
httpd.serve_forever()