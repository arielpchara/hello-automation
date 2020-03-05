import React, {useRef, useEffect} from 'react'

import SvgGauge from 'svg-gauge'

interface GougeProps {
  value: number
  [key: string]: any
}

const defaultOptions = {
  animDuration: 1,
  showValue: true,
  initialValue: 0,
  max: 100
};

export function Gouge(props: GougeProps) {
  const gaugeEl = useRef(null);
  const gaugeRef = useRef<typeof SvgGauge>(null);
  useEffect(() => {
    if (!gaugeRef.current) {
      const options = { ...defaultOptions, ...props };
      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current.setValue(props.value || 0);
    }
    gaugeRef.current.setValueAnimated(props.value, 1.5);
  }, [props]);
  return <div ref={gaugeEl} className="gauge-container" />
}