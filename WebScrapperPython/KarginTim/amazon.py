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

for i in range(1, 2):
	if(i == 1):
		url = "https://www.amazon.com/s?k=all+books&i=stripbooks-intl-ship&rh=p_n_availability%3A2245265011&lo=list&dc&qid=1559742197&rnid=2245264011&ref=sr_pg_1"	
	else:
		url = "https://www.amazon.com/s?k=all+books&i=stripbooks-intl-ship&rh=p_n_availability%3A2245265011&lo=list&dc&page="+str(i)+"&qid=1559742188&rnid=2245264011&ref=sr_pg_"+str(i)
	req = urllib2.Request(url, headers=hdr)
	page = urllib2.urlopen(req)
	soup_packtpage = BeautifulSoup(page, features="html.parser")

	# myFile = open('amazonPages/page' + str(i) + '.html', 'w')
	# myFile.write(str(soup_packtpage))
	# myFile.close()

	books = (soup_packtpage.find(attrs = {'class' :"s-result-list s-search-results sg-row"}))
	print(soup_packtpage.find(attrs = {'class' :"s-result-list s-search-results sg-row"}))
	# for i in range(16):
	# 	book = 
	# 	print(book)

def info(number):
	print(dates[number])
	print(prices[number])
	print(names[number])
	print(descriptions[number])
	
#info(54)



