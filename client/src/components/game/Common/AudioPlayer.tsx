import { memo, useEffect, useRef } from "react";
import { useState } from "react";
import { GameStateEnum } from "../../../app/constants";
import { useAppSelector } from "../../../app/hooks";
import { selectGameState } from "../../../redux/slices/fleaMarketSlice";
import fleaMarketTheme from "../../../assets/audio/flea-market-theme.mp3";
import fleaMarketMain from "../../../assets/audio/flea-market-main.mp3";
import styled from "styled-components";

const StyledAudioPlayer = styled.div`
  justify-content: center;
  align-content: center;
  flex-direction: column;
  display: flex;
  text-align: center;
  cursor: pointer;
  width: 60px;
  height: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
`;

const AudioPlayer = () => {
  const [muted, setMuted] = useState(true);

  const gameState = useAppSelector(selectGameState);
  const [audioTrack, setAudioTrack] = useState();
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioPlayerRef.current === null) {
      return;
    }
    if (gameState === GameStateEnum.INSTRUCTIONS) {
      setAudioTrack(fleaMarketTheme);
      audioPlayerRef.current.load();
      return;
    }
    if (audioTrack === fleaMarketMain) {
      return;
    } else {
      setAudioTrack(fleaMarketMain);
      audioPlayerRef.current.load();
      return;
    }
  }, [audioTrack, gameState]);

  return (
    <StyledAudioPlayer>
      <div onClick={() => setMuted(!muted)}>{muted ? "unmute" : "mute"}</div>
      <audio autoPlay={true} loop muted={muted} ref={audioPlayerRef}>
        <source src={audioTrack} type="audio/mpeg" />
      </audio>
    </StyledAudioPlayer>
  );
};

export default memo(AudioPlayer);
