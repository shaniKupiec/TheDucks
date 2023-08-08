import { useDispatch } from 'react-redux';
import { DUPLICATE, REMOVE } from '../store/slices/rabbitSlice';
import IRabbit from '../interfaces/RabbitInterface';


function RabbitItem({ rabbit }: { rabbit: IRabbit }) {
    const dispatch = useDispatch();

    const onDuplicate = (): void => {
        dispatch(DUPLICATE(rabbit.id));
    }
    const onRemove = (): void => {
        dispatch(REMOVE(rabbit.id));
    }

    return (
        <div className="duck-item">
            <img src={rabbit.img_src} alt={rabbit.name} />
            <div>ear length : {rabbit.ear_len}</div>
            <div>id : {rabbit.id}</div>
            <div>name : {rabbit.name}</div>
            <button className="duplicate" onClick={onDuplicate}>Duplicate</button>
            <button className="remove" onClick={onRemove}>Remove</button>
        </div>
    );
}


export default RabbitItem;