import React, {
  MutableRefObject, ReactNode, useRef,
} from 'react';
import {
  animated,
  useTransition,
} from 'react-spring';

const visibleStyle = {
  height: 'auto',
  opacity: 1,
  overflow: 'visible',
};
const hiddenStyle = {
  height: 0,
  opacity: 0,
  overflow: 'hidden',
};

function getElementHeight(ref: MutableRefObject<any>) {
  return ref.current ? ref.current.getBoundingClientRect().height : 0;
}

interface ISlideToogleContentProps {
  isVisible: boolean
  forceSlideIn?: boolean
  children: ReactNode
}

const SlideToogleContent = ({
  isVisible,
  forceSlideIn,
  children,
}: ISlideToogleContentProps): JSX.Element => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const isVisibleOnMount = useRef(isVisible && !forceSlideIn);

  const transitions = useTransition(isVisible, {
    enter: () => async (next) => {
      const height = getElementHeight(innerRef);

      if (height) {
        await next({
          height,
          opacity: 1,
          overflow: 'hidden',
        });
        await next(visibleStyle);
      }
    },
    leave: () => async (next) => {
      const height = getElementHeight(containerRef);
      if (height) {
        await next({
          height,
          overflow: 'hidden',
        });
        await next(hiddenStyle);
      }
    },
    from: isVisibleOnMount.current ? visibleStyle : hiddenStyle,
    unique: true,
  });

  return transitions((springProps, show, { key }) => {
    if (show) {
      return (
        <animated.div ref={containerRef} key={key} style={springProps}>
          <div ref={innerRef}>{children}</div>
        </animated.div>
      );
    }
    return null;
  });
};
SlideToogleContent.defaultProps = {
  forceSlideIn: false,
};

export default SlideToogleContent;
