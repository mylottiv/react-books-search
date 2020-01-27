import React from 'react';

function HeaderLayout({name}) {
    return (
        <div className='row'>
            <h2>{name}</h2>
        </div>
    )
}

export default HeaderLayout;