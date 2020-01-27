import React from 'react'

function BookCard({data, onClick}) {

    console.log("DATA", data)

    console.log('Authors', data.authors)

    const {authors} = data;

    const joinedAuthors = authors.reduce((accum, cur) => {
        return (accum !== '') ? accum + ', ' + cur : cur;
    }, '')

    return (
    <div className='row card-group'>
        <div className='col card'>
            <div className='card-body row'>
                <div className='col'>
                    <img className='img-thumbnail' src={data.image} />
                </div>
                <div className='col'>
                    <h4 className='card-title'>{data.title}</h4>
                    <h5 className='card-subtitle'>{joinedAuthors}</h5>
                    <a href={data.link}>Link</a>
                </div>
                <div className='col'>
                    <button className='btn-help' type='button' onClick={onClick}>Save</button>
                </div>
            </div>
            <div className='card-body row'>
                <p className='card-text'>
                    {data.description}
                </p>
            </div>
        </div>
    </div>
    )
}

export default BookCard;