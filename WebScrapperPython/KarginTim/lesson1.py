from bs4 import BeautifulSoup
import urllib2
url = "http://www.packtpub.com/books"
hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
'Accept-Encoding': 'none',
'Accept-Language': 'en-US,en;q=0.8',
'Connection': 'keep-alive'}
req = urllib2.Request(url, headers=hdr)
page = urllib2.urlopen(req)
soup_packtpage = BeautifulSoup(page, features="html.parser")

books = soup_packtpage.findAll(attrs = {'class' : "product details product-item-details"})
dates = []
prices = []
descriptions = []
names = []

for i in range(len(books)):
	dates.append(books[i].div.string)
	prices.append(books[i].div.find_next_sibling().span.span.span.string)
	names.append(books[i].strong.string)
	descriptions.append((books[i].div.find_next_sibling()).find_next_sibling().string)

def info(number):
	print(dates[number])
	print(prices[number])
	print(names[number])
	print(descriptions[number])
	
info(11)



