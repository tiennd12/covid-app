import React from 'react'

const Name = ({val}) => {
    console.log(val.code)
    return (
        <>
            <option key={val.code}>{val.name}</option>
        </>
    )
}

export default Name
