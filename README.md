##clinical:hl7-resource-medication-statement

HL7 FHIR Resource - MedicationStatement


===============================
#### Conformance Statement  

The resource in this package implements the FHIR Patient Resource schema provided at  [https://www.hl7.org/fhir/medication-statementstatement.html](https://www.hl7.org/fhir/medication-statementstatement.html).  


===============================
#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-medication-statement

# to initialize default data
INITIALIZE=true meteor
````

===============================
#### Example   

```js
var statement = {}
MedicationStatements.insert(statement);
```

===============================
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



===============================
#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).




===============================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
