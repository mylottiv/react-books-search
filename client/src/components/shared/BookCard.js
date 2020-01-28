import React from 'react'

function BookCard({data, onClick}) {

    const {type, callback} = onClick;

    console.log("DATA", data)

    console.log('onClick', type, callback)

    const {authors} = data;

    // Join authors into a single display string
    const joinedAuthors = authors.reduce((accum, cur) => {
        return (accum !== '') ? accum + ', ' + cur : cur;
    }, '')

    return (
    <div className='card my-5'>
            <div className='card-header'>
                <div className='row'>
                    <div className='col-2'>
                        <img className='img-thumbnail flex-wrap' style={{whiteSpace: 'pre'}} src={data.image} alt={`\n${data.image}`} />
                    </div>
                    <div className='col'>
                        <h4 className='card-title'>{data.title}</h4>
                        <h5 className='card-subtitle'>{joinedAuthors}</h5>
                        <p className='card-text'>
                            {data.description}
                        </p>
                        <a href={data.link}>Link</a>
                    </div>
                </div>
            </div>
            <div className='card-body'>
                <div className='d-flex flex-row-reverse'>
                    <button className={`btn-${(type==='Delete Book') ? 'danger' : 'success'} btn-lg btn-block`} type='button' onClick={callback}>
                        {type}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard;