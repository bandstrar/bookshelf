import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Shelves from '../views/Shelves';
import Books from '../views/Books';
import SingleShelf from '../views/SingleShelf';
import BookDetails from '../views/BookDetails';
import Search from '../views/Search';
import AdvancedSearch from '../views/AdvancedSearch';

export default function Routes({ user }) {
  return (
        <Switch>
            <Route
            exact
            path='/'
            component={() => <Home user={user} />}
            />
            <Route
            exact
            path='/shelves'
            component={() => <Shelves user={user} />}
            />
            <Route
            exact
            path='/books'
            component={() => <Books />}
            />
            <Route
            exact
            path='/single-shelf'
            component={() => <SingleShelf />}
            />
            <Route
            exact
            path='/book-details'
            component={() => <BookDetails />}
            />
            <Route
            exact
            path='/search'
            component={() => <Search />}
            />
            <Route
            exact
            path='/advanced-search'
            component={() => <AdvancedSearch />}
            />
            <Route component={NotFound} />
        </Switch>
  );
}
