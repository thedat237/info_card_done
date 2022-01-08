import { InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap'
import socialNetWork from '../../data/socialNetWork'

export default function DropDownLink(props) {
    return (
        <InputGroup className="mb-3" key={props.key}>
            <DropdownButton
                variant="outline-secondary"
                // title={renderName}
                title={props.title}
            >
                {socialNetWork.map(items => (
                    <Dropdown.Item 
                        key={items.id} 
                        onClick={() => props.onClick(items)}
                    >
                        {items.name}
                    </Dropdown.Item>
                    
                ))}
            </DropdownButton>
            <FormControl 
                name={props.nameInput}
                value={props.valueLink} 
                onChange={props.onChangeLink}
            />
        </InputGroup>
    )
}
