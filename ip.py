# https://stackoverflow.com/questions/166506/finding-local-ip-addresses-using-pythons-stdlib
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip = s.getsockname()[0]
s.close()

port = 8080 # Might be 8000 for you, depends on what the server is listening on

info = {"id": ip, "port": port}

# Creates the file for us to know where to connect to
with open("ip.txt", "w") as f:
    f.write(str(info))