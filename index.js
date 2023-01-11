const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csv = require('fast-csv')
let testeeeee = []


fs.createReadStream('./texto.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', async data => {
    let resultado = testeeeee.filter((dat) => dat.dat !== "leadId" && dat.dat !== "consultorLead" && dat.dat !== "consultorProposta" && dat.dat !== "coordenadorSDR" && dat.dat !== "coordenadorIS" && dat.dat !== "gerenteComercial")
    console.log(data)


    const chamado = "CRED-01_"
    const csvWriter = createCsvWriter({
      path: `./${chamado}leads.csv`,
      delimiter: ';',
      header: [
        { id: 'leadId', title: 'leadId' },
        { id: 'consultorLead', title: 'consultorLead' },
        { id: 'consultorProposta', title: 'consultorProposta' },
        { id: 'coordenadorSDR', title: 'coordenadorSDR' },
        { id: 'coordenadorIS', title: 'coordenadorIS' },
        { id: 'gerenteComercial', title: 'gerenteComercial' },
      ]
    });
    let dataString = resultado.toString();
    let dataFormated = dataString.split(";")
    let records = dataFormated
    /* console.log(resultado) */
    /* for (let i = 0; i < testeeeee.length; i++) {
      records
    } */
    csvWriter.writeRecords(records)
      .then(() => {
        records.forEach(record => {
          testeeeee.push({ record });
        })
        /* console.log(testeeeee) */
        console.log('...Done');
      });
  })
