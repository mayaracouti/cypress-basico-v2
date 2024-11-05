// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//const cypress = require("cypress");


//exercicio 1
//<reference types="Cypress" />
describe('Central de atendimento ao cliente TAT', function() {
   //beforEach == antes de cada
   beforeEach( () => {
        cy.visit('./src/index.html')
   });
   
   it('verifica o titulo da aplicação', function() {   
      //visitar a pagina

      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
      
      //visitar a pagina ->> cy.visit('./src/index.html')

   })

   

    //função de callback - exercicio extra 1
   it('preenche os campos obrigatórios e envia o formulário',function(){
       cy.get('#firstName')
       .type('Maria')
       
       //.click()// click is used to activite the button with id specific
       cy.get('#lastName').type('Ferreira',{delay:0, force: true})

       cy.get('#email')
       .type('mariaFerreira@gmail.com')
       
       cy.get('#phone')
       .type('11963877943')

       cy.get('#open-text-area').type('nao sei')

       cy.get('.button').click()

       cy.get('.success').should('be.visible')
       //mandar click no botão do tipo submit
    })

     //função de callback - exercicio extra 2
    //usar o only para testar a função que esta sendo realizada, modo de uso: it.only()
    it('exibe mensagem de erro por email invalido',function(){
       cy.get('#email').type('mariaFerreira@')
       cy.get('.button').click()
       cy.get('.error').should('be.visible')        

    })

    //função de callback - exercicio extra 3
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
       cy.get('#phone')
       .type('ahdgd')
      // .expect(number).not.to.include('text')
       .should('have.value','')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
       cy.get('#phone-checkbox').check()
       cy.get('.button').click()
       cy.get('.error').should('be.visible')

    })

  

    it('envia o formulário com sucesso usando um comando customizado',function(){
     cy.fillMandatoryFieldsAndSubmit()
     cy.get('.success').should('be.visible')
   })

   //exercicio extra 8
   it('alterar o get para contains', function(){
     cy.contains('button', 'Enviar').click()
     cy.get('.error').should('be.visible')
  })

  //aula 4 ex extra 1
  it('seleciona um produto (YouTube) por seu texto', function() {
     //define o elemento, q é tipo select e especifica o elemento que se chama youtube
     cy.get('select').select('YouTube')
     //verifica valor
     .should('have.value', 'youtube')
   })

  
   it('(mentoria) pelo seu value',function (){
     cy.get('#product')
     .select('mentoria')
     .should('have.value','mentoria')
   })


   it('testando #product',function(){
     cy.get('#product')
     .select(1)
     .should ('have.value','blog')
   })

  //aula marcando input do tipo radio
  it(' marca o tipo de atendimento feedback', function(){
     cy.get('input[type="radio"] [value = "feedback"]').check('feedback')
     .should('have.value', 'feedback')
 })

// it(' marca o tipo de atendimento', function(){
  //.it para iterar um array
  //.wrap
//  cy.get('input[type="radio"]')
  
//  .should('have.length', 3)//CONTA QTDE
  //pega cada um dos radios
 // .each (function ($radio){
//     cy.wrap($radio).check()//empacotou
//     cy.wrap($radio).should('be.checked')
  //})
   


//.uncheck and check
it('Crie um teste chamado marca ambos checkboxes, depois desmarca o último',function(){
  cy.get('input[type="checkbox"]').check()
  .last()//
  cy.get('input[type="checkbox"]').uncheck().should('not.be.checked')
  
})

//fazer upload de arquivo no cyprees
it('seleciona um arquivo da pasta fixtures', function () {
  cy.get('input[type="file"]') // Identifica o elemento do tipo "file"
     .should('not.have.value') // Verifica que inicialmente o input não tem valor
     .selectFile('cypress/fixtures/example.json') // Seleciona o arquivo da pasta fixtures
     .should(function($input) {
        // Acessa o arquivo selecionado e verifica se o nome do arquivo é 'example.json'
        expect($input[0].files[0].name).to.equal('example.json');
     });
});

//exercicio extra 2 
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , function(){
  cy.fixture('example.json').as('sampleFile')//o as atribui um alias 
  cy.get('input[type=  file]')
     .selectFile('@sampleFile')//o @identifica que é um alias
     //extenção cypress helper
})

//lidando com link que abre na pagina do navegador, ler a pagina trade-offs
//como testar a pagina que abre em outro link?

//it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique')

it('acessa a página da política de privacidade removendo o target e então clicando no link' , function (){
  cy.get('#privacy a')
  .invoke('removeAttr','target')//remove atributo target
  .click()
})

//ex extra 2 desafio
it.only('testa a página da política de privacidade de forma independente' , function (){
  cy.get('a')
  .invoke('removeAttr' , 'target')
  .click ()
  cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
     
  //outra maneira
  //usa o cy.visit e depois p cy.contains e .should be.visable

  //alterar a viewport para test em mobile
  //alterar cyopen no package.json com: --config viewportWidth=410 viewportHeight=860

})


})


   //aula 4 ex extra 1
   //it('',function(){

  // })



  