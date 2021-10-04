const { isExportDeclaration } = require('typescript')
const { Section1 } = require('../objects/section-1')

describe('Problem 1', () => {
  /**
   * Example:
   * To access assertSampleApiResponse() from Section1, you can do: Section1.actions.assertSampleApiResponse();
   *
   * Test away!
   */
  /*//Vist Alayacare website
  it('Visits the Alayacare website', () => {
    cy.visit('https://alayacare.com/')

  })*/
  
  //visit localhost section-1
  it('Visits the localhost', () => {
    cy.visit('http://localhost:8080/section-1')
  })

  //testing for text containing DOM interactions
  it('Tests the visibility- hidden of table', () => {
    cy.contains('DOM interactions');
  
  //Testing to check if the table is not visible
    cy.get('#alaya-table').should('be.hidden');
  })

  it('Click the toggle button and check visibility', () => {
  //Clicking the button - Show table
    cy.get('.table-toggle-button').click();

  //Testing to check if the table is visible after button click
    cy.get('table').should('be.visible');

  })

  it('Check number of colums', () => {
  //Testing to check if there are 5 table columns
    cy.get('#alaya-table').find('.table-header>th').should('have.length', 5);
  })

  it('Check number of rows excluding header', () => {
  //Testing to check if there are 10 rows excluding header
    cy.get('#alaya-table').find('tr:not(:first)').should('have.length', 10);
  })

  //Testing to see that atleast 5 entries have the role user
  it('Counts Role entries with value: user', () => {
    let count=0;
    cy.get('#alaya-table').get("th:nth-child(5)")
      .each(($role, index, $Table) => {
        const text = $role.text();
        if (text.includes("user")) {
          count += 1;
          }
      })
      .then(($Table) => {
        expect(count).to.be.greaterThan(4);
      })
  })

  //Testing to check if there are exactly 3 people over 60 years 
  it('Counts number of people over 60years', () => {
    let count=0;
    let now = new Date();
    cy.get('#alaya-table').get("th:nth-child(4)")
      .each(($age, index, $Table) => {
        var bDate = new Date($age.text()); //birth date
        var age = now.getFullYear() - bDate.getFullYear(); //calculate age by years
      if (age >= 60){
        count += 1;
      }
      //if not 3 by year, check by months and days by using .getMonth() and .getDate() methods
      })
    .then(($Table) => {
      expect(count).to.be.equal(3);
    })
  })
})
