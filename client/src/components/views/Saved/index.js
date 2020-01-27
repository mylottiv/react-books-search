import React, {useState, useEffect} from 'react';
import {HeaderLayout, ContentLayout, OutputLayout, BookCard} from '../..'

function deleteSavedBook(id, savedBooks, setSavedBooks) {
    return (e) => {
        fetch('./api/books/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response);
            return response.json()
        }).then((data) => {
            setSavedBooks(savedBooks.filter((book) => book._id !== id))
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
}

function Saved() {

    const [savedBooks, setSavedBooks] = useState([])

    useEffect(() => {
        fetch('./api/books', {method: 'GET'})
        .then(response => response.json())
        .then(data => setSavedBooks(data))
        .catch(err => console.log(err))

    }, [])

    let list = [];

    if (savedBooks.length > 0) {
        console.log(savedBooks);
        list = savedBooks.map((item, i) => {
            return (
                <BookCard key={`item-${i}`} data={item} onClick={deleteSavedBook(savedBooks[i]._id, savedBooks, setSavedBooks)} />
            )
        })
    };

    return (
        <div className='container'>
            <HeaderLayout name='Saved' />
            <ContentLayout>
                <p>Your previously saved books will appear here</p>
            </ContentLayout>
            <OutputLayout>
                {list}
            </OutputLayout>
        </div>
    )
}

export default Saved;