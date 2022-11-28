const user = {
  username: "leonardo",
  name: "Leonardo P",
  password: "12345678",
};

const exampleBlog = {
  title: "My first blog entry :)",
  author: "Leonardo P",
  url: "https://google.com",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", {
      username: user.username,
      name: user.name,
      password: user.password,
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get(".username").type(user.username);
      cy.get(".password").type(user.password);
      cy.contains("login").click();
      cy.contains("logout").click();
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get(".username").type(user.username);
      cy.get(".password").type("aaaaaaaaa");
      cy.contains("login").click();
      cy.contains("login");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click();
      cy.get(".username").type(user.username);
      cy.get(".password").type(user.password);
      cy.contains("login").click();

      cy.get(".title").type(exampleBlog.title);
      cy.get(".author").type(exampleBlog.author);
      cy.get(".url").type(exampleBlog.url);
      cy.contains("create").click();
      cy.contains(exampleBlog.title);
    });

    it("A blog can be liked", function () {
      cy.contains("show details").click();
      cy.contains("like").click();
      cy.contains("1");
    });

    it("A blog can be deleted", function () {
      cy.contains("show details").click();
      cy.contains("remove").click();
    });

    describe("When multiple blogs exist", function () {
      beforeEach(function () {
        [
          { title: "2nd blog", author: "Tuomas", url: "aalto.fi" },
          { title: "aalto blog", author: "Peter", url: "ayy.fi" },
        ].forEach((x) => {
          cy.get(".title").type(x.title);
          cy.get(".author").type(x.author);
          cy.get(".url").first().type(x.url);
          cy.contains("create").click();
        });
      });

      it("The blogs are sorted by their likes", function () {
        cy.get(".blog").eq(0).should("contain", exampleBlog.title);
        cy.get(".blog").eq(1).within(() => {
          cy.contains("show details").click();
          cy.contains("like").click();
        })
        cy.get(".blog").eq(0).should("contain", "2nd blog");
        cy.get(".blog").eq(1).should("contain", exampleBlog.title);
      });
    });
  });
});
