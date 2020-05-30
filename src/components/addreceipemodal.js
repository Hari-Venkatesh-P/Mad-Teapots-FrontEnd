import React from 'react'


function AddReceipeModal(props){
    return(
        <div>
                <div className="modal fade" id="addReceipeModal"  role="dialog" aria-labelledby="addReceipeModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addReceipeModal">Receipe Details : </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
		                            <h6>Receipe Name : </h6>
                                </div>
                                <div className="col-md-6">
                                    <br/>
		                            <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter Name of the Receipe" onChange={props.onchangeReceipeName}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
		                            <h6>Receipe Quantity : </h6>
                                </div>
                                <div className="col-md-6">
                                    <br/>
		                            <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter Quantity of the Receipe" onChange={props.onchangeReceipeQuanity}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
		                            <h6>Receipe Price : </h6>
                                </div>
                                <div className="col-md-6">
                                    <br/>
		                            <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter Price of the Receipe" onChange={props.onchangeReceipePrice}></input>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={props.addReceipe} >Add</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AddReceipeModal