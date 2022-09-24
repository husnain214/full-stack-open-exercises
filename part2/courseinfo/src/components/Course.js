import Header from "./Header"
import Content from "./Content"

const Course = ({name, parts}) => {
    return ( 
        <div>
            <Header courseName = {name} />
            <Content parts = {parts} />
        </div>
    )
}

export default Course

