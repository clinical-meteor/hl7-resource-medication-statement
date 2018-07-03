## clinical:hl7-resource-medication-statement

#### Licensing  
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


#### Integration & Verification Tests  
[![CircleCI](https://circleci.com/gh/clinical-meteor/hl7-resource-medication-statement/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/hl7-resource-medication-statement/tree/master)


#### API Reference  
The resource in this package implements Medication Statement resource schema, specified at [https://www.hl7.org/fhir/DSTU2/medicationstatement.html](https://www.hl7.org/fhir/DSTU2/medicationstatement.html). 



#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-medication-statement-statement

# to initialize default data
INITIALIZE=true meteor
````


#### Example   

```js
var statement = {}
MedicationStatements.insert(statement);
```


#### Extending the Schema

```js
ExtendedMedicationStatementSchema = new SimpleSchema([
  MedicationStatementSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
MedicationStatements.attachSchema( ExtendedMedicationStatementSchema );
```


#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).



#### Acknowledgements     

Many thanks to DxRx Medical, NY Methodist Hospital, and the New Orleans Pharmacy Museum for research and studies conducted in support of this library.  