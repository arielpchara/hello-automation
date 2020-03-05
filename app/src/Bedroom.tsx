import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from "mqtt";

const Light = styled.button<{ state: string }>`
  border: none;
  background: ${({ state }: any) => (state === "ON" ? "orange" : "grey")};
  padding: 2em;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  outline: none;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
`;

const Center = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`

const stat = "stat/quarto/POWER";
const cmnd = "cmnd/quarto/POWER";

const client = connect(`ws://192.168.0.104:1884`);

export function Bedroom() {
  const [state, setState] = useState();
  useEffect(() => {
    client.subscribe(stat);
    client.on("message", (topic, payload: string) => {
      console.log(topic, payload)
      if (stat === topic) {
        setState(payload.toString());
      }
    });
    client.publish('cmnd/quarto/POWER', '')
  }, []);
  const handleClick = useCallback(() => {
    client.publish(cmnd, 'TOGGLE')
  }, [])
  return (
    <Center>
    {state === undefined ? <>loading...</> : <Light state={state} onClick={handleClick}>Light is: {state}</Light>}
    </Center>
  )
}


