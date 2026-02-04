import '../styles/Button.css'

interface Props {
  text: string;
  onClick: () => void;
}

export default function LearnMoreButton({ text, onClick }: Props) {
  return (
    <button onClick={onClick} className="button">
      {text}
    </button>
  );
}
