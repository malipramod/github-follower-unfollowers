import React, { Component } from 'react';

import GitHubApi from '../../shared/github-api';
import Header from '../../components/Header/Header';
import UserInfo from '../../components/UserInfo/UserInfo';
class Insight extends Component {
    state = {
        userInfo:{},
        followers: [],
        following: [],
        notFollowers: [],
        notFollowing: [],
        error: false,
        errorMessage: {},
        compType: 0
    }
    itemToShow = "";
    getUserData = (event) => {
        event.preventDefault();
        const username = this.refs.username.value;
        let gitHubApi = new GitHubApi();
        gitHubApi.getUserInfo(username)
        .then(userInfo=>this.setState({userInfo:userInfo}))
        .catch(err => this.setState({ error: true, errorMessage: err.response.data }))
        gitHubApi.getAllFollowers(username, 'followers')
            .then(followersResp => {
                gitHubApi.getAllFollowers(username, 'following')
                    .then(followingResp => {
                        this.setState({
                            followers: followersResp,
                            following: followingResp,
                            error: false,
                            errorMessage: {}
                        }, () => this.switchView());
                    }).catch(followingError => {
                        this.setState({
                            followers: [],
                            following: [],
                            error: true,
                            errorMessage: followingError.response.data
                        }, () => this.switchView());
                    });
            }).catch(followersErr => {
                this.setState({
                    followers: [],
                    following: [],
                    error: true,
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
        let profile = "";
        if (!this.state.error && Object.keys(this.state.userInfo).length > 0) {
            profile = <UserInfo userData={this.state.userInfo}></UserInfo>;
        }
        return (
            <div className="container">
                <div>
                    <Header></Header>
                </div>
                <div className="row" style={{ marginTop: 70 }}>
                    <form onSubmit={this.getUserData.bind(this)}>
                        <div className="form-inline">
                            <input className="form-control" type="text" placeholder="github username" ref="username"></input>
                            <button type="submit"
                                className="btn btn-primary">Search</button>
                        </div>

                    </form>
                </div>
                <div className="row">
                    <div className="col-md-3 text-center">
                        {profile}
                    </div>
                    <div className="col-md-9 text-center">
                        <div className="nav nav-tabs" >
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
                            {this.itemToShow}
                    </div>

                </div>

            </div>
        )
    }
}

export default Insight;