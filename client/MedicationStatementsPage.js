import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import MedicationStatementDetail from './MedicationStatementDetail';
import MedicationStatementsTable from './MedicationStatementsTable';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

Session.setDefault('fhirVersion', 'v1.0.2');
Session.setDefault('selectedMedicationStatementId', false);

export class MedicationStatementsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('medicationStatementPageTabIndex'),
      medicationStatementSearchFilter: Session.get('medicationStatementSearchFilter'),
      selectedMedicationStatementId: Session.get('selectedMedicationStatementId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedMedicationStatement: false
    };

    if(Session.get('fhirVersion')){
      data.fhirVersion = Session.get('fhirVersion')
    }

    if (Session.get('selectedMedicationStatementId')){
      data.selectedMedicationStatement = MedicationStatements.findOne({_id: Session.get('selectedMedicationStatementId')});
    } else {
      data.selectedMedicationStatement = false;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('medicationStatementPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedMedicationStatement', false);
    Session.set('medicationStatementFormUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In MedicationStatementsPage render');
    return (
      <div id='medicationStatementsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Medication Statements' />
            <CardText>
              <Tabs id="medicationStatementsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newMedicationStatementTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <MedicationStatementDetail 
                 id='newMedicationStatement' 
                 fhirVersion={ this.data.fhirVersion }
                 />  
               </Tab>
               <Tab className="medicationStatementListTab" label='MedicationStatements' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <MedicationStatementsTable fhirVersion={ this.data.fhirVersion } />
               </Tab>
               <Tab className="medicationStatementDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <MedicationStatementDetail 
                  id='medicationStatementDetails'
                  fhirVersion={ this.data.fhirVersion }
                  medicationStatement={ this.data.selectedMedicationStatement }
                  medicationStatementId={ this.data.selectedMedicationStatementId } 
                  showDatePicker={true} 
                />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(MedicationStatementsPage.prototype, ReactMeteorData);

export default MedicationStatementsPage;