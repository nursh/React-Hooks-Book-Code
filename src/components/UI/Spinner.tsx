import {FaSpinner} from "react-icons/fa";

type Props = object;

export default function Spinner (props: Props) {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading"/>
    </span>
  );
}