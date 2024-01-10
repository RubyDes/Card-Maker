/* eslint-disable react/jsx-no-undef */
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import Circle from "./Circle";
import Triangle from "./Triangle";
import React from "react";

const Figures = (props: Props) => {
  return (
    <>
      {props.figures.arr.length > 0
        ? props.figures.arr.map((item, index) => {
            switch (item.name) {
              case "circle":
                return (
                  <Circle
                    key={index}
                    posX={props.figures.arr[index].x}
                    posY={props.figures.arr[index].y}
                    index={index}
                    // width={props.figures.arr[index].width}
                  />
                );
              case "triangle":
                return (
                  <Triangle
                    key={index}
                    posX={props.figures.arr[index].x}
                    posY={props.figures.arr[index].y}
                    index={index}
                  />
                );
            }
          })
        : undefined}
    </>
  );
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

function mapStateToProps(state: RootState) {
  return {
    figures: state.figuresReducer,
  };
}

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Figures);
