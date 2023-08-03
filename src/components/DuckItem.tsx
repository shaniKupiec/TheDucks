import IDuck from '../interfaces/DuckInterface'

import duckImage1 from '../assets/images/ducks/bachelor.png';
import duckImage2 from '../assets/images/ducks/couple.png';
import duckImage3 from '../assets/images/ducks/doctor.png';
import duckImage4 from '../assets/images/ducks/unicorn.png';
import { useDispatch } from 'react-redux';
import { DUPLICATE, REMOVE } from '../store/slices/duckSlice';


function DuckItem({ duck }: { duck: IDuck }) {
    var imageSrc = [duckImage1, duckImage2, duckImage3, duckImage4];
    const dispatch = useDispatch();

    const onDuplicate = () => {
        dispatch(DUPLICATE(duck.id));
    }
    const onRemove = () => {
        dispatch(REMOVE(duck.id));
    }

    return (
        <div className="duck-item">
             {imageSrc && <img src={imageSrc[duck.img_num - 1]} alt={duck.occupation} />}
            <div>occupation : {duck.occupation}</div>
            <div>id : {duck.id}</div>
            <div>name : {duck.name}</div>
            <button className="duplicate" onClick={onDuplicate}>Duplicate</button>
            <button className="remove" onClick={onRemove}>Remove</button>
        </div>
    );
}


export default DuckItem;