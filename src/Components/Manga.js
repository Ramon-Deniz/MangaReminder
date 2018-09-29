import React from 'react';
import './Components.css';

export const Manga = (props) => {
    return(
        <div className={props.mangaDetails.hasBeenAdded ?"mangaRemove": "manga"} 
        onClick={(e) => props.handleMangaToggle(e, props.mangaDetails)}>
            <text className="message">
                {props.mangaDetails.manga}
            </text>
            <br/>
            <text className="basicText">{props.mangaDetails.source}</text>
        </div>
    );
}

export const SubscribedManga = (props) => {
    return(
        <div className={props.mangaDetails.hasBeenRemoved ?"mangaRemove": "manga"} 
        onClick={(e) => props.handleMangaToggle(e, props.mangaDetails)}>
            <text className="message">
                {props.mangaDetails.manga}
            </text>
            <br/>
            <text className="basicText">{props.mangaDetails.source}</text>
        </div>
    );
}