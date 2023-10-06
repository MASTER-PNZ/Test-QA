describe('Google Homepage Critical', () => {
  beforeEach(() => {
    cy.visit('https://google.com');
  })

  it('Test Case 1: URL Search', () => {
    cy.get('[aria-label="Search"]').type('www.sweetmarias.com');
    cy.get('input[value="Google Search"]').first().click({ force: true });
    cy.get('#search a')
      .invoke('attr', 'href').should('contain', 'https://www.sweetmarias.com/');
  })

  it('Test Case 2: Text Search', () => {
    cy.get('[aria-label="Search"]').type('Miles Davis');
    cy.get('input[value="Google Search"]').first().click({ force: true });
    cy.get('[data-attrid="title"]').should('contain', 'Miles Davis');
  })

  it('Test Case 3: Lucky Button', () => {
    cy.get('[class="gbqfba gbqfba-hvr"]').trigger('mouseover', { force: true }, { timeout: 2000 });
    cy.wait(1000);
    cy.get('[class="gbqfba gbqfba-hvr"]')
      .invoke('attr', 'aria-label')
      .then((value1) => {
        // refresh to get new value
        // mouseover button which changes the text
        cy.reload();
        cy.wait(1000);
        cy.get('[class="gbqfba gbqfba-hvr"]').trigger('mouseover', { force: true }, { timeout: 2000 });
        cy.wait(2000);
        // grab the button again and compare its previous text
        // to the current text
        cy.get('[class="gbqfba gbqfba-hvr"]')
          .invoke('attr', 'aria-label')
          .should((value2) => {
            expect(value1).not.to.eq(value2);
          })
      })
  })

  it('Test Case 4: Trending Search', () => {
    cy.get('[id="APjFqb"]').click();
    cy.get('.lnnVSe').first()
      .invoke('attr', 'aria-label')
      .then((value1) => {
        // refresh to get new value
        // click into search again which changes the trending results
        cy.reload();
        cy.wait(1000);
        cy.get('[id="APjFqb"]').click();
        cy.wait(2000);
        // grab the trending value again and compare its previous text
        // to the current text
        cy.get('.lnnVSe').first()
          .invoke('attr', 'aria-label')
          .should((value2) => {
            expect(value1).not.to.eq(value2);
          })
      })
  })

  it('Test Case 5: Advanced Search', () => {
    cy.get('[jsname="LgbsSe"]').click({ force: true });
    cy.get('[href="/advanced_search?hl=en&fg=1"]').click({ force: true });
    // all these words
    cy.get('[name="as_q"]').type('Paul Keesling Percussion');
    // exact phrase
    cy.get('[name="as_epq"]').type('Signature Theatre');
    // none of these words
    cy.get('[name="as_eq"]').type('"The Org"');
    // range of dates
    cy.get('[name="as_nlo"]').type('2012');
    cy.get('[name="as_nhi"]').type('2018');   
    cy.get('[value="Advanced Search"]').click();
    cy.get('#search a')
      .invoke('attr', 'href').should('contain', 'https://paulkeesling.files.wordpress.com/2013/09/pauls-cv.pdf');
  })

})
