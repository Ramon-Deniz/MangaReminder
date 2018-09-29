import React from 'react';
import './Search.css';
import '../Components.css';
import {Manga} from '../Manga';
import {Link} from 'react-router-dom';

export const SearchPrompt = (props) => {
    return(
        <div className="search">
            <SearchInput searchTerm={props.searchTerm}
                handleInputChange={props.handleInputChange}/>
            <SearchRequestButton handleSearch={props.handleSearch}/>
            <SearchResponse requestedManga = {props.requestedManga}
                handleMangaToggle = {props.handleMangaToggle}/>
            {props.mangaAdded.length ===0 ? <BackButton 
                style={{alignSelf: 'center', marginTop: 75}}/>: 
                <ConfirmButton handleToggledPage = {props.handleToggledPage}/>}
            <text className="message">
                {props.mangaAdded.length} manga added.
            </text>
            <text className="warningMessage">
                {props.mangaAdded.length<10 ? 
                    null : "Warning: You may be subscribed to 10 manga at" + 
                    " once. You can delete manga in the next page."}
            </text>
        </div>
    );
}

export const SearchConfirmation = (props) => {
    const mangaList = props.mangaAdded.map((manga) => 
        <Manga mangaDetails={manga} key={manga.manga + manga.source}
            handleMangaToggle = {props.handleMangaToggle}/>
    );

    return(
        <div className="searchConfirmation">
            <text className="titleText">
                Confirmation
            </text>
            <MangaList mangaList = {mangaList}/>
            <SearchConfirmationButtons 
                handleToggledPage= {props.handleToggledPage}
                handleCheckout = {props.handleCheckout}/>
            
            <text className="message">
                {props.mangaAdded.length} manga added.
            </text>
            <text className="warningMessage">
                {props.mangaAdded.length<2 ? 
                    null : "Warning: You may only be subscribed to 10 manga at"
                    + " once. You can delete manga in the next page."}
            </text>
        </div>
    );
}

const SearchInput = (props) => {
    return(
        <div className="searchInput">
            <input className="inputBox" placeholder="Name of Manga" 
                name="searchTerm" value = {props.searchTerm} 
                onChange={props.handleInputChange} 
                style={{textAlign: 'center', width: 280}}/>
        </div>
    );
}

const SearchResponse = (props) => { 
    const mangaList = props.requestedManga.map((manga) => 
        <Manga mangaDetails={manga} key={manga.manga + manga.source}
            handleMangaToggle = {props.handleMangaToggle}/>
    );

    return(
        <MangaList mangaList = {mangaList}/>
    );
}

const MangaList = (props) => {
    return(
        <div className = "mangaList">
            {props.mangaList}
        </div>
    );
}

const SearchRequestButton = (props) => {
    return(
        <button onClick={props.handleSearch} className="button"
            style={{alignSelf: 'center', marginTop: 25}}>
                Search
        </button>
    );
}

const ConfirmButton = (props) => {
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

const SearchConfirmationButtons = (props) => {
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