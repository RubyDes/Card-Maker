import { useDispatch } from 'react-redux';
import styles from './Desc.module.css'

const TextAtr = (props: any) => {

    const dispatch = useDispatch();

    function getAttr (e: React.ChangeEvent<HTMLSelectElement>) {
        const attr = e.target.value;
        dispatch(props.getParam(attr));
    }

    return (
        <div>
            <p className={styles.label}>{props.title}</p>
            <select onChange={(e) => getAttr(e)} className={styles.select}>
                {props.arr.map((val: string) => <option key={val} value={val}>{val}</option>)}
            </select>
        </div>
    )
}

export default TextAtr;
