import { database } from 'firebase';
import * as _ from 'underscore';

const random = (min, max) => {
    return min + Math.floor(Math.random() * (max - min));
};

const randomArray = (array) => {
    const out = [];
    const length = array.length;
    for (let i = 0; i < length; i++) {
        const index = random(0, array.length - 1);
        out.push(array[index]);
        array.splice(index, 1);
    }
    return out;
};

export const getRandom = (amount, size) => {
    return database().ref('/Countries/')
        .orderByChild('HumanPopulation').endAt(10) // Temporary until Ranking is set
        .limitToLast(!size ? 10 : 20) // Temporary until Ranking is set
        .once('value')
        .then(snapshot => {
            const randomIndexes = randomArray(_.range(snapshot.numChildren())).slice(0, amount);
            return _.chain(snapshot.val()).map((value, id) => {
                return {
                    ...value,
                    id
                };
            }).filter((data, index) => randomIndexes.indexOf(index) > -1).value();
        });
};
