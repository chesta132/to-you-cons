import Countdown from "./Countdown";
import './Text.css'

export default function Text() {
    return (
        <div className="Text">
            <h1 className="font-medium text-[24px]">To You, 2 Years From 2025</h1>
            <Countdown/>
        </div>
    )
}