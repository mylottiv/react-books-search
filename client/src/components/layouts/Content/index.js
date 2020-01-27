import React from 'react';

function ContentLayout({children}) {
    return (
        <div className='row'>
            <p>{children}</p>
        </div>
    )
}

export default ContentLayout;