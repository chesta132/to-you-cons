import './Background.css'

export default function Background(props) {
    return (
        <div className="bg">
            {props.children}
        </div>
    )
}