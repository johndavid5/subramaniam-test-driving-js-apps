JDA, 6/1/2017:
  Too bad the Yahoo finance REST API has been discontinued
  some time in 2016, Venkat...although it does appear
  if you're up to it, you can go to
https://finance.yahoo.com/quote/GOOG?p==GOOG
  and parse out the HTML output...

Also there is a Python module that passes
cookie crumbs to the finance API and gets
it to work.

I think I'll try scraping the HTML at...
  https://finance.yahoo.com/quote/GOOG?p==GOOG
...using... 
  https://www.npmjs.com/package/htmlparser2
...except that it's using React to generate
the page so you'd need to scrape an actual
or headless browser via Selenium or something...

How about just creating our own fake-o
node.js finance server...?

Or use this Yahoo Finance Data node module...
...(after setting up your API key at https://developer.yahoo.com/apps/create/) 
https://www.npmjs.com/package/yahoo-finance-data
