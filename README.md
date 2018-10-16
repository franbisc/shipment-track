# shipment-track
This Node.js script allows to call an url/endpoint with courier and package information and obtain the shipment status.

The possible couriers (Italian territory) are:<br>
 TNT --> 'TNT-ITA'<br>
 UPS --> 'UPS'<br>
 DHL --> 'DHL'<br>
 GLS --> 'GLS-ITA'<br>
 SDA --> 'SDA'<br>
 BRT --> 'BRT'<br>
 PosteItaliane --> 'PTI'<br>
 
 I lean on the web page www.rintraccialamiaspedizione.it which provide the users informations about their shipments. This informations are rendered in a page in a graphic table, and this table is dynamic and could have different number/type of rows.
 
 The script parses the web page and through <b>web scraping</b> retrieves informations about the shipment, and uses cheerio to scrape and extract the needed data and return them as a JSON string.
