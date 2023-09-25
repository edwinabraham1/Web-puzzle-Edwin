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

  it('undo adding book into reading list', () => {

    // NOTE : CLEAR ALL READING LIST

    cy.get('input[type="search"]').type('javascript');
    cy.wait(100)
    cy.get('[data-testing="click-search-icon"]').click();
    cy.wait(200)
    cy.get('[data-testing="button-to-make-read-9U5I_tskq9MC"]').should('be.visible').click() // button will be disabled after clicking 
    cy.wait(100)
    cy.contains('undo').should("be.visible").click();
    cy.get('[data-testing="button-to-make-read-9U5I_tskq9MC"]').should('be.visible') // button will be enabled once undo is clicked from Reading List

  });

  it('undo removed book from reading list', () => {

    // NOTE : CLEAR ALL READING LIST

    cy.get('input[type="search"]').type('javascript');
    cy.wait(100)
    cy.get('[data-testing="click-search-icon"]').click();
    cy.wait(200)
    cy.get('[data-testing="button-to-make-read-9U5I_tskq9MC"]').should('be.visible').click() // button will be disabled after clicking 
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-item-from-list"]').click();
    cy.wait(100)
    cy.contains('undo').should("be.visible").click();
    cy.get('[data-testing="button-to-make-read-9U5I_tskq9MC"]').should('be.visible') // button will be enabled once undo is clicked from Reading List

  });
});
