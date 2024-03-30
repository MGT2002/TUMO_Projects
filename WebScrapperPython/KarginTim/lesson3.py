from bs4 import BeautifulSoup
import urllib2

dates = []
prices = []
descriptions = []
names = []
hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
	'Accept-Encoding': 'none',
	'Accept-Language': 'en-US,en;q=0.8',
	'Connection': 'keep-alive'}
j = 1000
for i in range(84, 85):
	url = "https://www.packtpub.com/all-products/all-books?page=" + str(i)	
	req = urllib2.Request(url, headers=hdr)
	page = urllib2.urlopen(req)
	soup_packtpage = BeautifulSoup(page, features="html.parser")

	# myFile = open('pages/page' + str(i) + '.html', 'w')
	# myFile.write(str(soup_packtpage))
	# myFile.close()

	books = soup_packtpage.findAll(attrs = {'class' : "product details product-item-details"})

	for i in range(len(books)):
		dates.append(books[i].div.string)
		prices.append(books[i].div.find_next_sibling().span.span.span.string)
		names.append(books[i].strong.string)
		descriptions.append((books[i].div.find_next_sibling()).find_next_sibling().string)

		img_url = books[i].find_previous_sibling().div.a.img['src']
		img_req = urllib2.Request(img_url, headers=hdr)
		img = urllib2.urlopen(img_req)
		myFile = open('images/img' + str(j) + '.png', 'w')
		myFile.write(img.read())
		myFile.close()
		j+=1

def info(number):
	print(dates[number])
	print(prices[number])
	print(names[number])
	print(descriptions[number])
	
#info(84)



