describe('todo list flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

//   it('displays two todo items by default', () => {
//     // We use the `cy.get()` command to get all elements that match the selector.
//     // Then, we use `should` to assert that there are two matched items,
//     // which are the two default items.
//     cy.get('.todo-list li').should('have.length', 2)

//     // We can go even further and check that the default todos each contain
//     // the correct text. We use the `first` and `last` functions
//     // to get just the first and last matched elements individually,
//     // and then perform an assertion with `should`.
//     cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
//     cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
//   })

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
