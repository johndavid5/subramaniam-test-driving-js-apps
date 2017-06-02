REM curl http://ichart.finance.yahoo.com/table.csv?s=GOOG --dump-header h1.out 2>&1 | tee c1.out
REM curl "https://ichart.finance.yahoo.com/table.csv?s=GOOG" --dump-header h1.out 2>&1 | tee c1.out
curl "https://ichart.finance.yahoo.com/table.csv?s=GOOG" --include 2>&1 | tee c1.out
REM curl http://ichart.finance.yahoo.com/table.csv?s=INVALID 2>&1 | tee c2.out
