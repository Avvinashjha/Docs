import { Button } from "./components/Button";
import { Tooltip } from "./components/Tooltip/Tooltip";

const App = () => {
    const D:React.HTMLElementType = 'div' ;
    return <D>
     <Tooltip
  content="Save changes"
  placement="top"
>
  <Button>
    Save
  </Button>
</Tooltip>
    </D>
}

export default App;