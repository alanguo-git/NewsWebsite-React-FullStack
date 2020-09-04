import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader'
function Loading(){
    return(
        <div className="Loading">
            <BounceLoader css={"margin: 0 auto"} color={"#0000ff"} loading={"Loading"}/>
            <p>Loading</p>
        </div>
        
    );
}
export default Loading;