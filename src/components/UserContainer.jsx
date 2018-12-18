import React, { Component } from "react";
import * as queries from ".././graphql/queries";

import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";

class ListUsers extends Component {
  render() {
    const ListUser = ({ users }) => (
      <div>
        <h3>All Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.id} - {user.name} ---
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <div className="App">
        <Connect query={graphqlOperation(queries.listUsers)}>
          {({ data: { listUsers }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !listUsers) return <h3>Loading...</h3>;
            return <ListUsers users={listUsers.items} />;
          }}
        </Connect>
      </div>
    );
  }
}

export default ListUsers;
