module.exports = {
    Mutation: `
        signup (
            email: String,
            password: String
        ) : Token,

        login (
            email: String,
            password: String
        ) : Token
    `
}