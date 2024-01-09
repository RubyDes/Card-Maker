import { connect } from 'react-redux';
import './CanvasModules.css';
import { RootState } from '../../store/store';
import Figures from './Figures';
import Images from './Images';
import Texts from './Texts';
import React from 'react';

const Canvas = (props: StateProps) => {

    return (
        <div className='easel'>
            <div className='canvas_page' style={{
            backgroundImage: `url(${props.BGImage})`,
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            backgroundColor: props.colorBG, 
            width: props.widthBG + 'px', 
            height: props.heightBG + 'px',
            // position: "relative"
        }}>
            <Images />
            <Texts />
            <Figures />
        </div>
        </div>
    )
}

type StateProps = ReturnType<typeof mapStateToProps>

function mapStateToProps(state: RootState) {
    return {
        colorBG: state.backgroundReducer.bgColor,
        widthBG: state.backgroundReducer.width,
        heightBG: state.backgroundReducer.height,
        BGImage: state.backgroundReducer.BGImage
    }
}

export default connect(mapStateToProps)(Canvas);