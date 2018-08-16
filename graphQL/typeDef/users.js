module.exports = {
    Query: `
        allUsers: [User]
    `,
    Mutation: `
        addUser(
            name: String,
            image: String,
            about: String
        ): User
    `
}