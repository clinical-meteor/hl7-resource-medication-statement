
// create the object using our BaseModel
MedicationStatement = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
MedicationStatement.prototype._collection = MedicationStatements;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
MedicationStatements = new Mongo.Collection('MedicationStatements');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
MedicationStatements._transform = function (document) {
  return new MedicationStatement(document);
};


if (Meteor.isClient){
  Meteor.subscribe("MedicationStatements");
}

if (Meteor.isServer){
  Meteor.publish("MedicationStatements", function (argument){
    if (this.userId) {
      return MedicationStatements.find();
    } else {
      return [];
    }
  });
}



MedicationStatementSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "MedicationStatement"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "basedOn" : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  "partOf" : {
    optional: true,
    type: [ ReferenceSchema ]
  },  
  "context" : {
    optional: true,
    type: ReferenceSchema
  },
  "status" : {
    optional: true,
    type: String,
    allowedValues: ['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold'],
    defaultValue: 'active'
  },
  "category" : {
    optional: true,
    type: CodeableConcept
  },  
  "medicationCodeableConcept" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "medicationReference" : {
    optional: true,
    type: ReferenceSchema
  },
  "effectiveDateTime" : {
    optional: true,
    type: Date
  },
  "effectivePeriod" : {
    optional: true,
    type: PeriodSchema
  },
  "dateAsserted" : {
    optional: true,
    type: Date
  },
  "informationSource" : {
    optional: true,
    type: ReferenceSchema
  },
  "subject" : {
    optional: true,
    type: ReferenceSchema
  },
  "derivedFrom" : {
    optional: true,
    type: [ReferenceSchema]
  },
  "taken" : {
    optional: true,
    type: String,
    allowedValues: ['y', 'n', 'unk', 'na'],
    defaultValue: 'y'
  },
  "reasonNotTaken" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "reasonCode" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "note" : {
    optional: true,
    type: [ Annotation ]
  },
  "dosage" : {
    optional: true,
    blackbox: true,
    type: [ Object ]
  }
});

MedicationStatements.attachSchema(MedicationStatementSchema);
