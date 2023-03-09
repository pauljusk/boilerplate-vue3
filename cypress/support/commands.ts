/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}
declare global {
  namespace Cypress {
    interface Chainable {
      login(user: User): Chainable<void>;
      logout(): Chainable<void>;
      addTodo(todoValue: string): Chainable<void>;
      updateTodo(todoValue: string): Chainable<void>;
      removeTodo(): Chainable<Element>;
    }
  }
}
const baseUrl = Cypress.env("baseUrl");
Cypress.Commands.add("login", (user: User) => {
  cy.visit(baseUrl + "/login");
  cy.get('[data-cy="username-field"]').type(user.username);
  cy.get('[data-cy="password-field"]').type(user.password);
  cy.get('[data-cy="submit"]').click();
  cy.get('[data-testid="button-logout"]').should("be.visible");
});

Cypress.Commands.add("logout", () => {
  cy.getLocalStorage("token").should("not.be.equal", null);
  cy.get('[data-testid="button-logout"]').click();
  cy.getLocalStorage("token").should("equal", null);
});

Cypress.Commands.add("addTodo", (todoValue: string) => {
  let N = 0;
  cy.get('[data-testid="todo-list"] tr')
    .its("length")
    .then((n) => {
      N = n;
    });
  // now add an item
  cy.get('[data-testid="form-todo"] [data-testid="field-todo"]').type(todoValue);
  cy.get('[data-testid="form-todo"] [data-testid="button-submit"]')
    .click()
    .then(() => {
      cy.get('[data-testid="todo-list"] tr').should("have.length", N + 1);
    });
});
Cypress.Commands.add("updateTodo", (todoValue: string) => {
  cy.get('[data-testid="todo-list"] tr:last [data-testid="button-edit-todo"]').click();
  cy.get('[data-testid="todo-list"] [data-testid="field-edit-todo"]').clear().type(todoValue);
  cy.get('[data-testid="todo-list"] [data-testid="button-update-todo"]').click();
  cy.get('[data-testid="todo-list"] tr:last').should("contain", todoValue);
});

Cypress.Commands.add("removeTodo", () => {
  cy.get('[data-testid="todo-list"] tr')
    .should("have.length.gte", 0)
    .its("length")
    .then((N) => {
      if (N === 0) {
        return;
      }
      cy.get('[data-testid="todo-list"] tr:last [data-testid="button-delete-todo"]').click();
      cy.get('[data-testid="todo-list"] tr').should("have.length", N - 1);
    });
});

export {};
