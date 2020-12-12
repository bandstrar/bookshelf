import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Shelves from '../views/Shelves';
import Books from '../views/Books';
import SingleShelf from '../views/SingleShelf';
import BookDetails from '../views/BookDetails';
import Search from '../views/Search';
import CollectionSearch from '../views/CollectionSearch';

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
            path='/books/:id'
            component={(props) => <BookDetails user={user} {...props} />}
            />
            <Route
            exact
            path='/shelves'
            component={() => <Shelves user={user} />}
            />
            <Route
            exact
            path='/books'
            component={() => <Books user={user} />}
            />
            <Route
            exact
            path='/shelves/:id'
            component={(props) => <SingleShelf user={user} {...props} />}
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
            path='/collection-search'
            component={() => <CollectionSearch />}
            />
            <Route component={NotFound} />
        </Switch>
  );
}
