import React, {useState, useEffect} from 'react';
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

function saveBookToDB(i, bookData) {
    const saveBook = (e) => {
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
    return {type:'Save Book', callback:saveBook};
}

function Search(props) {

    console.log('props', props)

    const [userInput, setUserInput] = useState(props.initialQuery);
    const [queryResults, setQueryResults] = useState([])

    // Once component loaded, fetch books with initial query if relevant
    useEffect(() => {
        if (userInput !== '') {
            console.log('test');
            fetchFromGoogleBooks(userInput, setQueryResults)()
            console.log(queryResults);
        };
    }, [])

    // Regenerate list of book cards when query results updated.
    
    const constraint = (queryResults.length > 20) ? 20 : queryResults.length;

        const list = queryResults.slice(0, constraint).map(({volumeInfo}, i) => {
        console.log(volumeInfo);
        const formattedData = {
            title: volumeInfo.title,
            authors: (!volumeInfo.authors) ? ['N/A'] : (volumeInfo.authors.length > 0) ? volumeInfo.authors : [volumeInfo.authors[0]],
            description: (volumeInfo.description) ? volumeInfo.description.slice(0, 420) + '...' : '...',
            image: (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) ? volumeInfo.imageLinks.thumbnail : 'No Thumbnail Found',
            link: volumeInfo.infoLink
        }
        return (
            <BookCard key={`item-${i}`} data={formattedData} onClick={saveBookToDB(i, formattedData)} />
        )
    });

    return (
        <div className='container'>
            <HeaderLayout name='Search' />
            <ContentLayout>
                <BookSearch initialQuery={props.initialQuery} onChange={updateInput(setUserInput)} onClick={fetchFromGoogleBooks(userInput, setQueryResults)} />
            </ContentLayout>
            <OutputLayout>
                {list}
            </OutputLayout>
        </div>
    )
}

export default Search;