import React, { Component } from 'react';


class Followers extends Component {
    render() {
        if (this.props.data.length <= 0) {
            return (<div>No Data</div>)
        } else {
            return (
                <div className="row">{
                    this.props.data.map(user =>
                        <div className="card col-sm-3 p-2" key={user.login}>
                            <img className="card-img-top w-100" src={user.avatar_url} alt={user.login}></img>
                            <div className="card-body">
                                <h4 className="card-title">{user.login}</h4>
                                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">See Profile</a>
                            </div>
                        </div>
                    )
                }
                </div>
            )
        }
    }
}

export default Followers;