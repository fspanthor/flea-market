import { memo, useEffect, useRef } from "react";
import { useState } from "react";
import { GameStateEnum } from "../../app/constants";
import { useAppSelector } from "../../app/hooks";
import { selectGameState } from "../../redux/slices/fleaMarketSlice";
import fleaMarketTheme from "../../assets/audio/flea-market-theme.mp3";
import fleaMarketMain from "../../assets/audio/flea-market-main.mp3";

const AudioPlayer = () => {
  const [muted, setMuted] = useState(false);

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
    <div>
      <button onClick={() => setMuted(!muted)}>
        {muted ? "unmute" : "mute"}
      </button>
      <audio autoPlay={true} loop muted={muted} ref={audioPlayerRef}>
        <source src={audioTrack} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default memo(AudioPlayer);
