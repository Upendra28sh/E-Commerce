module.exports = {
    Query: `
        allUsers: [User]
    `,
    Mutation: `
        addUser(
            name: String,
            image: String,
            about: String,
            order:Int,
            City:String,
            email:String,
            Latest:Int,
            Contact:String,
            Total:Int
        ): User
    `
}