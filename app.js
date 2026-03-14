const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');

const app = express();

const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'George R. R. Martin' },
    { id: 3, name: 'Agatha Christie' },
];

const books = [
    { id: 1, title: 'Harry Potter and the Philosopher\'s Stone', authorId: 1 },
    { id: 2, title: 'A Game of Thrones', authorId: 2 },
    { id: 3, title: 'Murder on the Orient Express', authorId: 3 },
    { id: 4, title: 'Hairy Pot Head', authorId: 1 },
    { id: 5, title: 'Hunger games', authorId: 2 },
    { id: 6, title: 'FML', authorId: 3 },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 