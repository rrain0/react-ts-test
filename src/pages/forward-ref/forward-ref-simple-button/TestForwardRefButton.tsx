import ForwardRefButton from "./ForwardRefButton";
import {ReactMemoTyped} from "src/utils/utilsReact";


const TestForwardRefButton = () => {
  
  const onClick: React.MouseEventHandler<HTMLButtonElement> = ev => {
    alert('I am button with forwarded ref')
  }
  
  return <div>
    <ForwardRefButton onClick={onClick}>
      I am button with forwarded ref
    </ForwardRefButton>
  </div>
}
export default ReactMemoTyped(TestForwardRefButton)
