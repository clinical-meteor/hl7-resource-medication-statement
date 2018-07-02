describe('clinical:hl7-resources-medication-statements', function () {
  var server = meteor();
  var client = browser(server);

  it('MedicationStatements should exist on the client', function () {
    return client.execute(function () {
      expect(MedicationStatements).to.exist;
    });
  });

  it('MedicationStatements should exist on the server', function () {
    return server.execute(function () {
      expect(MedicationStatements).to.exist;
    });
  });

});
