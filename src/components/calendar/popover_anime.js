import { Popover } from 'react-tiny-popover'

export default function PopoverAnime({ anime, popoverVisibility, handlePopoverToggle }) {
    return (
        <Popover
            isOpen={popoverVisibility[anime.props.title]}
            positions={['top', 'left']} // if you'd like, you can limit the positions
            onClickOutside={() => handlePopoverToggle(anime.props.title)}
            content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                <div className='popover-card'>
                    <img
                        src={anime.props.image}
                        alt="Filler"
                        width="225"
                        height="337"
                        className="App"
                    ></img>
                </div>
            )}
        /* Other Popover 1 props */
        >
            {/* Content for Popover 1 */}
            <div onClick={() => handlePopoverToggle(anime.props.title)}>
                {anime}
            </div>
        </Popover>
    );
};