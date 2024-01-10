/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { connect, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Desc.module.css";

const DescSave = (props: Props) => {
  const visibleDescSave = useSelector(
    (state: RootState) => state.buttonsReducer.visibleDescSave,
  );

  async function downloadFile() {
    const fileName = "file";
    const json = JSON.stringify(props.newProject);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div
      className={styles.desc}
      style={visibleDescSave ? { display: "block" } : { display: "none" }}
    >
      <button className={styles.button} onClick={downloadFile}>
        Save to JSON
      </button>
    </div>
  );
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

function mapStateToProps(state: RootState) {
  return {
    newProject: {
      images: state.ReducerImg,
      texts: state.ReducerText.arr,
      figures: state.figuresReducer,
      background: state.backgroundReducer,
    },
  };
}

const mapDispatchToProps = (dispatch: Function) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DescSave);
