import DescArtObj from "../Desc/ArtObjDesc";
import DescInsertPic from "../Desc/ImgDesc";
import DescNewCanvas from "../Desc/ClearCanvasDesc";
import DescSave from "../Desc/SaveDesc";
import DescText from "../Desc/TextDesc";
import style from "./Description.module.css";

const Description = () => {
  return (
    <div id="desc" className={style.description}>
      <DescText />
      <DescArtObj />
      <DescInsertPic />
      <DescSave />
      <DescNewCanvas />
    </div>
  );
};

export default Description;
