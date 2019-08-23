import React, { Component } from 'react';
// import axios from '../../shared/axios';
import GitHubApi from '../../shared/github-api';
// import Grid from './Grid/Grid';
class User extends Component {
    state = {
        followers: [],
        following: [],
        notFollowers: [],
        notFollowing: [],
        error: false,
        errorMessage:{},
        compType: 0
    }
    itemToShow = "";
    getUserData = (event) => {
        event.preventDefault();
        const username = this.refs.username.value;
        let gitHubApi = new GitHubApi();
        gitHubApi.getAllFollowers(username, 'followers')
            .then(followersResp => {
                gitHubApi.getAllFollowers(username, 'following')
                    .then(followingResp => {
                        this.setState({
                            followers: followersResp,
                            following: followingResp,
                            error:false,
                            errorMessage:{}
                        }, () => this.switchView());
                    }).catch(followingError => {
                        this.setState({
                            followers:[],
                            following: [],
                            error:true,
                            errorMessage: followingError.response.data
                        }, () => this.switchView());
                    });
            }).catch(followersErr => {
                this.setState({
                    followers:[],
                    following:[],
                    error:true,
                    errorMessage: followersErr.response.data
                }, () => this.switchView());
            });


    }

    filterNotFollowing = (follower, following) => {
        let gitHubApi = new GitHubApi();
        let results = gitHubApi.filterNotFollowing(follower, following);
        this.setState({
            notFollowing: results[0]
        });
        this.setState({
            notFollowers: results[1]
        });
    }

    changeType = type => {
        this.setState({
            compType: type
        }, () => this.switchView())
    }

    switchView() {
        var gitHubApi = new GitHubApi();
        this.itemToShow = gitHubApi.switchView(this.state);
        this.filterNotFollowing(this.state.followers, this.state.following);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 className="text-center">GitHub User Followers - Insights</h1>
                </div>
                <div className="row">
                    <form onSubmit={this.getUserData.bind(this)}>
                        <input type="text" placeholder="github username" ref="username"></input>
                        <button type="submit"
                            className="btn btn-primary">Search</button>
                    </form>
                </div>

                <div className="row nav nav-tabs mt-5 mb-1">
                    <li className="nav-item mr-1">
                        <a className={"nav-link " + (this.state.compType === 0 ? "active" : "")} href="/#" onClick={() => this.changeType(0)}>Followers({this.state.followers.length})</a>
                    </li>
                    <li className="nav-item mr-1">
                        <a className={"nav-link " + (this.state.compType === 1 ? "active" : "")} href="/#" onClick={() => this.changeType(1)}>Following({this.state.following.length})</a>
                    </li>
                    <li className="nav-item mr-1">
                        <a className={"nav-link " + (this.state.compType === 2 ? "active" : "")} href="/#" onClick={() => this.changeType(2)}>Non-Followers({this.state.notFollowers.length})</a>
                    </li>
                    <li className="nav-item mr-1">
                        <a className={"nav-link " + (this.state.compType === 3 ? "active" : "")} href="/#" onClick={() => this.changeType(3)}>Not-Following({this.state.notFollowing.length})</a>
                    </li>
                </div>
                <div>
                    {this.itemToShow}
                </div>
            </div>
        )
    }
}

export default User;