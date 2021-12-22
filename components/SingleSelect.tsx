import Select from "react-select"
import prisma from "../lib/prisma"


type Props = {
    options: [],
    name: String
}

const SingleSelect: React.FC<Props> = (props) => {

return (
    <div>
        <h1>{props.name}</h1>
        <Select 
            options = {props.options}
        />
    </div>
  
);
};

export default SingleSelect;
