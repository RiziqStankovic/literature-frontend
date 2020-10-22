import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../../context/Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoading ? (
          <h1>Loading...</h1>
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
