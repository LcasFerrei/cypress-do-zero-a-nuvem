describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Lucas', { delay: 100 })
    cy.get('#lastName').type('Ferreira', { delay: 100 })
    cy.get('#email').type('lucas.ferreira@example.com', { delay: 100 })
    cy.get('#open-text-area').type('Ótimo atendimento, parabéns!', { delay: 100 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Lucas', { delay: 100 })
    cy.get('#lastName').type('Ferreira', { delay: 100 })
    cy.get('#email').type('lucas.ferreira@exa', { delay: 100 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible') // Verifica se a mensagem de erro aparece
  })

  it('validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
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

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Lucas', { delay: 100 })
    cy.get('#lastName').type('Ferreira', { delay: 100 })
    cy.get('#email').type('lucas.ferreira@example.com', { delay: 100 })
    cy.get('#open-text-area').type('Teste de telefone obrigatório', { delay: 100 })
    
    // Marcar o telefone como obrigatório
    cy.get('#phone-checkbox').check()
    
    // NÃO preencher o telefone
  
    cy.contains('button', 'Enviar').click() // Enviar o formulário
  
    // Verificar se a mensagem de erro aparece
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Lucas')
    .should('have.value', 'Lucas')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('Ferreira')
    .should('have.value', 'Ferreira')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('lucas.ferreira@example.com')
    .should('have.value', 'lucas.ferreira@example.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('123456789')
    .should('have.value', '123456789')
    .clear()
    .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click() 
  
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado 2', () => {
    cy.PhoneNumber()
  })


  it('envia o formuário com sucesso usando um comando customizado 3 com const', () => {
    const data = {
      firstName: 'Lucas',
      lastName: 'Ferreira Santos',
      email: 'lucasferreira@unifor.br',
      text: 'teste'
    }

    cy.fillMandatoryFieldsAndSubmitconst(data)
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').should('be.visible')
    cy.wait(3000)
    cy.get('select').select('youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () =>{
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })


  it('seleciona um produto (Blog)  por seu índice', () =>{
    cy.get('#product').select(1)
    .should('have.value', 'blog')
      
  })

  it('marca o tipo de atendimento "FeedBack"', () =>{
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="elogio"]') 
      .check()
      .should('be.checked') 
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService =>{
        cy.wrap(typeOfService =>{
          cy.wrap(typeOfService)
          .check()
          .should('be.checked')
        })
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop' })
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
    })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()


    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it.only('testa a página da política de privacidade de forma independente', () =>{
    cy.visit('./src/privacy.html')
  })

  
})
