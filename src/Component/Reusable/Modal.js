import React from 'react';

const Modal = (props) => {
    return ( 
        <div>
                <br />
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Open modal
                </button>

                <div className="modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">


                            <div className="modal-header">
                                <h4 className="modal-title">Customer Image</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>


                            <div className="modal-body">
                                <img src={props.img} class="rounded-circle" alt="Cinque Terre" width="304px" height="236px" />
                                {/* <div className="card">
                                    
                                    <div className="card-body">
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div> */}
                            </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
     );
}
 
export default Modal ;