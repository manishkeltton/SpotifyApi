import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import './album.css'

function Album({state, trackalbum, isTrackData }) {
    return (
        <>
            {
                !isTrackData && (state && state.map(item =>
                    <div key={item.id} className="album-list" onClick={() => trackalbum(item.id)}>
                        <img src={item.images[0].url} />
                        <span className="play"><AiFillPlayCircle color="green" size="2.5rem" /></span>
                        <span>{item.name}</span>
                    </div>
                ))
            }
        </>
    )
}

export default Album
