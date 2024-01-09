/* eslint-disable @typescript-eslint/ban-types */
import { connect, useSelector } from 'react-redux';
import { createDefaultBG } from '../../store/backgroundReducer';
import { clearSvg } from '../../store/figuresReducer';
import { clearImages } from '../../store/imgReducer';
import { RootState } from '../../store/store';
import { clearTexts } from '../../store/textReducer';
import styles from './Desc.module.css'

const DescNewCanvas = (props :DispatchProps) => {

    const visibleDescNew = useSelector((state: RootState) => state.buttonsReducer.visibleDescNew);

    const ClearCanvas = () :void => {
        if (window.confirm('Clear Canvas?')) {
            props.createDefaultBG();
            props.clearImages();
            props.clearTexts();
            props.clearSvg();
        }
    }
    
    return (
        <div className={styles.desc} style={ visibleDescNew ? {display: "block"} : {display: "none"} }>
            <button className={styles.button} onClick={ClearCanvas}>Clear Canvas</button>
        </div>
    )
}

type DispatchProps = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: Function) => {
    return {
        createDefaultBG: () => dispatch(createDefaultBG()),
        clearImages: () => dispatch(clearImages()),
        clearTexts: () => dispatch(clearTexts()),
        clearSvg: () => dispatch(clearSvg())
    }
}

export default connect(null, mapDispatchToProps)(DescNewCanvas);