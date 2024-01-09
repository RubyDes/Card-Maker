import style from './Workspace.module.css';
// import Easel from "../Easel/Easel";
import Canvas from '../Canvas/Canvas';
import Description from "../Description/Description";
import Buttons from "../Buttons/Buttons";

const Workspace = () => {
    return (
        <div className={style.workspace}>
            <Buttons />
            <Description/>
            <Canvas/>
        </div>
    )
}

export default Workspace;