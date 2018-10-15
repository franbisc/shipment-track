# shipment-track
This script is just an exercise involving web scraping: it allows to call an url/endpoint with courier and package information and obtain the shipment status

The possible couriers (Italian territory) are:
 TNT --> 'TNT-ITA'
 UPS --> 'UPS'
 DHL --> 'DHL'
 GLS --> 'GLS-ITA'
 SDA --> 'SDA'
 BRT --> 'BRT'
 PosteItaliane --> 'PTI'
 
 I lean on the web page www.rintraccialamiaspedizione.it which provide the users informations about their shipments. This informations are rendered in a page in a graphic table, and this table is dynamic and could have different number/type of rows.
 
 The script parses the web page with informations about the shipment, and uses cheerio to scrape and extract the needed data and return them as a JSON string.
