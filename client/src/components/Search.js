import React, {useState} from 'react';

function updateInput(setUserInput) {
    return (e) => {
        setUserInput(e.target.value)
    }

}

function fetchFromGoogleBooks(userInput, setQueryResults) {
  return (e) => {      
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=AIzaSyBGjN1NV_BKLUCJA1YNcYj1SVsc1vBNmF8&country=US`)
    .then((response) => {
        console.log(response);
        return response.json()
    }).then((data) => {
        console.log(data.items);
        return setQueryResults(data.items);
    }).catch(err => {
        console.log(err);
    })
}
}

function saveBook(i, queryResults) {
    return (e) => {
        fetch('./api/books', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: queryResults[i].volumeInfo.title,
                authors: (queryResults[i].volumeInfo.authors.length > 0) ? queryResults[i].volumeInfo.authors[0] : queryResults[i].volumeInfo.authorsqueryResults[i].volumeInfo.authors ,
                description: queryResults[i].volumeInfo.description,
                image: queryResults[i].volumeInfo.imageLinks.thumbnail,
                link: queryResults[i].volumeInfo.infoLink
            })
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

    const list = queryResults.slice(0, constraint).map((item, i) => {
        return (
            <div className='row card-group' key={`item-${i}`}>
                <div className='col card'>
                    <div className='card-body row'>
                        <div className='col'>
                            <img className='img-thumbnail' src={item.volumeInfo.imageLinks.thumbnail} />
                        </div>
                        <div className='col'>
                            <h4 className='card-title'>{item.volumeInfo.title}</h4>
                            <h5 className='card-subtitle'>{item.volumeInfo.authors}</h5>
                            <a href={item.volumeInfo.infoLink}>Link</a>
                        </div>
                        <div className='col'>
                            <button className='btn-help' type='button' onClick={saveBook(i, queryResults)}>Save</button>
                        </div>
                    </div>
                    <div className='card-body row'>
                        <p className='card-text'>{item.volumeInfo.description.slice(0, 280) + '...'}</p>
                    </div>
                </div>
            </div>
        )
    });


    return (
        <div className='container'>
            <div className='row'>
                <h2>Search</h2>
            </div>
            <div className='row'>
                <form>
                    <input type='text' placeholder='Search GoogleBooks' onChange={updateInput(setUserInput)}></input>
                    <button type='button' className='btn-danger' onClick={fetchFromGoogleBooks(userInput, setQueryResults)}>Get Results</button>
                </form>
            </div>
            <div className='row'>
                <div className='container'>
                    {list}
                </div>
            </div>
        </div>    )
}

export default Search;