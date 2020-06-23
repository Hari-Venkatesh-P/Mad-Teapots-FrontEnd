import React from 'react'


function OrderedReceipeCards(props){

    return(
        <div>
            <div className="card" style={{width: "80%",marginTop:"20px",marginBottom:"20px",borderStyle: "solid",borderWidth:"2px",borderColor:"black"}}>
                <div className="card-header text-white bg-dark mb-3">Receipe no :  {props.index}</div>
                    <div className="card-body bg-light mb-3">
                        <div className="row">
                            <div className="col-md-3">
                                <h6 className="card-text" ><b>Name : </b></h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="card-text">{props.receipe.receipeName}</h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="card-text"><b>Quantity : </b></h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="card-text" >{props.receipe.receipeCount}</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <h6 className="card-text"><b>Price : </b></h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="card-text">{"$  " +props.receipe.receipePrice}</h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="card-text"><b>Total Price : </b></h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="card-text">{"$  " +((props.receipe.receipePrice)*(props.receipe.receipeCount))}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default OrderedReceipeCards