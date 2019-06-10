import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './Layout'
import BookNew from '../pages/BookNew';
import BookEdit from '../pages/BookEdit';
import Books from '../pages/Books';
import NotFound from '../pages/NotFound';
import BookDetails from '../pages/BookDetails';

function App(){
    return(
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Books} />
                    <Route exact path='/books' component={Books} />
                    <Route exact path='/book/new' component={BookNew} />
                    <Route exact path='/book/:bookId' component={BookDetails} />
                    <Route exact path='/book/:bookId/edit' component={BookEdit} />
                    <Route component={ NotFound } />
                </Switch>
            </Layout>
                
        </BrowserRouter>
    )
}

export default App;