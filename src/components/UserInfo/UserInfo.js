import React from 'react';
import { faLocationArrow, faUserPlus, faUserClock, faCalendar, faCalendarCheck, faGlobe,faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const userInfo = (props) => {
    return (
        <div className="row pt-3 pb-3">
            <div className="card" key={props.userData.login}>
                <img className="card-img-top" src={props.userData.avatar_url} alt={props.userData.login}></img>
                <div className="card-body">
                    <div className="row">
                        <a style={{ paddingLeft: "40%" }} href={props.userData.html_url} target="_blank" rel="noopener noreferrer" title="Website">
                            <FontAwesomeIcon icon={faCode} size="1x" title="Github Profile" />
                        </a>
                        <a style={{ paddingLeft: "5%" }} href={props.userData.blog} target="_blank" rel="noopener noreferrer" title="Website">
                            <FontAwesomeIcon icon={faGlobe} size="1x" title="Visit Website" />
                        </a>
                        <h3 className="col-12 text-center">{props.userData.name}</h3>
                    </div>
                    <div className="row">
                        <span className="col-1"></span>
                        <span className="col-10"><FontAwesomeIcon icon={faLocationArrow} size="1x" title="Location" /> {props.userData.location}</span>
                        <span className="col-1"></span>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <span className="col-1"></span>
                        <span className="col-5" >
                            <a href={props.userData.html_url+'?tab=followers'} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faUserPlus} size="1x" title="Followers" /></a> {props.userData.followers}
                        </span>
                        <span className="col-5" >
                            <a href={props.userData.html_url+'?tab=following'} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faUserClock} size="1x" title="Following" /></a> {props.userData.following}
                        </span>
                        <span className="col-1"></span>
                    </div>
                    <hr></hr>
                    <div className="row">

                        <span className="col-1"></span>
                        <span className="col-10">
                            <FontAwesomeIcon icon={faCalendar} size="1x" title="Joined" /> {new Date(props.userData.created_at).toLocaleDateString(undefined, { day: '2-digit' }) + '-' + new Date(props.userData.created_at).toLocaleDateString(undefined, { month: 'short' }) + '-' + new Date(props.userData.created_at).toLocaleDateString(undefined, { year: 'numeric' })}
                        </span>
                        <span className="col-1"></span>
                    </div>
                    <div className="row">
                        <span className="col-1"></span>

                        <span className="col-10">
                            <FontAwesomeIcon icon={faCalendarCheck} size="1x" title="Last Updated on" /> {
                                new Date(props.userData.updated_at).toLocaleDateString(undefined, { day: '2-digit' }) + '-' + new Date(props.userData.updated_at).toLocaleDateString(undefined, { month: 'short' }) + '-' + new Date(props.userData.updated_at).toLocaleDateString(undefined, { year: 'numeric' })
                            }
                        </span>
                        <span className="col-1"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default userInfo;