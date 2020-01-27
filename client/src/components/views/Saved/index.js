import React, {useState, useEffect} from 'react';
import {HeaderLayout, ContentLayout, OutputLayout} from '../..'

// function SavedBookCard(props) {
//     return (
//         <div className='row card-group' key={`saved-book-${item._id}}`}>
//             <div className='col card'>
//                 <div className='card-body row'>
//                     <div className='col'>
//                         <img className='img-thumbnail' src={item.image} />
//                     </div>
//                     <div className='col'>
//                         <h4 className='card-title'>{item.title}</h4>
//                         <h5 className='card-subtitle'>{item.authors}</h5>
//                         <a href={item.link}>Link</a>
//                     </div>
//                     <div className='col'>
//                         <button className='btn-help' type='button' onClick={deleteSavedBook(savedBooks[i]._id, savedBooks, setSavedBooks)}>Delete</button>
//                     </div>
//                 </div>
//                 <div className='card-body row'>
//                     <p className='card-text'>{item.description.slice(0, 280) + '...'}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

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
        console.log(savedBooks)
        list = savedBooks.map((item, i) => {
            return (
                <div className='row card-group' key={`saved-book-${item._id}}`}>
                    <div className='col card'>
                        <div className='card-body row'>
                            <div className='col'>
                                <img className='img-thumbnail' src={item.image} />
                            </div>
                            <div className='col'>
                                <h4 className='card-title'>{item.title}</h4>
                                <h5 className='card-subtitle'>{item.authors}</h5>
                                <a href={item.link}>Link</a>
                            </div>
                            <div className='col'>
                                <button className='btn-help' type='button' onClick={deleteSavedBook(savedBooks[i]._id, savedBooks, setSavedBooks)}>Delete</button>
                            </div>
                        </div>
                        <div className='card-body row'>
                            <p className='card-text'>{item.description.slice(0, 280) + '...'}</p>
                        </div>
                    </div>
                </div>
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