import { useParams } from 'react-router-dom';
import ChatWindow from './ChatWindow';

function SingleRoom() {
    const { id } = useParams();

    return (
        <>
            <ChatWindow id={id}></ChatWindow>
        </>
    )
}
export default SingleRoom