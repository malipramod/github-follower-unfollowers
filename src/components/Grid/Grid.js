import React from 'react';
import userNotFound from '../../media/404.PNG'

function grid (props){
        if (props.error) {
            return (
                <div>
                    <a href={props.errorMessage.documentation_url} target="_blank" rel="noopener noreferrer">
                        <h2 className="text-danger text-center">{props.errorMessage.message}</h2>
                        <img className="w-100" src={userNotFound} alt="404"></img>                    
                    </a>
                </div>
            )
        } else {
            return (
                <div className="row" style={{paddingLeft:15}}>{
                    props.data.map(user =>
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


export default grid;