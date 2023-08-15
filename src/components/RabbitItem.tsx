import { useDispatch } from 'react-redux';
import { DUPLICATE, REMOVE } from '../store/slices/rabbitSlice';
import IRabbit from '../interfaces/RabbitInterface';
import { StyledAddBtn, StyledImage, StyledRemoveBtn } from '../styling/components/Item';


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
            <StyledImage src={rabbit.img_src} alt={rabbit.name} />
            <div>ear length : {rabbit.ear_len}</div>
            <div>id : {rabbit.id}</div>
            <div>name : {rabbit.name}</div>
            <StyledAddBtn className="duplicate" onClick={onDuplicate}>Duplicate</StyledAddBtn>
            <StyledRemoveBtn className="remove" onClick={onRemove}>Remove</StyledRemoveBtn>
        </div>
    );
}


export default RabbitItem;