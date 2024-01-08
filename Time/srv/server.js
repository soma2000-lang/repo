const cds = require('@sap/cds');
const odatav2adapterproxy = require('@sap/cds-odata-v2-adapter-proxy');

cds.on('bootstrap', app => {
    // if (cds.env.requires?.ECEmploymentInformation?.credentials?.authentication === "BasicAuthentication") {
    //     const credentials = process.env;
    //     cds.env.requires.ECEmploymentInformation.credentials.url = credentials.base_url;
    //     cds.env.requires.ECEmploymentInformation.credentials.username = credentials.username;
    //     cds.env.requires.ECEmploymentInformation.credentials.password = credentials.password;
    // }
    // if (cds.env.requires?.ECTimeOff?.credentials?.authentication === "BasicAuthentication") {
    //     const credentials = process.env;
    //     cds.env.requires.ECTimeOff.credentials.url = credentials.base_url;
    //     cds.env.requires.ECTimeOff.credentials.username = credentials.username;
    //     cds.env.requires.ECTimeOff.credentials.password = credentials.password;
    // }
   
    app.use(odatav2adapterproxy())
});

module.exports = cds.server;