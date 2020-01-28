import React from 'react'

function BookSearch({initialQuery, onChange, onClick}) {

    return (
        <form>
            <input value={initialQuery} type='text' placeholder='Search GoogleBooks' onChange={onChange}></input>
            <button type='button' className='btn-danger' onClick={onClick}>Get Results</button>
        </form>
    )
}

export default BookSearch;