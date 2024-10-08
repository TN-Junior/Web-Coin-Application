import React from 'react';
import "../Dashboard/datadisplay.css";

const datadisplay = ({ userName }) => {
    return (
            <div className="square">
                <div className="box">
                    <div className="box-title">Receitas</div>
                </div>
                <div className="box">
                    <div className="box-title">Despesas</div>
                </div>

                <div className="box">
                    <div className="box-title">Finalizadas(Pagas)</div>
                </div>
            </div>
        
    );
};

export default datadisplay;