import React from 'react';
import {HeaderLayout, ContentLayout, OutputLayout} from '../'

function Home() {
    return (
        <div className='container'>
            <HeaderLayout name='Home' />
            <ContentLayout>
                <p>Texty Text</p>
            </ContentLayout>
            <OutputLayout>
                <p>Outy put</p>
            </OutputLayout>
        </div> 
    )
}

export default Home;