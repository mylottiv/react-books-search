import React, {useState} from 'react';
import {HeaderLayout, ContentLayout, OutputLayout, BookCard} from '../..';
import BookSearch from './BookSearch'

function updateInput(setUserInput) {
    return (e) => {
        setUserInput(e.target.value)
    }

}

function fetchFromGoogleBooks(userInput, setQueryResults) {
  return (e) => {      
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=AIzaSyBGjN1NV_BKLUCJA1YNcYj1SVsc1vBNmF8&country=US`)
    .then((response) => {
        console.log('Fetch response', response);
        return response.json()
    }).then((data) => {
        console.log('Fetch data', data.items);
        return setQueryResults(data.items);
    }).catch(err => {
        console.log('Fetch Err', err);
    })
}
}

function saveBook(i, bookData) {
    return (e) => {
        fetch('./api/books', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        })
        .then((response) => {
            console.log(response);
            return response.json()
        }).then((data) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
}

function Search() {

    const [userInput, setUserInput] = useState('');
    const [queryResults, setQueryResults] = useState([])



    let constraint = (queryResults.length > 20) ? 20 : queryResults.length;

    const list = queryResults.slice(0, constraint).map(({volumeInfo}, i) => {
        console.log(volumeInfo);
        const formattedData = {
            title: volumeInfo.title,
            authors: (!volumeInfo.authors) ? ['N/A'] : (volumeInfo.authors.length > 0) ? volumeInfo.authors : [volumeInfo.authors[0]],
            description: (volumeInfo.description) ? volumeInfo.description.slice(0, 280) + '...' : '...',
            image: (volumeInfo.imageLinks.thumbnail) ? volumeInfo.imageLinks.thumbnail : '',
            link: volumeInfo.infoLink
        }
        return (
            <BookCard key={`item-${i}`} data={formattedData} onClick={saveBook(i, formattedData)} />
        )
    });

    return (
        <div className='container'>
            <HeaderLayout name='Search' />
            <ContentLayout>
                <BookSearch onChange={updateInput(setUserInput)} onClick={fetchFromGoogleBooks(userInput, setQueryResults)} />
            </ContentLayout>
            <OutputLayout>
                {list}
            </OutputLayout>
        </div>
    )
}

export default Search;