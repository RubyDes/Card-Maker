import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import TextComponent from './TextComponent'

const Texts = (props: StateProps) => {
    return ( 
        <>
        {
            (props.ReducerText.arr.length > 0) ? 
                props.ReducerText.arr.map((item, index) => <TextComponent 
                        key={index}
                        index={index}
                        text={props.ReducerText.arr[index]} 
                        posX={props.ReducerText.arr[index].x}
                        posY={props.ReducerText.arr[index].y}
                    /> ) : undefined
        }
        </>
    )
}

type StateProps = ReturnType<typeof mapStateToProps>

function mapStateToProps(state: RootState) {
    return {
        ReducerText: state.ReducerText
    }
}

export default connect(mapStateToProps)(Texts);