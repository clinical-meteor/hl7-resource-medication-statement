
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
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "informationSource" : {
    optional: true,
    type: ReferenceSchema
  },
  "dateAsserted" : {
    optional: true,
    type: Date
  },
  "status" : {
    optional: true,
    type: String
  },
  "wasNotTaken" : {
    optional: true,
    type: Boolean
  },
  "reasonNotTaken" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },

  "reasonForUseCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reasonForUseReferenceSchema" : {
    optional: true,
    type: ReferenceSchema
  },

  "effectiveDateTime" : {
    optional: true,
    type: Date
  },
  "effectivePeriodSchema" : {
    optional: true,
    type: PeriodSchema
  },
  "note" : {
    optional: true,
    type: String
  },
  "supportingInformation" : {
    optional: true,
    type: [ ReferenceSchema ]
  },

  "medicationCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "medicationReferenceSchema" : {
    optional: true,
    type: ReferenceSchema
  },

  "dosage.$.text" : {
    optional: true,
    type: String
  },
  "dosage.$.timing" : {
    optional: true,
    type: TimingSchema
  },

  "dosage.$.asNeededBoolean" : {
    optional: true,
    type: Boolean
  },
  "dosage.$.asNeededCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },

  "dosage.$.siteCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "dosage.$.siteReferenceSchema" : {
    optional: true,
    type: ReferenceSchema
  },
  "dosage.$.route" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "dosage.$.method" : {
    optional: true,
    type: CodeableConceptSchema
  },

  "dosage.$.quantityQuantity" : {
    optional: true,
    type: QuantitySchema
  },
  "dosage.$.quantityRange" : {
    optional: true,
    type: RangeSchema
  },

  "dosage.$.rateRatio" : {
    optional: true,
    type: RatioSchema
  },
  "dosage.$.rateRange" : {
    optional: true,
    type: RangeSchema
  },
  "dosage.$.maxDosePerPeriodSchema" : {
    optional: true,
    type: RatioSchema
  }

});

MedicationStatements.attachSchema(MedicationStatementSchema);
