const Input = ({text, onChange, value}) => 
    <div>
        {text}: 
        <input type = "text" onChange = {onChange} value = {value} />
    </div>

export default Input