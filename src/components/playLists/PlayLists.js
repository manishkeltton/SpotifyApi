import React from 'react'
import './playLists.css'

function PlayLists({ trackData, onPlayList }) {
    return (
        <div className="playlist-cotainer">
            {trackData && (<table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        trackData && trackData.map((track, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td onClick={() => onPlayList(track.preview_url)} className="play-item">{track.name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>)}


        </div>
    )
}

export default PlayLists
