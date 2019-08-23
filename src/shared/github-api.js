import React from 'react';

import axios from './axios';
import Grid from '../containers/user/Grid/Grid';
import { defaultPageNo,defaultPageSize } from './config';
class GitHubApi {
    // defaultPageSize = 10;
    allFollowers = [];
    allFollowing = [];
    /**
     * Gets All following/followers
     * @param {string} username 
     * @param {string} follow : followers | following
     */
    getAllFollowers(username, follow) {
        let uri = `users/${username}/`;
        return this.executeAPI(uri,defaultPageSize, defaultPageNo, follow).then(resp => resp);
    }

    /**
     * API Execution logic to get Followers and Following
     * @param {string} uri 
     * @param {number} defaultPageSize 
     * @param {number} page 
     * @param {string} follow 
     */
    async executeAPI(uri,defaultPageSize, page, follow) {
        const resp = await axios.get(`${uri}${follow}?per_page=${defaultPageSize}&page=${page}`);
        page++;
        if (follow === "followers")
            this.allFollowers.push(resp.data);
        else if (follow === "following")
            this.allFollowing.push(resp.data);

        if (resp.data.length < defaultPageSize) {
            if (follow === "followers")
                return this.allFollowers.flat(Infinity);
            else if (follow === "following")
                return this.allFollowing.flat(Infinity);
        }
        return this.executeAPI(uri,defaultPageSize, page,follow);
    }

    /**
     * 
     * @param {string} follower 
     * @param {string} following
     */
    filterNotFollowing = (follower, following) => {
        let notFollowing = [];
        for (let i = 0; i < follower.length; i++) {
            let isFollowing = false;
            for (let j = 0; j < following.length; j++) {
                if (follower[i].login === following[j].login) {
                    isFollowing = true;
                    break;
                }
            }
            if (!isFollowing)
                notFollowing.push(follower[i]);
        }

        let notFollowers = [];
        for (let i = 0; i < following.length; i++) {
            let isFollowing = false;
            for (let j = 0; j < follower.length; j++) {
                if (following[i].login === follower[j].login) {
                    isFollowing = true;
                    break;
                }
            }
            if (!isFollowing)
                notFollowers.push(following[i]);
        }
        return [notFollowing, notFollowers];
    }

    /**
     * Switches the view
     * @param {object} state 
     */
    switchView(state) {
        let itemToShow = "No Information found";
        switch (state.compType) {
            case 0:
                itemToShow = <Grid data={state.followers} error={state.error} errorMessage={state.errorMessage}></Grid>;
                break;
            case 1:
                itemToShow = <Grid data={state.following} error={state.error} errorMessage={state.errorMessage}></Grid>;
                break;
            case 2:
                itemToShow = <Grid data={this.filterNotFollowing(state.followers, state.following)[1]} error={state.error} errorMessage={state.errorMessage}></Grid>;
                break;
            case 3:
                itemToShow = <Grid data={this.filterNotFollowing(state.followers, state.following)[0]} error={state.error} errorMessage={state.errorMessage}></Grid>;
                break;
            default:
                itemToShow = "No Information found";
        }
        return itemToShow;
    }
}

export default GitHubApi;