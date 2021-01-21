import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../../context/Context';

const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoading ? (
          <h1>Loading...</h1>
        ) : state.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default AdminRoute;
