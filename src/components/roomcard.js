import React from 'react'

function Roomcard(props){

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
        return(
           
            <div>
                <div className="flip-card" style={{margin:"5px"}}>
                <div className="card">
                    <div className="flip-card-inner">  
                        <div className={"card-header text-light " + ((props.room.userName).toString() ==='' ? 'bg-success' : 'bg-danger')}>
                            Room Number :       {props.room.roomId}
                        </div>   
                        <div className="card-body flip-card-front">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>Guest name </b></p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.userName)}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>In Persons </b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.inPersons)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body flip-card-back">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>Check In Date </b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.checkInDate)}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="card-text"><b>Check Out Date </b>     </p>
                                </div>
                                <div className="col-md-6">
                                    <p className="card-text">{verifyEmpty(props.room.expectedCheckOutDate)}</p>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <div><button type="button" className="btn btn-sm  btn-outline-success" onClick={()=>{ props.getGuestDetails(props.room.roomId,props.room.checkInDate,props.room.userName) }} data-toggle="modal" data-target="#exampleModal">View Guest Details</button></div>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>{ props.vacateRoom(props.room.roomId,props.room.checkInDate,props.room.userName,props.room.roomType)}}>Vacate Room</button>
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