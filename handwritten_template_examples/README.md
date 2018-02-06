This folder is for prototyping page layouts and backends by hand. The handwritten code will be converted to templates.

### static-frontend ###
The html that is served by all of the backends that don't automatically generate their frontends
* scripts/3rd_party: all of puppeteer's dependencies
* puppetter-generated.js: this is the generated javascript supporting the application specific widgets and interactions with the server
* puppeteer.js: this is the common puppeteer frontend javascript, initializes and invokes the generated javascript
* index.html: the generated html
* puppeteer.css: common puppeteer style

### nodejs-backend ###
A puppeteer backend written in Node.js. To run, run "node server.js" in the nodejs-backend directory. Puppeteer website will be at http://127.0.0.1
* server.js: the application logic, this initializes puppeteer and the would be where the control logic lives
* puppeteer.js: the common puppeteer module, initilizes the generated code
* puppeteer_data_model.js: the data classes/interfaces used by puppeteer
* puppeteer_generated_data.js: this contains all of the application specific data definitions, this file will be generated from the data model yaml file