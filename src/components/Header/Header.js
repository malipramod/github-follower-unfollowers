import React from 'react';
const header = (props) => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <span className="nav-link" href="/#">GitHub User Followers - Insights</span>
                    </li>
                </ul>
            </div>
            <div >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/malipramod/github-follower-unfollowers" rel="noopener noreferrer" target="_blank" >
                            <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" title="View Code on Github" alt="View on Github" width="30px" height="30px"></img></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default header;