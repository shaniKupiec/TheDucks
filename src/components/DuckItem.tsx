import IDuck from '../interfaces/DuckInterface'

import duckImage1 from '../assets/images/ducks/bachelor.png';
import duckImage2 from '../assets/images/ducks/couple.png';
import duckImage3 from '../assets/images/ducks/doctor.png';
import duckImage4 from '../assets/images/ducks/unicorn.png';


function DuckItem({ duck }: { duck: IDuck }) {
    var imageSrc = [duckImage1, duckImage2, duckImage3, duckImage4];


    const onAdd = () => {
        
    }
    const onDelete = () => {

    }

    return (
        <div className="duck-item">
             {imageSrc && <img src={imageSrc[duck.img_num - 1]} alt={duck.occupation} />}
            <div>occupation : {duck.occupation}</div>
            <div>id : {duck.id}</div>
            <div>name : {duck.name}</div>
            <button className="add" onClick={onAdd}>Duplicate</button>
            <button className="delete" onClick={onDelete}>Delete</button>
        </div>
    );
}


export default DuckItem;