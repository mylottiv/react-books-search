import React from 'react'

function BookSearch({onChange, onClick}) {
    return (
        <form>
            <input type='text' placeholder='Search GoogleBooks' onChange={onChange}></input>
            <button type='button' className='btn-danger' onClick={onClick}>Get Results</button>
        </form>
    )
}

export default BookSearch;