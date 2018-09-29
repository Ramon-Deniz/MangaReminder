import React from 'react';
import './Search.css';
import Header from '../Header';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../Components.css';
import {SearchPrompt, SearchConfirmation} from './SearchComponents';

class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            showPrompt: true,
            searchTerm: '',
            requestedManga: [],
            mangaAdded: [],
            errorMessage: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleMangaToggle = this.handleMangaToggle.bind(this);
        this.handleToggledPage = this.handleToggledPage.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    componentDidMount(){
        document.title = "MangaReminder";
        if(this.props.id === ''){
          this.props.history.push('/login');
        }
      }

    handleInputChange(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleMangaToggle(e , key){
        var index = this.state.requestedManga.indexOf(key);
        
        if(index !== -1) {
            const requestedManga = Object.assign([], this.state.requestedManga);
            const mangaAdded = Object.assign([], this.state.mangaAdded);

            let hasBeenAdded = requestedManga[index].hasBeenAdded;
            if(hasBeenAdded){
                requestedManga[index].hasBeenAdded=false;
                mangaAdded.splice(mangaAdded.indexOf(key), 1);
            } else{
                requestedManga[index].hasBeenAdded=true;
                mangaAdded.push(key)
            }

            this.setState({
                ...this.state,
                requestedManga: requestedManga,
                mangaAdded: mangaAdded
            })
        }

        if(!this.state.showPrompt){
            const mangaAdded = Object.assign([], this.state.mangaAdded);
            mangaAdded.splice(mangaAdded.indexOf(key), 1);

            let showPrompt = mangaAdded.length === 0 ? true: false;

            this.setState({
                ...this.state,
                showPrompt: showPrompt,
                mangaAdded: mangaAdded
            })
        }
    }

    handleResponse(e, res){
        e.persist();
          
        if(res.body.length === 0){
            return;
        }

        const mangaAdded = Object.assign([], this.state.mangaAdded)

        for(var i=0; i< res.body.length; i++){
            res.body[i].hasBeenAdded = true; 
            const index = mangaIndexOf(mangaAdded, res.body[i]);
            if(index !== -1){
                res.body[i] = mangaAdded[index];
            } else {
                res.body[i].hasBeenAdded = false;
            }
        }

        this.setState({
            ...this.state,
            requestedManga: res.body
        })
    }

    handleSearch(e){
        e.preventDefault();
        let searchTerm = this.state.searchTerm;
        fetch(baseURL+'mangalist', {
            method: 'POST',
            headers: {
                'Authorization': this.props.id,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({searchTerm: searchTerm})
        }).then(res => res.json())
          .then(res => this.handleResponse(e, res));
    }

    checkoutSuccess(){
        this.props.history.push('/myaccount');
    }

    checkoutFail(e, err){
        e.persist();
        this.setState({
            ...this.state,
            errorMessage: err.body.message
        })
    }

    handleCheckout(e){
        e.preventDefault();
        
        let mangaAdded = this.state.mangaAdded

        if(mangaAdded.length ===0){
            return;
        }

        fetch(baseURL+'user', {
            method: 'POST',
            headers: {
                'Authorization': this.props.id,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({operation: "add", mangaList: mangaAdded})
        }).then(this.checkoutSuccess())
          .catch(err => this.checkoutFail(e, err));

    }

    handleToggledPage(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            showPrompt: !this.state.showPrompt
        })
    }

    render(){
        const searchPrompt = (
            <SearchPrompt searchTerm={this.state.searchTerm}
                handleInputChange={this.handleInputChange}
                handleSearch={this.handleSearch} 
                requestedManga = {this.state.requestedManga}
                handleMangaToggle = {this.handleMangaToggle}
                mangaAdded = {this.state.mangaAdded}
                handleToggledPage = {this.handleToggledPage}/>
        );

        const searchConfirmation = (
            <SearchConfirmation mangaAdded = {this.state.mangaAdded}
                handleToggledPage = {this.handleToggledPage}
                handleCheckout = {this.handleCheckout}
                handleMangaToggle = {this.handleMangaToggle}/>
        );

        return(
            <div className="search">
                <Header/>
                {this.state.showPrompt ? searchPrompt: searchConfirmation}
                <text className="warningMessage">
                    {this.state.errorMessage}
                </text>
            </div>
        );
    }
}

function mangaIndexOf(mangaList, manga){
    for(var i =0; i< mangaList.length; i++){
        let temp = mangaList[i];
        if(temp.manga === manga.manga && temp.source === manga.source){
            return i;
        }
    }
    return -1;
}

const mapStateToProps = (state) => {
    return{
      id: state.authReducer.id
    };
}

let baseURL = 
    'https://qs9wnx25yf.execute-api.us-west-2.amazonaws.com/dev/'
  
export default withRouter(connect(mapStateToProps)(Search));