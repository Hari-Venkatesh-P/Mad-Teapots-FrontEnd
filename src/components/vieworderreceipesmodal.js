import React from 'react'

function ViewOrderReceipeModal(props){
    return(
        <div>
                <div className="modal fade bd-example-modal-lg" id="orderReceipeModal"  role="dialog" aria-labelledby="orderReceipeModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Ordered Receipes</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3">
                                       <h6><b>Receipe Name</b></h6>
                                    </div>
                                    <div className="col-md-3">
                                        <h6><b>Reciepe Price</b></h6>
                                    </div>
                                    <div className="col-md-3">
                                        <h6><b>Receipe Quantity</b></h6>
                                    </div>
                                    <div className="col-md-3">
                                        <h6><b>Total Receipe Price</b></h6>
                                    </div>
                                </div>    
                                {
                                props.receipes.map( receipe => { 
                                    return(
                                        <div key={receipe._id}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <h6>{receipe.receipeName}</h6>
                                                </div>
                                                <div className="col-md-3">
                                                    <h6>{" $ "+receipe.receipePrice}</h6>
                                                </div>
                                                <div className="col-md-3">
                                                    <h6>{receipe.receipeCount}</h6>
                                                </div>
                                                <div className="col-md-3">
                                                    <h6>{" $ "+parseInt(receipe.receipeCount)*parseInt(receipe.receipePrice)}</h6>
                                                </div>
                                            </div>        
                                        </div>   
                                    )
                                })  
                                }
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

export default ViewOrderReceipeModal