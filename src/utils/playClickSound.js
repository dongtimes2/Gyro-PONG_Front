import click from '../audios/click.mp3';

const playClickSound = () => {
  const clickSound = new Audio(click);
  clickSound.play();
};

export default playClickSound;
