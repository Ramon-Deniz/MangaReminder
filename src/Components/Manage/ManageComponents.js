import React from 'react';
import {Link} from 'react-router-dom';
import './Manage';
import {SubscribedManga} from '../Manga';

export const MySubscriptions = (props) => {
    return(

        <div className = "manage">
            <text className="titleText">
                My Subscriptions
            </text>
            <CurrentSubscriptions subscribedManga = {props.subscribedManga}
            mangaRemoved = {props.mangaRemoved}
            handleMangaToggle = {props.handleMangaToggle}/>
            {props.mangaRemoved.length === 0 ? <BackButton 
                style={{alignSelf: 'center', marginTop: 75}}/>: 
                    <CurrentSubscriptionsButtons 
                        handleToggledPage = {props.handleToggledPage}/>}
            <text className="message">
                {props.mangaRemoved.length} manga removed.
            </text>
        </div>
    );
}

export const RemoveConfirmation = (props) => {
    const mangaList = props.mangaRemoved.map((manga) => 
        <SubscribedManga mangaDetails={manga} key={manga.manga + manga.source}
            handleMangaToggle = {props.handleMangaToggle}/>
    );

    return(
        <div className="manage">
            <text className="titleText">
                Confirmation
            </text>
            <MangaList mangaList={mangaList}/>
            <RemoveConfirmationButtons handleCheckout = {props.handleCheckout}
                handleToggledPage = {props.handleToggledPage}/>
        </div>
    );
}

const CurrentSubscriptions = (props) => {
    const mangaList = props.subscribedManga.map((manga) => 
        <SubscribedManga mangaDetails={manga} key={manga.manga + manga.source}
            handleMangaToggle = {props.handleMangaToggle}/>
    );

    return(
        <MangaList mangaList = {mangaList}/>
    );
}

const CurrentSubscriptionsButtons = (props) => {
    return (
        <div className="buttons">
            <BackButton/>
            <button onClick={props.handleToggledPage} className="button">
                    Confirm →
            </button>
        </div>
    );
}

const BackButton = (props) => {
    return(
        <Link className="buttonLink" to="/myaccount" 
            style={props.style}> 
                Back
        </Link>
    );
}

const MangaList = (props) => {
    return(
        <div className = "mangaList">
            {props.mangaList}
        </div>
    );
}

const RemoveConfirmationButtons = (props) => {
    return(
        <div className="buttons">
            <button className="button" onClick={props.handleToggledPage}>
                Back
            </button>
            <button className="button" onClick={props.handleCheckout}>
                Finish
            </button>
        </div>
    );
}