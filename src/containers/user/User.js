import React, { Component } from 'react';
import axios from '../../shared/axios';
import Followers from './followers/Followers';
class User extends Component {
    state = {
        followers: [],
        following: [],
        notFollowers: [],
        notFollowing: [],
        compType: 0
    }
    getUserData = (event) => {
        event.preventDefault();
        const username = this.refs.username.value;
        axios.get(`users/${username}/followers`)
            .then(resp => {
                this.setState({
                    followers: resp.data
                }, () => this.switchView());
            });
        axios.get(`users/${username}/following`)
            .then(resp => {
                this.setState({
                    following: resp.data
                }, () => this.switchView());
            });
    }

    filterNotFollowing = (follower, following) => {
        let result = [];
        for (let i = 0; i < follower.length; i++) {
            let isFollowing = false;
            for (let j = 0; j < following.length; j++) {
                if (follower[i].login === following[j].login) {
                    isFollowing = true;
                    break;
                }
            }
            if (!isFollowing)
                result.push(follower[i]);
        }
        this.setState({
            notFollowing: result
        });

        let result2 = [];
        for (let i = 0; i < following.length; i++) {
            let isFollowing = false;
            for (let j = 0; j < follower.length; j++) {
                if (following[i].login === follower[j].login) {
                    isFollowing = true;
                    break;
                }
            }
            if (!isFollowing)
                result2.push(following[i]);
        }

        this.setState({
            notFollowers: result2
        });
    }

    changeType = type => {
        this.setState({
            compType: type
        }, () => this.switchView())

    }
    itemToShow = "";

    switchView() {
        switch (this.state.compType) {
            case 0:
                this.filterNotFollowing(this.state.followers, this.state.following);
                this.itemToShow = <Followers data={this.state.followers}></Followers>;
                break;
            case 1:
                this.filterNotFollowing(this.state.followers, this.state.following);
                this.itemToShow = <Followers data={this.state.following}></Followers>;
                break;
            case 2:
                this.filterNotFollowing(this.state.followers, this.state.following);
                this.itemToShow = <Followers data={this.state.notFollowers}></Followers>;
                break;
            case 3:
                this.filterNotFollowing(this.state.followers, this.state.following);
                this.itemToShow = <Followers data={this.state.notFollowing}></Followers>;
                break;
            default:
                this.itemToShow = ""
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="h1">GitHub User Followers</div>
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
                        <a className={"nav-link "+ (this.state.compType === 1 ? "active" : "")} href="/#" onClick={() => this.changeType(1)}>Following({this.state.following.length})</a>
                    </li>
                    <li className="nav-item mr-1">
                        <a className={"nav-link "+ (this.state.compType === 2 ? "active" : "")} href="/#" onClick={() => this.changeType(2)}>Non-Followers({this.state.notFollowers.length})</a>
                    </li>
                    <li className="nav-item mr-1">
                        <a className={"nav-link "+ (this.state.compType === 3 ? "active" : "")} href="/#" onClick={() => this.changeType(3)}>Not-Following({this.state.notFollowing.length})</a>
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