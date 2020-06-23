import React from 'react'

function verifyEmpty(str){
    if(str)
    {
        if(typeof str === 'string' || typeof str === 'number' )
        {
            if(str.toString()===''){
                return 'Nil'
            }else{   
                return str
            }
        }else{
            if(str.toString() !== 'false'){
                return 'Room Available'
            }else{   
                return 'Room not Available'
            }
        }
    }
    else{
        return 'Nil'
    }
}


function ViewGuestModal(props){
    console.log(props)
    return(
        <div>
                <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Guest Details : </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6>First Name : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6>{(props.guestdetails.firstName) }</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6>Last Name : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6>{(props.guestdetails.lastName)}</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6>City : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6>{(props.guestdetails.city)}</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6>Address : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6>{(props.guestdetails.address)}</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6>Mobile : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6>{(props.guestdetails.mobile)}</h6>
                                     </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ViewGuestModal