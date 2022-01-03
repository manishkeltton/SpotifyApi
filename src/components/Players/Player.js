import React from 'react'
import './players.css'

function Player({ url }) {
    console.log("url", url);
    return (
        <div>
            <iframe
                src={url}
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="preview"
            ></iframe>
        </div>
    )
}

export default Player
