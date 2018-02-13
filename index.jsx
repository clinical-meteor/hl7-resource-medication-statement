

import MedicationStatementsPage from './client/MedicationStatementsPage';
import MedicationStatementsTable from './client/MedicationStatementsTable';
import { MedicationStatement, MedicationStatements, MedicationStatementSchema } from './lib/MedicationStatements';

var DynamicRoutes = [{
  'name': 'MedicationStatementsPage',
  'path': '/medication-statements',
  'component': MedicationStatementsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Medication Statements',
  'to': '/medication-statements',
  'href': '/medication-statements'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  MedicationStatementsPage,
  MedicationStatementsTable,

  MedicationStatement,
  MedicationStatements,
  MedicationStatementSchema
};


