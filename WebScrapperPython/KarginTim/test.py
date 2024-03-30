url = 'https://www.packtpub.com/media/catalog/product/cache/aefcd4d8d5c59ba860378cf3cd2e94da/b/0/b07896_mockupcover.png'
 
# downloading with urllib
 
# imported the urllib library
import urllib
 
# Copy a network object to a local file
urllib.urlretrieve(url, "python.png")
 
 
# downloading with requests
 
# import the requests library
import requests
 
 
# download the url contents in binary format
r = requests.get(url)
 
# open method to open a file on your system and write the contents
with open("python1.png", "wb") as code:
    code.write(r.content)