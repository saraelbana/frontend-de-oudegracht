// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Link} from 'react-router-dom';

function NotFound() {
    return(
        <main className="page-not-found">
            <h2>
                Oops... This page is not found
            </h2>
            <p>
                Back to <Link to="/">Home</Link> page.
            </p>
        </main>
    )

}
export default NotFound;