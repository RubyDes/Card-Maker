import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import Img from './Img';

const Images = (props: StateProps) => {
    
    return ( 
        <>
        {
            (props.ReducerImg.arr.length > 0) ? 
                props.ReducerImg.arr.map((item, index) => <Img 
                        key={index}
                        index={index} 
                        src={props.ReducerImg.arr[index].src}
                        posX={props.ReducerImg.arr[index].x}
                        posY={props.ReducerImg.arr[index].y}
                        widthImg={props.ReducerImg.arr[index].width}
                        heightImg={props.ReducerImg.arr[index].height}
                    />) : undefined
        }
        </>
    )
}

type StateProps = ReturnType<typeof mapStateToProps>

function mapStateToProps(state: RootState) {
    return {
        ReducerImg: state.ReducerImg
    }
}

export default connect(mapStateToProps)(Images);