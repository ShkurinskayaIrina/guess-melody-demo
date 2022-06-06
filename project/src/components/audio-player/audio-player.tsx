import {Fragment, useState, useEffect, useRef, useCallback} from 'react';

type AudioPlayerProps = {
  isPlaying: boolean;
  src: string;
  onPlayButtonClick: () => void;
}

function AudioPlayer({isPlaying, src, onPlayButtonClick}: AudioPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioCallback = useCallback(
    () => {
      if (audioRef.current !== null && isLoading) {
        audioRef.current.onloadeddata = () => setIsLoading(false);
      }
    },
    [isLoading]);

  useEffect(() => {
    audioCallback();
  }, [audioCallback]);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  return (
    <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? 'pause' : 'play'}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        <audio src={src} ref={audioRef} data-testid="audio"/>
      </div>
    </Fragment>
  );
}

export default AudioPlayer;
