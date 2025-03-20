// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('Lucas', { delay: 100 })
    cy.get('#lastName').type('Ferreira', { delay: 100 })
    cy.get('#email').type('lucas.ferreira@example.com', { delay: 100 })
    cy.get('#open-text-area').type('Ótimo atendimento, parabéns!', { delay: 100 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
})

Cypress.Commands.add('PhoneNumber', () => {
    cy.get('#phone')
      .type('123456789')
      .should('have.value', "123456789")

    cy.get('#phone')
      .clear()
      .type('abcedefg')
      .should('have.value', '') 

    cy.get('#phone') 
      .clear()
      .type('abc123') 
      .should('have.value', '123') 
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitconst', data => {
    cy.get('#firstName').type(data.firstName, { delay: 100 })
    cy.get('#lastName').type(data.lastName, { delay: 100 })
    cy.get('#email').type(data.email, { delay: 100 })
    cy.get('#open-text-area').type(data.text, { delay: 100 })
    cy.contains('button', 'Enviar').click() 

    cy.get('.success').should('be.visible')
})