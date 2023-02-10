import React from 'react';

interface Props {
handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
value: string;
}

const Select: React.FC<Props> = (props) => {
return (
<select onChange={props.handleChange} value={props.value}>
<option value="7">Last 7 days</option>
<option value="15">Last 15 days</option>
<option value="30">Last 1 month</option>
</select>
);
};

export default Select;




