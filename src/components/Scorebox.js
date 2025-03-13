import { Badge } from 'react-bootstrap';

function ScoreBox({ value }) {
  return (
    <Badge className="score-box p-3 fs-3 bg-secondary bg-opacity-25">
      {value === "" || value === null ? "-": value}
    </Badge>
  );
}

export default ScoreBox;