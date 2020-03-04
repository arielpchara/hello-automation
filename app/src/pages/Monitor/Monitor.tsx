import React, { useState, useMemo, useEffect } from 'react'
import io from 'socket.io-client'
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
  const socket = useMemo(() => io.connect('http://localhost:8088'), [])
  const [load, setLoad] = useState({
    currentload: 0,
  })
  const [mem, setMem] = useState({
    used: 100,
    total: 100
  })
  useEffect(() => {
    console.log('load')
    socket.on('load', setLoad)
    socket.on('mem', setMem)
  }, [socket])

  return <Dash>
    <Box>
      <Gouge value={load.currentload} label={(v: number) => `${v.toFixed(1)}%`}/>
    </Box>
    <Box>
      <Gouge value={mem.used / mem.total * 100} label={(v: number) => `${v.toFixed(1)}%`}/>
    </Box>
  </Dash>
}