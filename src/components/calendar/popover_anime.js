import { Popover } from 'react-tiny-popover';
import { Subtitle } from "../export.js";
import React from 'react';

export default function PopoverAnime({ anime, popoverVisibility, handlePopoverToggle }) {
    const sanitizeHtml = (html) => {
        // Create a new DOMParser instance
        const parser = new DOMParser();
        // Parse the input HTML string to a Document object
        const doc = parser.parseFromString(html, 'text/html');
        // Extract the text content from the Document object
        const sanitizedHtml = doc.body.textContent || '';
        return sanitizedHtml;
    };

    return (
        <Popover
            isOpen={popoverVisibility[anime.props.title]}
            positions={['bottom']} // if you'd like, you can limit the positions
            onClickOutside={() => handlePopoverToggle(anime.props.title)}
            content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                <div >
                    <div className='card-page--card'>
                        <img
                            src={anime.props.image}
                            alt="Filler"
                            width="225"
                            height="337"
                            className="App"
                        ></img>
                        <Subtitle subtitle={anime.props.title}></Subtitle>
                        <div className="gap">
                            <div>{anime.props.rating}</div>
                            <div>{sanitizeHtml(anime.props.description)}</div>
                        </div>
                    </div>

                </div>
            )}
        /* Other Popover 1 props */
        >
            {/* Content for Popover 1 */}
            <div onClick={() => handlePopoverToggle(anime.props.title)}>
                <span>{anime.props.airtime}</span>
                {anime}
            </div>
        </Popover>
    );
};