import React from 'react'

function verifyEmpty(str){
    if(str)
    {
        if(str.toString()==='')
        {
            return 'Nil'
        }
        else{   
            return str
        }
    }
    else{
        return 'Nil'
    }
}


function Roomcard(props){
        return(
            <div>
                <div className="flip-card">
                <div className="card" style={{width: "25rem"}}>
                    <div className="flip-card-inner">
                        <div className="card-header bg-dark text-light">
                            Room Number :       {props.room.roomId}
                        </div>
                        <div className="card-body flip-card-front">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>Guest name :</b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.userName)}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>In Persons :</b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.inPersons)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body flip-card-back">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>Check In Date :</b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.checkInDate)}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>Check Out Date :</b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.expectedCheckOutDate)}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-sm  btn-outline-dark" onClick={props.viewDetails}>View Guest Details</button>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-sm  btn-outline-dark">Vacate Room</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
}

export default Roomcard