import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { get, has } from 'lodash';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
// import { moment } from 'meteor/momentjs/moment';

const flattenMedicationStatement = function(statement, fhirVersion){
  console.log('flattenMedicationStatement', statement)

  var newRow = {
    '_id': statement._id,
    'medication': '',
    'medicationReference': '',
    'medicationDisplay': '',
    'reasonCodeCode': '',
    'reasonCodeDisplay': '',
    'basedOn': '',
    'effectiveDateTime': '',
    'dateAsserted': null,
    'informationSource': '',
    'subjectDisplay': '',
    'taken': '',
    'reasonCodeDisplay': '',
    'dosage': '',
  };

  // DSTU2
  if(fhirVersion === "v1.0.2"){
    newRow.subjectDisplay = get(statement, 'subject.display');
    // newRow.medicationReference = get(statement, 'medicationReference.reference');
    // newRow.medicationDisplay = get(statement, 'medicationReference.display');
    newRow.medication = get(statement, 'medicationReference.display');
    // newRow.reasonCodeCode = get(statement, 'reasonCode[0].coding[0].code');
    // newRow.reasonCodeDisplay = get(statement, 'reasonCode[0].coding[0].display');
    newRow.identifier = get(statement, 'identifier[0].value');
    newRow.effectiveDateTime = moment(get(statement, 'effectiveDateTime')).format("YYYY-MM-DD");
    newRow.dateAsserted = moment(get(statement, 'dateAsserted')).format("YYYY-MM-DD");
    newRow.informationSource = get(statement, 'informationSource.display');
    newRow.taken = get(statement, 'taken');
    newRow.reasonCodeDisplay = get(statement, 'reasonCode[0].coding[0].display');  
  }

  // STU3
  if(fhirVersion === "v3.0.1"){
    newRow.subjectDisplay = get(statement, 'subject.display');
    newRow.medication = get(statement, 'medicationReference.reference');
    newRow.medication = get(statement, 'medicationReference.display');
    newRow.medication = get(statement, 'medicationCodeableConcept.coding[0].display');
    newRow.identifier = get(statement, 'identifier[0].value');
    newRow.effectiveDateTime = moment(get(statement, 'effectiveDateTime')).format("YYYY-MM-DD");
    newRow.dateAsserted = moment(get(statement, 'dateAsserted')).format("YYYY-MM-DD");
    newRow.informationSource = get(statement, 'informationSource.display');
    newRow.taken = get(statement, 'taken');
    newRow.reasonCodeDisplay = get(statement, 'reasonCode[0].coding[0].display');  
  }


  return newRow;
}

export default class MedicationStatementsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      medicationStatements: [],
      displayToggle: false,
      displayDates: true,
      fhirVersion: 'v1.0.2'
    }

    if(this.props.fhirVersion){
      data.fhirVersion = this.props.fhirVersion;
    }
    
    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }
    if(this.props.data){
      this.props.data.map(function(statement){
        data.medicationStatements.push(flattenMedicationStatement(statement, data.fhirVersion));        
      });
    } else {
      if(MedicationStatements.find().count() > 0){

        MedicationStatements.find().map(function(statement){        
          data.medicationStatements.push(flattenMedicationStatement(statement, data.fhirVersion));
        });
      } else {
        data.medicationStatements = [];        
      }
    }

  
    if(process.env.NODE_ENV === "test") console.log("MedicationStatementsTable[data]", data);
    return data;
  };

  renderTogglesHeader(displayToggle){
    if (displayToggle) {
      return (
        <th className="toggle">toggle</th>
      );
    }
  }
  renderToggles(displayToggle, patientId ){
    if (displayToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
              //style={styles.toggle}
            />
          </td>
      );
    }
  }
  renderDateHeader(displayDates){
    if (displayDates) {
      return (
        <th className='date'>date</th>
      );
    }
  }
  renderDate(displayDates, newDate ){
    if (displayDates) {
      return (
        <td className='dateAsserted'>{ moment(newDate).format('YYYY-MM-DD') }</td>
      );
    }
  }
  rowClick(id){
    Session.set('medicationStatementsUpsert', false);
    Session.set('selectedMedicationStatement', id);
    Session.set('medicationStatementPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.medicationStatements.length; i++) {

      tableRows.push(
        <tr key={i} className="medicationStatementRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.medicationStatements[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.medicationStatements[i]) }
          <td className='medication'>{ this.data.medicationStatements[i].medication }</td>
          <td className='effectiveDateTime'>{ moment(this.data.medicationStatements[i].effectiveDateTime).format("YYYY-MM-DD") }</td>
          <td className='informationSource'>{ this.data.medicationStatements[i].informationSource }</td>
          <td className='subject'>{ this.data.medicationStatements[i].subjectDisplay }</td>
          <td className='taken'>{ this.data.medicationStatements[i].taken }</td>
          <td className='reason'>{ this.data.medicationStatements[i].reasonCodeDisplay }</td>
          <td className='dosage'>{ this.data.medicationStatements[i].dosage }</td>
          { this.renderDate(this.data.displayDates, this.data.medicationStatements[i].dateAsserted) }

        </tr>
      )
    }

    return(
      <Table id='medicationStatementsTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            <th className='medication'>medication</th>
            <th className='effectiveDateTime'>date /time</th>
            <th className='informationSource'>source</th>
            <th className='subject'>subject</th>
            <th className='taken'>taken</th>
            <th className='reason'>reason</th>
            <th className='dosage'>dosage</th>
            { this.renderDateHeader(this.data.displayDates) }            
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(MedicationStatementsTable.prototype, ReactMeteorData);
