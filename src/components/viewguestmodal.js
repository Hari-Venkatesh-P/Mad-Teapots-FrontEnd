import React from 'react'
import "../styles/views.css"


function ViewGuestModal(props){
    return(
        <div>
                <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title display" id="exampleModalLabel">Guest Details : </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6 className="display">First Name : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6 className="display">{(props.guestdetails.firstName) }</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6 className="display">Last Name : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6 className="display">{(props.guestdetails.lastName)}</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6 className="display">City : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6 className="display">{(props.guestdetails.city)}</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6 className="display">Address : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6 className="display">{(props.guestdetails.address)}</h6>
                                     </div>
                                </div>
                                <div className="row">
                                     <div className="col-md-6">
                                        <h6 className="display">Mobile : </h6>
                                     </div>
                                     <div className="col-md-6">
                                        <h6 className="display">{(props.guestdetails.mobile)}</h6>
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