import IDuck from '../interfaces/DuckInterface'
import { useDispatch } from 'react-redux';
import { DUPLICATE, REMOVE } from '../store/slices/duckSlice';
import { StyledAddBtn, StyledImage, StyledRemoveBtn } from '../styling/components/Item';


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
            <StyledImage src={duck.img_src} alt={duck.occupation} />
            <div>occupation : {duck.occupation}</div>
            <div>id : {duck.id}</div>
            <div>name : {duck.name}</div>
            <StyledAddBtn className="duplicate" onClick={onDuplicate}>Duplicate</StyledAddBtn>
            <StyledRemoveBtn className="remove" onClick={onRemove}>Remove</StyledRemoveBtn>
        </div>
    );
}


export default DuckItem;