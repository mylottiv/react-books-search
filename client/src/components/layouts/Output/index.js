import React from 'react';

function OutputLayout({children}) {
    return (
        <div className='row'>
            <div className='col'>
                {children}
            </div>
        </div>
    )
}

export default OutputLayout;