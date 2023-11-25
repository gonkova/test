import React from 'react';
import Header from '../components/Header';

export default function WithMainLayout(Component) {

    function layot(props) {
        return (
            <>
                <Header />
                <Component {...props} />
            </>
        );
    }
    return layot;
}