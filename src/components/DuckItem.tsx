import IDuck from '../interfaces/DuckInterface'
import { useDispatch } from 'react-redux';
import { DUPLICATE, REMOVE } from '../store/slices/duckSlice';


function DuckItem({ duck }: { duck: IDuck }) {
    const dispatch = useDispatch();

    const onDuplicate = (): void => {
        dispatch(DUPLICATE(duck.id));
    }
    const onRemove = (): void => {
        dispatch(REMOVE(duck.id));
    }

    return (
        <div className="duck-item">
            <img src={duck.img_src} alt={duck.occupation} />
            <div>occupation : {duck.occupation}</div>
            <div>id : {duck.id}</div>
            <div>name : {duck.name}</div>
            <button className="duplicate" onClick={onDuplicate}>Duplicate</button>
            <button className="remove" onClick={onRemove}>Remove</button>
        </div>
    );
}


export default DuckItem;