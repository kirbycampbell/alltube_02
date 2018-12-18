import React, { Component } from "react";
import * as queries from ".././graphql/queries";
import * as mutations from ".././graphql/mutations";
import * as subscriptions from ".././graphql/subscriptions";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import AddTodoForm from "./AddTodoForm";

class ListTodosBox extends Component {
  render() {
    const ListView = ({ todos }) => (
      <div>
        <h3>All Todos</h3>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.id} - {todo.name} --- {todo.description}
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <div className="App">
        <Connect mutation={graphqlOperation(mutations.createTodo)}>
          {({ mutation }) => <AddTodoForm onCreate={mutation} />}
        </Connect>

        <Connect
          query={graphqlOperation(queries.listTodos)}
          subscription={graphqlOperation(subscriptions.onCreateTodo)}
          onSubscriptionMsg={(prev, { onCreateTodo }) => {
            let updatedQuery = Object.assign({}, prev);
            updatedQuery.listTodos.items = prev.listTodos.items.concat([
              onCreateTodo
            ]);
            console.log("Subscription data:", prev);
            return updatedQuery;
          }}
        >
          {({ data: { listTodos }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !listTodos) return <h3>Loading...</h3>;
            return <ListView todos={listTodos.items} />;
          }}
        </Connect>
      </div>
    );
  }
}

export default ListTodosBox;
