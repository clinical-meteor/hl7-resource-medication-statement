Package.describe({
  name: 'clinical:hl7-resource-medication-statement',
  version: '1.1.0',
  summary: 'HL7 FHIR Resource - MedicationStatement',
  git: 'https://github.com/clinical-meteor/hl7-resource-medication-statement',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.5.0');
  api.use('simple:json-routes@2.1.0');

  api.use('clinical:base-model@1.3.5');
  api.use('clinical:hl7-resource-datatypes@3.0.0');
  api.use('clinical:hl7-resource-bundle@1.3.10');

  api.addFiles('lib/hl7-resource-medication-statement.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  if(Package['clinical:fhir-vault-server']){
    api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
  }
  
  api.export('MedicationStatement');
  api.export('MedicationStatements');
  api.export('MedicationStatementSchema');
});
