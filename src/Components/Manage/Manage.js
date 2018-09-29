import React from 'react';
import './Manage.css';
import Header from '../Header';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../Components.css';
import {MySubscriptions, RemoveConfirmation} from './ManageComponents';

class Manage extends React.Component {
    constructor(){
        super();
        this.state = {
            showConfirmation: false,
            subscribedManga: [],
            mangaRemoved: [],
            errorMessage: ''
        }

        this.handleMangaToggle = this.handleMangaToggle.bind(this);
        this.handleToggledPage = this.handleToggledPage.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    componentDidMount(){
        if(this.props.id === ''){
            this.props.history.push('/login');
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.props.id,
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(res => this.retrievalSuccess(res))
          .catch(err => this.retrievalFail(err));
        
    }

    retrievalFail(err){
        console.log(err);
    }

    retrievalSuccess(res){
        console.log(res);
        
        if(res.payload.length === 0){
            return;
        }

        //const mangaRemoved = Object.assign([], this.state.mangaRemoved)

        for(var i=0;i<res.payload.length;i++){
            res.payload[i].hasBeenRemoved = false;
        }

        this.setState({
            ...this.state,
            subscribedManga: res.payload
        })
    }

    handleMangaToggle(e , key){
        const subscribedManga = Object.assign(this.state.subscribedManga);

        var index = subscribedManga.indexOf(key);
        
        if(index !== -1) {
            const mangaRemoved = Object.assign([], this.state.mangaRemoved);
            const subscribedManga = Object.assign([], this.state.subscribedManga);
            
            let hasBeenRemoved = subscribedManga[index].hasBeenRemoved;

            if(hasBeenRemoved){
                subscribedManga[index].hasBeenRemoved = false;
                mangaRemoved.splice(mangaRemoved.indexOf(key), 1);
            } else {
                subscribedManga[index].hasBeenRemoved=true;
                mangaRemoved.push(key)
            }
            this.setState({
                ...this.state,
                subscribedManga: subscribedManga,
                mangaRemoved: mangaRemoved
            })
        }
        if(this.state.showConfirmation){
            const mangaRemoved = Object.assign([], this.state.mangaRemoved);
            mangaRemoved.splice(mangaRemoved.indexOf(key), 1);

            let showConfirmation = mangaRemoved.length === 0 ? false: true;

            this.setState({
                ...this.state,
                mangaRemoved: mangaRemoved,
                showConfirmation: showConfirmation
            })
        }
    }

    handleToggledPage(e){
        e.preventDefault();
        this.setState({
            ...this.state,
            showConfirmation: !this.state.showConfirmation
        })
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
        let mangaRemoved = this.state.mangaRemoved

        if(mangaRemoved.length === 0){
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': this.props.id,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({operation: "remove", mangaList: mangaRemoved})
        }).then(this.checkoutSuccess())
          .catch(err => this.checkoutFail(e, err));

    }

    render(){
        const currentSubscriptions = (
            <MySubscriptions 
                subscribedManga = {this.state.subscribedManga}
                mangaRemoved = {this.state.mangaRemoved}
                handleMangaToggle = {this.handleMangaToggle}
                handleToggledPage = {this.handleToggledPage}/>
        );

        const removeConfirmation = (
            <RemoveConfirmation mangaRemoved = {this.state.mangaRemoved}
                handleToggledPage = {this.handleToggledPage}
                handleMangaToggle = {this.handleMangaToggle}
                handleCheckout = {this.handleCheckout}/>
        );

        return(
            <div className="manage">
                <Header/>
                {this.state.showConfirmation ? 
                    removeConfirmation : currentSubscriptions}
                <text className="warningMessage">
                    {this.state.errorMessage}
                </text>
            </div>
        );
    }
}

let url = 'https://qs9wnx25yf.execute-api.us-west-2.amazonaws.com/dev/user'

const mapStateToProps = (state) => {
    return{
      id: state.authReducer.id
    };
}

export default withRouter(connect(mapStateToProps)(Manage));