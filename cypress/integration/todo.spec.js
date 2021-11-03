describe('todo list flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const newItem = 'Feed the cat'
  
  it('can add new todo items', () => {
    cy.get('[data-testid=taskinput-todo-app]').type(`${newItem}{enter}`)

    cy.get('[data-testid=taskfieldlist-todoApp]').should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
    cy.get('[data-testid=taskinput-todo-app]').type(`${newItem}{enter}`)
    cy.get('[data-testid=taskbutton-todo-app-done]').click();
    cy.get('[data-testid=taskbutton-todo-app-undone]').should('have.length', 1)
  })

  it('can filter for completed tasks', () => {
    cy.get('[data-testid=taskinput-todo-app]').type(`${newItem}{enter}`)
    cy.get('[data-testid=taskbutton-todo-app-done]').click();
    cy.contains('Complete').click()

    cy.get('[data-testid=taskbutton-todo-app-undone]').should('have.length', 1)

  })

  it('delete task', () => {
    cy.get('[data-testid=taskinput-todo-app]').type(`${newItem}{enter}`)
    cy.get('[data-testid=taskbutton-todo-app-delete]').click();
    cy.get('[data-testid=taskbutton-todo-app-done]').should('not.exist');

  })
})
