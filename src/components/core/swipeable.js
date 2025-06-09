/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/sort-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import {
  Animated, Easing, PanResponder, StyleSheet, View,
} from 'react-native'
import PropTypes from 'prop-types'

function noop() {}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
})

export default class Swipeable extends PureComponent {
  state = {
    pan: new Animated.ValueXY(),
    width: 0,
    lastOffset: { x: 0, y: 0 },
    leftActionActivated: false,
    rightActionActivated: false,
  };

  componentDidMount() {
    const { onPanAnimatedValueRef, onRef } = this.props
    onRef(this)
    onPanAnimatedValueRef(this.state.pan)
  }

  componentWillUnmount() {
    this._unmounted = true
  }

  recenter = (
    animationFn = this.props.swipeReleaseAnimationFn,
    animationConfig = this.props.swipeReleaseAnimationConfig,
    onDone,
  ) => {
    const { pan } = this.state

    this.setState({
      lastOffset: { x: 0, y: 0 },
      leftActionActivated: false,
      rightActionActivated: false,
    })

    pan.flattenOffset()

    animationFn(pan, animationConfig).start(onDone)
  };

  _unmounted = false;

  _handlePan = Animated.event([null, {
    dx: this.state.pan.x,
    dy: this.state.pan.y,
  }], { useNativeDriver: false });

  _handleMoveShouldSetPanResponder = (event, gestureState) => (
    Math.abs(gestureState.dx) > this.props.swipeStartMinDistance
  );

  _handlePanResponderStart = (event, gestureState) => {
    const { lastOffset, pan } = this.state

    pan.setOffset(lastOffset)
    this.props.onSwipeStart(event, gestureState, this)
  };

  _handlePanResponderMove = (event, gestureState) => {
    const {
      leftActionActivationDistance,
      onLeftActionActivate,
      onLeftActionDeactivate,
      rightActionActivationDistance,
      onRightActionActivate,
      onRightActionDeactivate,
      onSwipeMove,
    } = this.props
    const {
      lastOffset,
      leftActionActivated,
      rightActionActivated,
    } = this.state
    const { dx } = gestureState
    const x = dx + lastOffset.x
    const canSwipeRight = this._canSwipeRight()
    const canSwipeLeft = this._canSwipeLeft()

    let nextLeftActionActivated = leftActionActivated
    let nextRightActionActivated = rightActionActivated

    this._handlePan(event, gestureState)
    onSwipeMove(event, gestureState, this)

    if (!leftActionActivated && canSwipeRight && x >= leftActionActivationDistance) {
      nextLeftActionActivated = true
      onLeftActionActivate(event, gestureState, this)
    }

    if (leftActionActivated && canSwipeRight && x < leftActionActivationDistance) {
      nextLeftActionActivated = false
      onLeftActionDeactivate(event, gestureState, this)
    }

    if (!rightActionActivated && canSwipeLeft && x <= -rightActionActivationDistance) {
      nextRightActionActivated = true
      onRightActionActivate(event, gestureState, this)
    }

    if (rightActionActivated && canSwipeLeft && x > -rightActionActivationDistance) {
      nextRightActionActivated = false
      onRightActionDeactivate(event, gestureState, this)
    }

    const needsUpdate = nextLeftActionActivated !== leftActionActivated
      || nextRightActionActivated !== rightActionActivated

    if (needsUpdate) {
      this.setState({
        leftActionActivated: nextLeftActionActivated,
        rightActionActivated: nextRightActionActivated,
      })
    }
  };

  _handlePanResponderEnd = (event, gestureState) => {
    const {
      onLeftActionRelease,
      onLeftActionDeactivate,
      onRightActionRelease,
      onRightActionDeactivate,
      onSwipeRelease,
    } = this.props
    const {
      leftActionActivated,
      rightActionActivated,
      pan,
    } = this.state
    const animationFn = this._getReleaseAnimationFn()
    const animationConfig = this._getReleaseAnimationConfig()

    onSwipeRelease(event, gestureState, this)

    if (leftActionActivated) {
      onLeftActionRelease(event, gestureState, this)
    }

    if (rightActionActivated) {
      onRightActionRelease(event, gestureState, this)
    }

    this.setState({
      lastOffset: { x: animationConfig.toValue.x, y: animationConfig.toValue.y },
      leftActionActivated: false,
      rightActionActivated: false,
    })

    pan.flattenOffset()

    animationFn(pan, animationConfig).start(() => {
      if (this._unmounted) {
        return
      }

      const {
        onLeftActionComplete,
        onRightActionComplete,
        onSwipeComplete,
      } = this.props

      onSwipeComplete(event, gestureState, this)

      if (leftActionActivated) {
        onLeftActionComplete(event, gestureState, this)
        onLeftActionDeactivate(event, gestureState, this)
      }

      if (rightActionActivated) {
        onRightActionComplete(event, gestureState, this)
        onRightActionDeactivate(event, gestureState, this)
      }
    })
  };

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderStart,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
    onPanResponderTerminationRequest: this._handlePanResponderEnd,
  });

  _handleLayout = ({ nativeEvent: { layout: { width } } }) => this.setState({ width });

  _canSwipeRight() {
    return this.props.leftContent
  }

  _canSwipeLeft() {
    return this.props.rightContent
  }

  _getReleaseAnimationFn() {
    const {
      leftActionReleaseAnimationFn,
      rightActionReleaseAnimationFn,
      swipeReleaseAnimationFn,
    } = this.props
    const {
      leftActionActivated,
      rightActionActivated,
    } = this.state

    if (leftActionActivated && leftActionReleaseAnimationFn) {
      return leftActionReleaseAnimationFn
    }

    if (rightActionActivated && rightActionReleaseAnimationFn) {
      return rightActionReleaseAnimationFn
    }

    return swipeReleaseAnimationFn
  }

  _getReleaseAnimationConfig() {
    const {
      leftActionReleaseAnimationConfig,
      rightActionReleaseAnimationConfig,
      swipeReleaseAnimationConfig,
    } = this.props
    const {
      leftActionActivated,
      rightActionActivated,
    } = this.state

    if (leftActionActivated && leftActionReleaseAnimationConfig) {
      return leftActionReleaseAnimationConfig
    }

    if (rightActionActivated && rightActionReleaseAnimationConfig) {
      return rightActionReleaseAnimationConfig
    }

    return swipeReleaseAnimationConfig
  }

  render() {
    const {
      children,
      contentContainerStyle,
      leftContainerStyle,
      rightContainerStyle,
      style,
      ...props
    } = this.props
    const { pan, width } = this.state
    const canSwipeLeft = this._canSwipeLeft()
    const canSwipeRight = this._canSwipeRight()
    const transform = [{
      translateX: pan.x.interpolate({
        inputRange: [canSwipeLeft ? -width : 0, canSwipeRight ? width : 0],
        outputRange: [
          canSwipeLeft ? -width + StyleSheet.hairlineWidth : 0,
          canSwipeRight ? width - StyleSheet.hairlineWidth : 0,
        ],
        extrapolate: 'clamp',
      }),
    }]

    return (
      <View onLayout={this._handleLayout} style={[styles.container, style]} {...this._panResponder.panHandlers} {...props}>
        {canSwipeRight && (
          <Animated.View style={[{ transform, marginLeft: -width, width }, leftContainerStyle]}>
            {this.props.leftContent}
          </Animated.View>
        )}
        <Animated.View style={[{ transform }, styles.content, contentContainerStyle]}>
          {children}
        </Animated.View>
        {canSwipeLeft && (
          <Animated.View style={[{ transform, marginRight: -width, width }, rightContainerStyle]}>
            {this.props.rightContent}
          </Animated.View>
        )}
      </View>
    )
  }
}

Swipeable.propTypes = {
  children: PropTypes.node.isRequired,
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
  onLeftActionActivate: PropTypes.func,
  onLeftActionDeactivate: PropTypes.func,
  onLeftActionRelease: PropTypes.func,
  onLeftActionComplete: PropTypes.func,
  leftActionActivationDistance: PropTypes.number,
  leftActionReleaseAnimationFn: PropTypes.func,
  leftActionReleaseAnimationConfig: PropTypes.object,
  onRightActionActivate: PropTypes.func,
  onRightActionDeactivate: PropTypes.func,
  onRightActionRelease: PropTypes.func,
  onRightActionComplete: PropTypes.func,
  rightActionActivationDistance: PropTypes.number,
  rightActionReleaseAnimationFn: PropTypes.func,
  rightActionReleaseAnimationConfig: PropTypes.object,
  onSwipeStart: PropTypes.func,
  onSwipeMove: PropTypes.func,
  onSwipeRelease: PropTypes.func,
  onSwipeComplete: PropTypes.func,
  swipeReleaseAnimationFn: PropTypes.func,
  swipeReleaseAnimationConfig: PropTypes.object,
  onRef: PropTypes.func,
  onPanAnimatedValueRef: PropTypes.func,
  swipeStartMinDistance: PropTypes.number,
  style: PropTypes.object,
  leftContainerStyle: PropTypes.object,
  rightContainerStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
}

Swipeable.defaultProps = {
  leftContent: null,
  rightContent: null,
  onLeftActionActivate: noop,
  onLeftActionDeactivate: noop,
  onLeftActionRelease: noop,
  onLeftActionComplete: noop,
  leftActionActivationDistance: 125,
  leftActionReleaseAnimationFn: null,
  leftActionReleaseAnimationConfig: null,
  onRightActionActivate: noop,
  onRightActionDeactivate: noop,
  onRightActionRelease: noop,
  onRightActionComplete: noop,
  rightActionActivationDistance: 125,
  rightActionReleaseAnimationFn: null,
  rightActionReleaseAnimationConfig: null,
  onSwipeStart: noop,
  onSwipeMove: noop,
  onSwipeRelease: noop,
  onSwipeComplete: noop,
  swipeReleaseAnimationFn: Animated.timing,
  swipeReleaseAnimationConfig: {
    toValue: { x: 0, y: 0 },
    duration: 250,
    easing: Easing.elastic(0.5),
    useNativeDriver: false,
  },
  onRef: noop,
  onPanAnimatedValueRef: noop,
  swipeStartMinDistance: 15,
  style: {},
  leftContainerStyle: {},
  rightContainerStyle: {},
  contentContainerStyle: {},
}
