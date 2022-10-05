const Filter = ({onChange, searchName}) => 
      <div>
          filter shown in with: 
          <input type = "text" onChange = {onChange} value = {searchName} />
      </div>

export default Filter