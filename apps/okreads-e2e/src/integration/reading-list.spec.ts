describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: finished button in book search page should be visible after clicking on finish in reading list ', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('[data-testing="click-search-icon"]').click();
    cy.wait(500)
    cy.get('[data-testing="button-to-make-read-9U5I_tskq9MC"]').should('be.visible').click() // button will be disabled after clicking 
   cy.get('[data-testing="toggle-reading-list"]').click();
   cy.get('[ data-tesing="finished-button"]').click(); // finished button from reading list is clicked
   cy.get('[ data-tesing="finished-button-main-page"]').should('be.visible') // finished button is now visible in book search page
  
  });
});
