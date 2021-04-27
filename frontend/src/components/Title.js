import React from 'react';
import  "./Title.scss";

const Title = props => {
  return(
    <div className ="Title">
        <h1>
            {props.title} ({props.count})
        </h1>
    </div>
  );
}

export default Title;