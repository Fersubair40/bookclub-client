import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Book from "./pages/Book";
import Fiction from "./pages/Fiction";

import Home from "./pages/Home";
import Register from "./pages/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/category/fiction" component={Fiction} />
        <Route path="/auth/register" component={Register} />
        <Route path="/book" component={Book} />
        <Redirect from='/' to="/home" />
        {/* <Route path="/auth/register" component={Register} />
          <Route path="/book" component={BookDetail} />
    */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
