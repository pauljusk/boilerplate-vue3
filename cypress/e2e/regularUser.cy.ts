const testTodo = {
  newValue: "New todo value",
  updateValue: "Updated Todo Value",
};

describe("Regular User", () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("should be able to login", () => {
    cy.fixture("users").then((users) => {
      cy.login(users.regular);
    });
  });

  it("should create new todo", () => {
    cy.addTodo(testTodo.newValue);
  });

  it("should update todo", () => {
    cy.updateTodo(testTodo.updateValue);
  });

  it("should remove todo", () => {
    cy.removeTodo();
  });

  it("should be able to logout", () => {
    cy.logout();
  });
});
