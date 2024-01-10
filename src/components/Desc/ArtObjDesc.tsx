/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { connect, useSelector } from "react-redux";
import { insertCircle, insertHeart } from "../../store/figuresReducer";
import { RootState } from "../../store/store";
import styles from "./Desc.module.css";

const DescArtObj = (props: Props) => {
  const visibleDescArtObj = useSelector(
    (state: RootState) => state.buttonsReducer.visibleDescArtObj,
  );

  return (
    <div
      className={styles.desc_art}
      style={visibleDescArtObj ? { display: "block" } : { display: "none" }}
    >
      <button className={styles.button} onClick={props.insertCircle}>
        Circle
      </button>
      <button className={styles.button} onClick={props.insertHeart}>
        Triangle
      </button>
    </div>
  );
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

function mapStateToProps(state: RootState) {
  return {};
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    insertCircle: () => dispatch(insertCircle()),
    insertHeart: () => dispatch(insertHeart()),
  };
};

export default connect(null, mapDispatchToProps)(DescArtObj);
