import React, { useState, useMemo, useEffect } from 'react'
import { connect } from "mqtt";
import styled from 'styled-components';
import { Gouge } from '../../components/Gouge';

const Dash = styled.div`
  display: flex;
`

// const Label = styled.div`
//   text-align: center;
// `

const Box = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
`

export function Monitor() {
  const client = useMemo(() => connect('ws://192.168.0.106:1884'), [])
  const [load, setLoad] = useState({
    currentload: 0,
  })
  const [mem, setMem] = useState({
    available: 0,
    total: 100
  })
  const [temp, setTemp] = useState({
    main: 0,
    max: 100
  })
  useEffect(() => {
    client.subscribe('board/load');
    client.subscribe('board/mem');
    client.subscribe('board/temp');
    client.on('message', (topic, payload) => {
      if ('board/load' === topic) {
        setLoad(JSON.parse(payload.toString()));
      }
      if ('board/mem' === topic) {
        setMem(JSON.parse(payload.toString()));
      }
      if ('board/temp' === topic) {
        setTemp(JSON.parse(payload.toString()));
      }
    });
  }, [client])

  return <Dash>
    <Box>
      <Gouge value={load.currentload} label={(v: number) => `${v.toFixed(1)}%`}/>
    </Box>
    <Box>
      <Gouge value={mem.available / mem.total * 100} label={(v: number) => `${v.toFixed(1)}%`}/>
    </Box>
    <Box>
      <Gouge value={temp.main} max={temp.max} />
    </Box>
  </Dash>
}