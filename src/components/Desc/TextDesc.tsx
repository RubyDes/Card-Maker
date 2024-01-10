/* eslint-disable @typescript-eslint/ban-types */
import { connect, useSelector } from "react-redux";
import {
  getFontColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  insertText,
} from "../../store/textReducer";
import { RootState } from "../../store/store";
import styles from "./Desc.module.css";
import TextAtr from "./TextAtr";
import { fontFamilies, fontSizes, fontWeights } from "./textConstants";

const DescText = (props: DispatchProps) => {
  const visibleDescText = useSelector(
    (state: RootState) => state.buttonsReducer.visibleDescText,
  );

  return (
    <div
      className={styles.desc}
      style={visibleDescText ? { display: "block" } : { display: "none" }}
    >
      <button className={styles.button} onClick={props.insertText}>
        Add Text
      </button>

      <TextAtr arr={fontSizes} getParam={getFontSize} title="Font size" />
      <TextAtr
        arr={fontFamilies}
        getParam={getFontFamily}
        title="Font family"
      />
      <TextAtr arr={fontWeights} getParam={getFontWeight} title="Font weight" />

      <p className={styles.label}>Color text:</p>
      <input
        type="color"
        onChange={(e) => props.getFontColor(e.target.value)}
      />
    </div>
  );
};

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    insertText: () => dispatch(insertText()),
    getFontSize: (newFontSize: string) => dispatch(getFontSize(newFontSize)),
    getFontFamily: (newFontFamily: string) =>
      dispatch(getFontFamily(newFontFamily)),
    getFontWeight: (newFontWeight: string) =>
      dispatch(getFontWeight(newFontWeight)),
    getFontColor: (newFontColor: string) =>
      dispatch(getFontColor(newFontColor)),
  };
};

export default connect(null, mapDispatchToProps)(DescText);
